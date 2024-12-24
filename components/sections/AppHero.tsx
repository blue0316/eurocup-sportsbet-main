import { SiteImage } from "@components/ui";
import { SectionWrapper } from "@components/ui/SectionWrapper";

export const AppHero = () => {
	return (
		<div className="relative">
			<SectionWrapper name="home">
				<div className="flex flex-col items-center pt-12 md:pt-0 pb-10">
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
				</div>
			</SectionWrapper>
		</div>
	);
};
