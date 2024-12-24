import { SiteImage } from "@components";
import { TextAnimation } from "./TextAnimation";

export const BecomeFanLayer = () => {
	return (
		<div className="absolute top-0 left-0 bottom-0 right-0 w-full z-[50] ">
			<div className="relative w-full h-full">
				<SiteImage
					className="bounce w-[35px] md:w-[100px] absolute left-[5%] top-2/4 md:top-1/4 "
					src={"/content/elements/cup.svg"}
				/>
				<TextAnimation />
			</div>
		</div>
	);
};
