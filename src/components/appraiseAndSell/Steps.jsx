import React from "react";

export default function Steps({ currentStep, setStep }) {
  return (
    <div className="flex items-center justify-between">
      <div
        onClick={() => {
          if (currentStep > 0) setStep(0);
        }}
        className="flex items-center gap-2 cursor-pointer hover:drop-shadow-xl"
      >
        <div
          className={`relative min-w-6 min-h-6 rounded-full ${
            currentStep > -1 ? "bg-sky-600" : "bg-gray-300"
          }`}
        >
          <p
            className={`absolute top-1 left-[9px] text-xs text-white w-fit text-center`}
          >
            1
          </p>
        </div>
        <p
          className={`${
            currentStep > -1 ? "text-sky-800 font-semibold" : "text-gray-400"
          } lg:min-w-fit`}
        >
          Watch information
        </p>
      </div>

      <div
        className={`w-16 lg:w-40 border ${
          currentStep > 0 ? "border-sky-600" : "border-gray-400"
        }  mx-8`}
      ></div>

      <div
        onClick={() => {
          if (currentStep > 0) setStep(1);
        }}
        className="flex items-center gap-2 cursor-pointer hover:drop-shadow-xl"
      >
        <div
          className={`relative min-w-6 min-h-6 rounded-full ${
            currentStep > 0 ? "bg-sky-600" : "bg-gray-300"
          }`}
        >
          <p
            className={`absolute top-1 left-[9px] text-xs text-white w-fit text-center`}
          >
            2
          </p>
        </div>
        <p
          className={`${
            currentStep > 0 ? "text-sky-800 font-semibold" : "text-gray-400"
          } lg:min-w-fit`}
        >
          Schedule
        </p>
      </div>

      <div
        className={`w-16 lg:w-40 border ${
          currentStep > 1 ? "border-sky-600" : "border-gray-400"
        }  mx-8`}
      ></div>

      <div
        onClick={() => {
          if (currentStep > 1) setStep(2);
        }}
        className="flex items-center gap-2 cursor-pointer hover:drop-shadow-xl"
      >
        <div
          className={`relative min-w-6 min-h-6 rounded-full ${
            currentStep > 1 ? "bg-sky-600" : "bg-gray-300"
          }`}
        >
          <p
            className={`absolute top-1 left-[9px] text-xs text-white w-fit text-center`}
          >
            3
          </p>
        </div>
        <p
          className={`${
            currentStep > 1 ? "text-sky-800 font-semibold" : "text-gray-400"
          } lg:min-w-fit`}
        >
          Summary
        </p>
      </div>
    </div>
  );
}
