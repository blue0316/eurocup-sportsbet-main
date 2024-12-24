import React, { useEffect, useState } from "react";

interface NotificationProps {
  message?: string;
  messageGame?: string;
  isFetching: boolean;
  setIsFetching: any;
}

export const Notification: React.FC<NotificationProps> = ({
  message,
  messageGame,
  isFetching,
  setIsFetching,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!isFetching) {
      setIsFetching(false);
      setVisible(false);
    }
  }, [visible, isFetching, setIsFetching]);

  const handleClose = () => {
    setIsFetching(false);
    setVisible(false);
  };

  if (!message && !messageGame) return null;

  return (
    visible && (
      <div
        className={`fixed top-5 z-40 right-5 bg-white border border-gray-300 p-4 shadow-lg rounded transition-transform duration-500 transform ${
          !visible ? "translate-x-full" : ""
        }`}
      >
        <div className="flex justify-between items-center">
          <div>
            {message && <p>{message}</p>}
            {messageGame && <p>{messageGame}</p>}
          </div>
          <button
            onClick={handleClose}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
      </div>
    )
  );
};
