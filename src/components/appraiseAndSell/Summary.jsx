import React, { useEffect, useState } from "react";
import { Checkbox, DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import GoogleMapReact from "google-map-react";
import PreviewModal from "./PreviewModal";
import axios from "axios";
import Loading from "../loading/Loading";

const Marker = ({ text }) => <div>{text}</div>;

const defaultProps = {
  center: {
    lat: 10.841369948329724,
    lng: 106.80992591153402,
  },
  zoom: 15,
};

dayjs.extend(customParseFormat);

export default function Summary({ currentStep, setStep, product, dateRange }) {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = sessionStorage.signInUser
    ? JSON.parse(sessionStorage.signInUser)
    : null;

  const handleFinish = async () => {
    setIsLoading(true);
    await axios
      .post("http://localhost:3000/product", product)
      .then(async (res) => {
        await axios
          .post("http://localhost:3000/sellerRequest", {
            account: user.id,
            product: res.data.id,
            type: "create",
            update: product,
            details: "Request to be appraised",
          })
          .then(async () => {
            await axios
              .post("http://localhost:3000/appointment", {
                account: user.id,
                product: res.data.id,
                date:
                  dateRange.start === dateRange.end
                    ? dateRange.start
                    : dateRange.start + "-" + dateRange.end,
                status: "scheduled",
              })
              .then(() => {
                console.log("Sent request: ", res.data);
                sessionStorage.setItem("appraisalSucceeded", "true");
                setIsLoading(false);
                window.location.reload();
              });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setConfirmChecked(false);
  }, [currentStep]);

  if (isLoading) return <Loading />;
  return (
    <div
      className={`w-full max-w-[50em] p-4 flex flex-col items-center gap-8 ${
        currentStep !== 2 && "hidden"
      }`}
    >
      <div className="flex flex-col gap-4">
        {!product ? null : (
          <div className="flex items-start gap-4 text-sm border border-gray-400 p-4 rounded-xl">
            <img src={product.image} width={100} />
            <div className="flex flex-col gap-2">
              <p className="font-semibold">{product.name}</p>
              <p className="font-light italic text-xs">{product.brand}</p>
              <button
                onClick={() => setIsPreviewing(true)}
                className="self-end mt-6 bg-cyan-800 hover:bg-cyan-900 duration-200 text-white px-4 py-1 rounded-lg"
              >
                Preview
              </button>
            </div>
            <PreviewModal
              open={isPreviewing}
              setOpen={setIsPreviewing}
              user={user}
              product={product}
            />
          </div>
        )}
        <div className="flex items-center gap-4">
          <div className="min-w-fit flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM8 14V16H6V14H8ZM18 14V16H10V14H18ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z"></path>
            </svg>
            Scheduled for:{" "}
            <span className="ml-4 text-lg font-bold text-teal-800">
              {dateRange && dateRange.start}&ensp;
              {dateRange &&
                dateRange.start !== dateRange.end &&
                "- " + dateRange.end}
            </span>
          </div>
        </div>
        <div className="w-full flex items-start gap-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M17.6177 5.9681L19.0711 4.51472L20.4853 5.92893L19.0319 7.38231C20.2635 8.92199 21 10.875 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.02944 7.02944 4 12 4C14.125 4 16.078 4.73647 17.6177 5.9681ZM12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20ZM11 8H13V14H11V8ZM8 1H16V3H8V1Z"></path>
            </svg>
            <p className="">Vintage Timepiece office hours:</p>
          </div>
          <span className="flex flex-col gap-2 text-teal-800 font-bold text-lg">
            <p>07:00 AM - 11:00 AM</p>
            <p>01:00 PM - 05:00 PM</p>
          </span>
        </div>
        <div className="h-[50vh] w-full flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path>
            </svg>
            <p className="">Location:</p>
          </div>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <Marker
              lat={defaultProps.center.lat}
              lng={defaultProps.center.lng}
              text="VINTAGE TIMEPIECE"
            />
          </GoogleMapReact>
        </div>
      </div>

      <div className="flex items-start gap-2 pt-8">
        <Checkbox
          checked={confirmChecked}
          onChange={() => setConfirmChecked(!confirmChecked)}
        />
        <p className="text-sm italic font-light">
          By confirming, your request to appraise this watch will be sent and
          evaluated by our appraisers. Please make sure filled information is
          completely correct!
        </p>
      </div>

      <div
        className={`w-full flex items-center justify-between gap-8 font-montserrat`}
      >
        <button
          onClick={() => {
            setStep(currentStep - 1);
            window.scrollTo({ top: 80, behavior: "smooth" });
          }}
          className="hover:underline mr-auto flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M11.8284 12.0005L14.6569 14.8289L13.2426 16.2431L9 12.0005L13.2426 7.75781L14.6569 9.17203L11.8284 12.0005Z"></path>
          </svg>
          Previous
        </button>
        <button
          disabled={!confirmChecked}
          onClick={handleFinish}
          className="flex items-center gap-2 px-16 py-2 bg-green-700 hover:bg-green-900 duration-200 font-semibold text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"></path>
          </svg>
          COMPLETE
        </button>
      </div>
    </div>
  );
}
