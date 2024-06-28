import React from "react";

export default function ProfileCharts({ orderList, productList }) {
  const onGoingList = orderList.filter(
    (item) => item.status === "PENDING" || item.status === "IN DELIVERY"
  ).length;

  const completedList = orderList.filter(
    (item) => item.status === "COMPLETED"
  ).length;

  const cancelledList = orderList.filter(
    (item) => item.status === "CANCELLED" || item.status === "REFUNDED"
  ).length;

  return (
    <div className="w-full max-w-full flex flex-col items-center justify-center gap-2">
      <div className="w-full flex gap-4">
        <div className="w-1/2 grow flex flex-col gap-2 text-white bg-blue-800 hover:bg-blue-900 px-10 py-6 rounded-[30px]">
          <p className="text-[0.8em] max-w-full overflow-hidden text-nowrap text-ellipsis">
            For Sale Timepieces
          </p>
          <p className="text-[2em] font-bold">{productList.length}</p>
        </div>
        <div className="w-1/2 grow flex flex-col gap-2 text-white bg-cyan-800 hover:bg-cyan-900 px-10 py-6 rounded-[30px]">
          <p className="text-[0.8em] max-w-full overflow-hidden text-nowrap text-ellipsis">
            All orders
          </p>
          <p className="text-[2em] font-bold">{orderList.length}</p>
        </div>
      </div>
      <div className="w-full flex gap-4">
        <div className="w-1/2 grow flex flex-col gap-2 text-white bg-amber-800 hover:bg-amber-900 px-10 py-6 rounded-[30px]">
          <p className="text-[0.8em] max-w-full overflow-hidden text-nowrap text-ellipsis">
            On going orders
          </p>
          <p className="text-[2em] font-bold">{onGoingList}</p>
        </div>
        <div className="w-1/2 grow flex flex-col gap-2 text-white bg-green-700 hover:bg-green-800 px-10 py-6 rounded-[30px]">
          <p className="text-[0.8em] max-w-full overflow-hidden text-nowrap text-ellipsis">
            Completed orders
          </p>
          <p className="text-[2em] font-bold">{completedList}</p>
        </div>
      </div>
    </div>
  );
}
