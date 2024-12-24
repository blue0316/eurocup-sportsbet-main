import { SiteImage } from "@components";

export const AppCoins = () => {
	return (
		<div className="flex w-full md:w-4/6 mx-auto mt-16">
			<SiteImage
				src="/content/elements/coin1.svg"
				className="w-full coin"
			/>
			<SiteImage
				src="/content/elements/coin3.svg"
				className="w-full coin"
			/>
			<SiteImage
				src="/content/elements/coin2.svg"
				className="w-full coin"
			/>
			<SiteImage
				src="/content/elements/coin4.svg"
				className="w-full coin"
			/>
		</div>
	);
};
