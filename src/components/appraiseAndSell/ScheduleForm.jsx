import React, { useEffect, useState } from "react";
import { DatePicker, message, TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import GoogleMapReact from "google-map-react";

const Marker = ({ text }) => <div>{text}</div>;

const defaultProps = {
  center: {
    lat: 10.841369948329724,
    lng: 106.80992591153402,
  },
  zoom: 15,
};

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const getDateFromToday = (range, dateOnly = false) => {
  let d = new Date();
  d.setDate(d.getDate() + range);
  return dateOnly ? new Date(d).toDateString() : d;
};

const disabledDate = (current) => {
  return (
    current &&
    (current < dayjs(getDateFromToday(-1)).endOf("day") ||
      current > dayjs(getDateFromToday(30)).endOf("day"))
  );
};

export default function ScheduleForm({
  currentStep,
  setStep,
  setDateRangeResult,
}) {
  const [dateRange, setDateRange] = useState([]);
  const [rangeValue, setRangeValue] = useState([]);

  const handleConfirmSelectDateRange = () => {
    setDateRangeResult(dateRange);
    setStep(currentStep + 1);
    window.scrollTo({ top: 80, behavior: "smooth" });
  };

  return (
    <div
      className={`w-full max-w-[50em] p-4 flex flex-col items-center gap-8 ${
        currentStep !== 1 && "hidden"
      }`}
    >
      <p className="w-fit mx-auto font-bold text-white text-[1em] bg-teal-900 px-4 py-2 rounded-xl">
        SET AN APPOINTMENT
      </p>
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-red-700">
          Your watch is required to be directly investigated and evaluated in
          our office before being able to be purchased.
        </p>
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
            Select a range of date that you would visit:{" "}
            <span className="text-red-600">*</span>
          </div>
          <RangePicker
            value={rangeValue}
            onChange={(e) => {
              const start = e[0].format("DD/MM/YYYY");
              const end = e[1].format("DD/MM/YYYY");
              if (e[1].date() - e[0].date() < 4) {
                setRangeValue(e);
                setDateRange({
                  start: start,
                  end: end,
                });
              } else {
                message.error({
                  key: "dateRange",
                  content:
                    "Your appointment should be in within less than 3 days long!",
                  duration: 5,
                });
              }
            }}
            disabledDate={disabledDate}
            className="font-montserrat"
          />
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

      <div
        className={`w-full flex items-center justify-end gap-8 font-montserrat`}
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

        <button onClick={() => setRangeValue([])} className="hover:underline">
          Reset
        </button>
        <button
          disabled={rangeValue.length === 0}
          onClick={handleConfirmSelectDateRange}
          className="flex items-center gap-2 pl-8 pr-4 py-2 bg-green-600 hover:bg-green-700 font-semibold text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path d="M12.1717 12.0005L9.34326 9.17203L10.7575 7.75781L15.0001 12.0005L10.7575 16.2431L9.34326 14.8289L12.1717 12.0005Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
