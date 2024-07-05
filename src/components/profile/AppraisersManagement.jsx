import React, { useEffect, useState } from "react";
import EmptyOrderImage from "../../assets/images/profile/empty-order.webp";
import SingleTimepiece from "./SingleTimepiece";
import { Pagination, Tooltip, Modal, Input } from "antd";

export default function Appraisers({ list, getRequestStatus }) {
  const [currentList, setCurrentList] = useState([]);
  const [reason, setReason] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const defaultPageSize = 8;
  const [pagingState, setPagingState] = useState({
    min: 0,
    max: defaultPageSize,
  });

  const handlePageChange = (page) => {
    setPagingState({
      min: (page - 1) * defaultPageSize,
      max: page * defaultPageSize,
    });
  };

  const approveItem = (item) => {
    // Logic để phê duyệt sản phẩm
    console.log("Approved item:", item);
    // Gọi hàm getRequestStatus để cập nhật trạng thái
    getRequestStatus({ id: item.id, status: "approved" });
  };

  const rejectItem = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (selectedItem) {
      // Logic để từ chối sản phẩm và gửi lý do
      console.log("Rejected item:", selectedItem, "Reason:", reason);
      // Gọi hàm getRequestStatus để cập nhật trạng thái
      getRequestStatus({ id: selectedItem.id, status: "rejected", reason });
      setReason("");
      setSelectedItem(null);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setReason("");
    setSelectedItem(null);
    setIsModalVisible(false);
  };

  useEffect(() => {
    const filteredList = list.filter(
      (item) => item.status.toUpperCase() === "IN APPRAISAL"
    );
    setCurrentList(filteredList);
    setPagingState({
      min: 0,
      max: defaultPageSize,
    });
  }, [list]);

  return (
    <div className="relative w-full min-h-full bg-white rounded-xl">
      {currentList.length === 0 ? (
        <div className="w-full h-[40vh] flex flex-col items-center justify-center gap-4">
          <img src={EmptyOrderImage} alt="" className="w-24" />
          <p>There is yet any products!</p>
        </div>
      ) : (
        <div className="w-full flex flex-col items-start justify-start gap-2 p-4">
          {currentList.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center gap-4 my-16">
              <img src={EmptyOrderImage} alt="" className="w-24" />
              <p>No product!</p>
            </div>
          ) : (
            <div className="w-full min-h-[40vh] flex flex-col items-center justify-start">
              {currentList
                .slice(pagingState.min, pagingState.max)
                .map((item) => {
                  return (
                    <div key={item.id} className="w-full flex flex-col items-start gap-4 border-b border-gray-300 py-4">
                      <SingleTimepiece product={item} />
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => approveItem(item)}
                          className="bg-green-600 hover:bg-green-800 text-white rounded-xl px-4 py-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectItem(item)}
                          className="bg-red-600 hover:bg-red-800 text-white rounded-xl px-4 py-2"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  );
                })}
              <Pagination
                total={currentList.length}
                pageSize={defaultPageSize}
                hideOnSinglePage
                size="default"
                onChange={handlePageChange}
                className="mt-8"
              />
            </div>
          )}
        </div>
      )}

      <Modal
        title="Reject Reason"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input.TextArea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          placeholder="Enter the reason for rejection"
        />
      </Modal>
    </div>
  );
}
