/* eslint-disable @next/next/no-img-element */
import { Button } from "@components/ui";
import Modal from "react-modal";

type CreateProfileProps = {
  open: boolean;
  setOpen: Function;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  onCreateProfile: () => void;
};

export const CreateProfileModal = ({
  open,
  setOpen,
  username,
  setUsername,
  onCreateProfile,
}: CreateProfileProps) => {
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
          Create Profile
        </h1>
        <div className="w-[142px] mx-auto mt-8">
          <p className="text-white text-right text-sm -mb-2"></p>
          <div className="flex items-center justify-between">
            <div className="min-h-8 min-w-8 rouned-full bg-[url('/images/input-bg.svg')] bg-contain bg-center bg-no-repeat" />
            <div className="border-b-2 border-white flex justify-between items-center">
              <input
                defaultValue="you username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="text-left py-2 text-2xl bg-transparent border-none outline-none text-white w-[100px]"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            type="xs"
            text="Create"
            onClick={() => {
              onCreateProfile();
              setOpen(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
