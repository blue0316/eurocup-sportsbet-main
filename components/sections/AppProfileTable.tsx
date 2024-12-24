/* eslint-disable @next/next/no-img-element */
import {
  Button,
  DepositModal,
  WithdrawModal,
  CreateProfileModal,
} from "@components";
import { useState } from "react";

type AppProfileTableProps = {
  price: any;
  profile: any;
  depositAmount: string;
  setDepositAmount: React.Dispatch<React.SetStateAction<string>>;
  depositFunds: () => void;
  username: any;
  setUsername: any;
  createProfile: any;
  withdrawAmount: string;
  setWithdrawAmount: React.Dispatch<React.SetStateAction<string>>;
  withdrawFunds: () => void;
};

export const AppProfileTable = ({
  price,
  profile,
  depositAmount,
  setDepositAmount,
  depositFunds,
  username,
  setUsername,
  createProfile,
  withdrawAmount,
  setWithdrawAmount,
  withdrawFunds,
}: AppProfileTableProps) => {
  const [deposit, setDeposit] = useState(false);
  const [withdraw, setwithDraw] = useState(false);
  const [createProfileModal, setCreateProfileModal] = useState(false);

  const priceFixed = profile?.user?.tokenUnlocked * price;

  return (
    <div className="max-w-[1079px] mx-auto mt-12">
      {!profile && (
        <Button
          text="Create Profile"
          onClick={() => {
            setCreateProfileModal(true);
          }}
        />
      )}

      {profile && (
        <>
          <div className="items-center py-4 justify-between hidden md:flex">
            <div className="w-[40%] pl-6"></div>
            <div className="w-[20%]">
              <span className="font-semibold text-white text-xl">Balance</span>
            </div>
            <div className="w-[40%]"></div>
          </div>
          <div className="flex flex-wrap items-center px-4 md:px-0 py-4 justify-between bg-[#2c4fde] rounded mb-4 las:mb-0 transform hover:scale-105 transition-transform duration-30 w-11/12 mx-auto md:w-full">
            <div className="w-full md:w-[40%] md:pl-6 flex flex-col mb-4 md:mb-0 md:flex-row md:items-center">
              <img
                className="w-[45px] mr-2"
                src="/images/upload-image.png"
                alt="Upload user image"
              />
              <span className="text-white text-base">
                {profile?.user?.username}
              </span>
            </div>
            <div className="w-full md:w-[20%] flex flex-col mb-4 md:mb-0">
              <span className="text-white text-xl font-bold md:hidden">
                Balance
              </span>
              <p className="text-white text-base w-max">
                {profile?.user?.tokenUnlocked}
                <span className="text-sm ml-1">$ECI</span>
                <span className="text-right block text-sm">
                  ($ {priceFixed.toFixed(2)})
                </span>
              </p>
            </div>
            <div className="w-full md:w-[40%] flex justify-start md:justify-end mt-4">
              <Button
                type="xs"
                text="Deposit"
                onClick={() => {
                  setDeposit(true);
                }}
              />
              <div className="mx-4">
                <Button
                  type="xs"
                  text="Withdraw"
                  onClick={() => {
                    setwithDraw(true);
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <DepositModal
        price={price}
        open={deposit}
        setOpen={setDeposit}
        depositAmount={depositAmount}
        setDepositAmount={setDepositAmount}
        depositFunds={depositFunds}
      />
      <WithdrawModal
        price={price}
        open={withdraw}
        setOpen={(val: boolean) => {
          setwithDraw(val);
        }}
        withdrawAmount={withdrawAmount}
        setWithdrawAmount={setWithdrawAmount}
        withdrawFunds={withdrawFunds}
      />

      <CreateProfileModal
        open={createProfileModal}
        setOpen={(val: boolean) => {
          setCreateProfileModal(val);
        }}
        username={username}
        setUsername={setUsername}
        onCreateProfile={createProfile}
      />
    </div>
  );
};
