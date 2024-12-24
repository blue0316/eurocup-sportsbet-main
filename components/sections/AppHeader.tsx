import { Button } from "@components";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

import { useAccount } from "wagmi";

export const AppHeader = () => {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  return (
    <div className="flex justify-end pt-8 md:pt-12 px-4 container mx-auto">
      {isConnected ? (
        <>
          <div className="hidden md:block mr-2">
            <Button
              text="Account Info"
              onClick={openAccountModal}
              type="small"
            />
          </div>
          <div className="hidden md:block">
            <Button
              text="Switch Chains"
              onClick={openChainModal}
              type="small"
            />
          </div>
        </>
      ) : (
        <div className="flex">
          <div className="hidden md:block">
            <Button text="Connect" type="small" onClick={openConnectModal} />
          </div>
          <div className="md:hidden">
            <Button text="Connect" type="xs" onClick={openConnectModal} />
          </div>
        </div>
      )}
    </div>
  );
};
