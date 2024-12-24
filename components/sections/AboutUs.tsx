import { AboutUsLayer } from "@components/overlays";
import { Button, Heading, Paragraph, SectionWrapper } from "@components/ui";
export const AboutUs = () => {
	return (
		<div className="relative">
			<AboutUsLayer />
			<SectionWrapper container={false} name="about">
				<div className="flex flex-col md:flex-row items-center py-16">
					{/* Content */}
					<div className="flex-grow basis-full md:basis-2/6 px-0 md:pl-32">
						<div className="text-center md:text-left">
							<Heading>About</Heading>
							<div className="mt-4 px-16 md:px-0 text-sm md:text-base">
								<Paragraph className="mb-4 md:mb-0">
									Enjoy football? Obsessed with Crypto?
									You&apos;ll love Euro Cup Inu.
								</Paragraph>

								<Paragraph className="mb-4">
									One of the worlds biggest football events is
									about to takeover.
								</Paragraph>
								<Paragraph>
									$ECI unites crypto chads and football fans
									worldwide!
								</Paragraph>
							</div>

							<div className="mt-8">
								<a
									target="_blank"
									href="https://app.uniswap.org/swap?outputCurrency=0x32F0D04B48427A14Fb3Cbc73DB869e691A9feC6f&chain=mainnet"
								>
									<Button text="Buy $ECI" />
								</a>
							</div>
						</div>
					</div>

					{/* Media */}
					<div className="flex-grow w-full basis-full md:basis-2/4 pt-8 md:pt-0">
						<div className="w-5/6 h-[180px] md:h-[450px] 2xl:h-[490px] ml-auto flying-cat"></div>
					</div>
				</div>
			</SectionWrapper>
		</div>
	);
};
