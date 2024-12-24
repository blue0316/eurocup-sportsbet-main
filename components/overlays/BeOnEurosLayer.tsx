import { SiteImage } from "@components";

export const BeOnEurosLayer = () => {
	return (
		<div className="absolute top-0 left-0 bottom-0 right-0 w-full z-[100] ">
			<div className="relative w-full h-full">
				<SiteImage
					className="w-[135px] md:w-[270px] absolute right-[20%] md:right-[35%] -top-6 md:-top-12 "
					src={"/content/elements/whistle.svg"}
				/>
			</div>
		</div>
	);
};
