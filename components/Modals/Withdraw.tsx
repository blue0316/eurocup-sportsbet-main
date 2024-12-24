/* eslint-disable @next/next/no-img-element */
import { Button } from "@components/ui";
import Modal from "react-modal";

type WithdrawModalProps = {
  price: any;
  open: boolean;
  setOpen: Function;
  withdrawAmount: string;
  setWithdrawAmount: React.Dispatch<React.SetStateAction<string>>;
  withdrawFunds: () => void;
};

export const WithdrawModal = ({
  price,
  open,
  setOpen,
  withdrawAmount,
  setWithdrawAmount,
  withdrawFunds,
}: WithdrawModalProps) => {
  const customStyles = {
    overlay: {
      zIndex: 99999999,
      backgroundColor: "rgba(0, 0, 0, 0.25)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#153BDA",
      width: "273px",
    },
  };

  const priceFixed = Number(withdrawAmount) * price;
  return (
    <div className="z-[4]">
      <Modal isOpen={open} style={customStyles} contentLabel="Deposit Modal">
        <div className="flex justify-end w-full">
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            <img src="/images/close-modal.png" className="w-[15px]" alt="" />
          </button>
        </div>
        <h1 className=" font-bold text-sm md:text-3xl text-white text-center pt-2">
          Withdraw
        </h1>
        <div className="w-[142px] mx-auto mt-8">
          <p className="text-white text-right text-sm -mb-2">
            (${priceFixed.toFixed(2)})
          </p>
          <div className="flex items-center justify-between">
            <div className="min-h-8 min-w-8 rouned-full bg-[url('/images/input-bg.svg')] bg-contain bg-center bg-no-repeat" />
            <div className="border-b-2 border-white flex justify-between items-center">
              <input
                //defaultValue="0"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                type="number"
                min={0}
                className="text-left py-2 text-2xl bg-transparent border-none outline-none text-white w-[100px]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            type="xs"
            text="Withdraw"
            onClick={() => {
              withdrawFunds();
              setOpen(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
