import { Button, SiteImage, SocialLink } from "@components/ui";
import { SectionWrapper } from "@components/ui/SectionWrapper";

export const Hero = () => {
	return (
		<div className="relative">
			<div className="absolute bottom-0 right-4 md:right-16 z-10">
				<div className="relative w-[90px] md:w-max">
					<SiteImage
						src="/content/elements/ball.svg"
						className="w-16 md:w-32 absolute bottom-12 md:bottom-24 -left-20 md:-left-28"
						imageClassName="animate-spin"
						imageStyle={{
							animationDuration: "5s",
						}}
					/>
					<div className="relative">
						<SiteImage
							src="/images/hero-right/blink.svg"
							className="h-44 md:h-[450px] absolute top-0 left-0 blink"
						/>
						<SiteImage
							src="/images/hero-right/normal.svg"
							className="h-44 md:h-[450px] blink-invert"
						/>
					</div>
				</div>
			</div>
			<div className="w-[100px] md:w-auto absolute bottom-0 left-0 md:left-16 z-10">
				<SiteImage
					src="/images/hero-left.svg"
					className="h-44 md:h-[450px] "
				/>
			</div>
			<SectionWrapper name="home">
				<div className="flex flex-col items-center gap-y-9 py-16 md:py-28">
					<div className="relative w-28 md:w-72">
						<div className="wheel-mask w-full absolute top-0 left-0 bottom-0 z-[-1]">
							<SiteImage
								src="/content/elements/wheel.svg"
								className="w-full scale-150 mt-8"
							/>
						</div>
						<div className="relative">
							<div className="w-full absolute top-0 left-0 blink">
								<SiteImage
									src="/images/hero-main-blink.png"
									className="w-full"
								/>
							</div>
							<SiteImage
								src="/images/hero-main.png"
								className="w-full"
							/>
						</div>
					</div>

					<h1 className="text-3xl md:text-7xl font-extrabold text-white text-center">
						The Meme Coin
						<br />
						for Euro 2024!
					</h1>
					<a
						target="_blank"
						href="https://app.uniswap.org/swap?outputCurrency=0x32F0D04B48427A14Fb3Cbc73DB869e691A9feC6f&chain=mainnet"
					>
						<Button text="Buy $ECI" />
					</a>

					<p className="text-xs md:text-xl bg-[#1534B8] px-2 md:px-8 py-3 text-white w-fit rounded-full">
						CA: 0x32F0D04B48427A14Fb3Cbc73DB869e691A9feC6f
					</p>

					<div className="font-bold text-xl md:text-[44px] text-white flex flex-col items-center gap-2 md:gap-6 mb-24 md:mb-0">
						<p>Join us on socials!</p>

						<div className="flex gap-2 md:gap-5">
							<SocialLink
								href="http://t.me/EuroCupInu"
								icon={{
									src: "/content/icons/telegram.svg",
									alt: "EuroCupInu Telegram link",
								}}
							/>
							<SocialLink
								href="https://x.com/EuroCupInu"
								icon={{
									src: "/content/icons/x.svg",
									alt: "EuroCupInu X link",
								}}
							/>
							<SocialLink
								href="https://dexscreener.com/ethereum/0x32F0D04B48427A14Fb3Cbc73DB869e691A9feC6f"
								icon={{
									src: "/content/icons/misc1.svg",
									alt: "EuroCupInu Dextools link",
								}}
							/>
							<SocialLink
								href="https://etherscan.io/token/0x32F0D04B48427A14Fb3Cbc73DB869e691A9feC6f"
								icon={{
									src: "/content/icons/misc2.svg",
									alt: "EuroCupInu Etherscan link",
								}}
							/>
						</div>
					</div>
				</div>
			</SectionWrapper>
			<SiteImage
				src="/images/border.webp"
				className="h-full absolute top-0 -right-64 hidden md:block md:right-0 z-0"
			/>
			<SiteImage
				src="/images/border.webp"
				className="h-full absolute top-0 -left-64 hidden md:block md:left-0 -scale-x-100 z-0"
			/>
		</div>
	);
};
