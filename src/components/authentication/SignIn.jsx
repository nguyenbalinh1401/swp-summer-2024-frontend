import React, { useEffect, useRef, useState } from "react";
import { Checkbox, Divider, Input, Modal } from "antd";
import { Link } from "react-router-dom";
import { EmailForm, CodeForm } from "./ForgotForm";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function SignIn() {
  const [rememberSignIn, setRememberSignIn] = useState(true);
  const [forgotFormOpen, setForgotFormOpen] = useState(false);
  const [resetPasswordFormOpen, setResetPasswordFormOpen] = useState(false);
  const [forgottenEmail, setForgottenEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  // const sendEmail = () => {
  //   if (!emailSent) {
  //     setEmailSent(true);
  //   } else {
  //   }
  // };

  const getEmail = (value) => {
    if (value) {
      console.log("GET EMAIL: ", value);
      setForgottenEmail(value);
      setEmailSent(true);
    }
  };

  const getGeneratedCode = (value) => {
    if (value) {
      console.log("GENERATED CODE: ", value);
      setGeneratedCode(value);
    }
  };

  const handleGetCodeStatus = (value) => {
    console.log("Code status: ", value);
    if (value) {
      setForgotFormOpen(false);
      setResetPasswordFormOpen(true);
    }
  };

  const handleResetPassword = () => {
    
  };

  const onGoogleSuccess = (credentialResponse) => {
    const googleLoginData = jwtDecode(credentialResponse.credential);
    console.log("Google login: ", googleLoginData);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8">
      <p className="text-[250%] font-bold font-title text-sky-800">SIGN IN</p>
      <div className="w-96 flex flex-col items-center justify-center gap-2">
        <Input size="large" placeholder="Email" />
        <Input.Password size="large" placeholder="Password" />
        <div className="w-full flex items-center justify-between">
          <Checkbox
            onChange={() => {
              setRememberSignIn(!rememberSignIn);
            }}
            defaultChecked={rememberSignIn}
            className="font-montserrat"
          >
            Keep me signed in
          </Checkbox>
          <button
            onClick={() => {
              setForgotFormOpen(true);
            }}
            className="text-sm text-sky-600 font-semibold mt-2 hover:text-sky-800"
          >
            Forgot your password?
          </button>
        </div>
        <button className="mt-4 font-bold text-xl text-white bg-sky-600 py-2 px-16 rounded-full">
          SIGN IN
        </button>
        <Divider>
          <p className="text-gray-400 text-xs">or</p>
        </Divider>
        <GoogleLogin
          locale="en"
          onSuccess={onGoogleSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
      <Modal
        onCancel={() => {
          setForgotFormOpen(false);
        }}
        title="Password Recovery"
        open={forgotFormOpen}
        footer={null}
      >
        {emailSent ? (
          <CodeForm
            email={emailSent}
            generatedCode={generatedCode}
            codeValidated={handleGetCodeStatus}
          />
        ) : (
          <EmailForm email={getEmail} code={getGeneratedCode} />
        )}
      </Modal>
      <Modal
        onCancel={() => {
          setResetPasswordFormOpen(false);
        }}
        title="Password Recovery"
        open={resetPasswordFormOpen}
        okText="Confirm"
        onOk={handleResetPassword}
      ></Modal>
    </div>
  );
}