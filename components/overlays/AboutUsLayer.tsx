import { SiteImage } from "@components";

export const AboutUsLayer = () => {
	return (
		<div className="absolute top-0 left-0 bottom-0 right-0 w-full z-[1] ">
			<div className="relative w-full h-full">
				<SiteImage
					className="w-[50px] md:w-[100px] absolute left-1 -top-4"
					src={"/content/elements/clock.svg"}
				/>
			</div>
		</div>
	);
};
