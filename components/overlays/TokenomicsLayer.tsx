import { SiteImage } from "@components";

export const TokenomicsLayer = () => {
	return (
		<div className="absolute top-0 left-0 bottom-0 right-0 w-full z-[1] ">
			<div className="relative w-full h-full">
				<SiteImage
					className="bounce w-[100px] md:w-[160px] absolute right-[40%] -top-10 "
					src={"/content/elements/shoe.svg"}
				/>

				<SiteImage
					className="animate-spin w-[75px] md:w-[150px] absolute -right-4 md:-right-12 top-[20%] md:top-2/4"
					src={"/content/elements/ball.svg"}
					style={{
						animationDuration: "5s",
					}}
				/>
			</div>
		</div>
	);
};
