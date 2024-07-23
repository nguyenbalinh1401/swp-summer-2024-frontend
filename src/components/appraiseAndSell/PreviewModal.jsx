import React from "react";
import { Avatar, Modal } from "antd";
import moment from "moment";
import CurrencySplitter from "../../assistants/currencySpliter";

export default function PreviewModal({ open, setOpen, user, product }) {
  return (
    <Modal
      title=<p className="text-sky-700 font-bold text-lg">Preview</p>
      open={open}
      onCancel={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
      footer={null}
      centered
    >
      <div className="w-full font-montserrat pt-4">
        {product && (
          <div className="w-64 h-80 flex flex-col py-4 border border-gray-400 rounded-lg relative overflow-hidden mx-auto">
            <img
              src={product.image}
              alt=""
              className="w-full overflow-hidden z-0 transition-transform duration-300 transform group-hover:scale-125"
            />
            <div className="absolute inset-0 transition-opacity duration-300 peer-hover:opacity-0 pointer-events-none"></div>
            <div className="w-full absolute bottom-0 left-0 text-white overflow-hidden z-10 group/semi cursor-pointer">
              <div className="w-full px-2 py-4 text-[1em] font-semibold bg-white text-black">
                <p className="max-w-64 text-nowrap text-ellipsis overflow-hidden group-hover/semi:underline">
                  {product.name}
                </p>
                <div className="w-full flex items-center justify-between">
                  <p className="text-xs font-light opacity-70">
                    {product.brand}
                  </p>
                  <p className="text-sm text-red-600">
                    $ {CurrencySplitter(product.price)}
                  </p>
                </div>
                <div className="w-full flex items-center justify-between text-[0.7em] mt-2">
                  <div className="flex items-center gap-1">
                    <Avatar src={user.avatar} alt="" size={16} />
                    <p className="font-medium max-w-20 text-nowrap text-ellipsis overflow-hidden">
                      {user.username}
                    </p>
                  </div>
                  <p className="font-light min-w-fit">
                    {moment(product.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <p className="text-xs text-gray-600 italic px-16 pt-2">
          Your product would be displayed like above when it is available to be
          purchased.
        </p>

        <div className="w-full flex items-center justify-end gap-2 mt-8">
          <button
            onClick={() => {
              setOpen(false);
            }}
            className="hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
