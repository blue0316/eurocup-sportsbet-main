import { SiteImage } from "@components";

export const HeroLayer = () => {
	return (
		<div className="absolute top-0 left-0 bottom-0 right-0 w-full z-[1]">
			<div className="relative w-full h-full">
				<SiteImage
					className="cloud w-[75px] md:w-[150px] absolute left-1/4 -top-[30%] md:-top-16"
					src={"/content/elements/cloud.svg"}
				/>

				<SiteImage
					className="cloud w-[150px] absolute -left-24 bottom-1/4"
					src={"/content/elements/cloud.svg"}
				/>

				<SiteImage
					className="cloud w-[150px] absolute left-3/4 top-12 rotate-180"
					src={"/content/elements/cloud.svg"}
				/>

				<SiteImage
					className="bounce w-[150px] absolute right-24 top-2/4"
					src={"/content/elements/vase.svg"}
				/>

				<div className="absolute left-[40%] top-[15%]">
					<SiteImage
						className="w-[10px] "
						src={"/content/elements/star.svg"}
					/>

					<SiteImage
						className="w-[30px] ml-4 mt-3"
						src={"/content/elements/star.svg"}
					/>
				</div>
			</div>
		</div>
	);
};
