import { Heading, Paragraph, SectionWrapper, SiteImage } from "@components/ui";
import Image from "next/image";
import { TokenomicsLayer } from "@components/overlays";

export const Tokenomics = () => {
	return (
		<div className="relative md:pb-16">
			<TokenomicsLayer />
			<SectionWrapper name="tokenomics">
				<div className="pt-16 md:pt-28 flex flex-col items-center relative px-8">
					<SiteImage
						unoptimized={true}
						src="/images/ripple.gif"
						className="container mx-auto"
					/>

					<div className="mt-20 md:mt-28">
						<Heading>Tokenomics</Heading>

						<Paragraph className="text-3xl text-white mt-3">
							<b>Supply:</b> 1,000,000,000
						</Paragraph>
					</div>

					<div className="mt-8 flex flex-col md:flex-row items-center gap-8 md:gap-28 relative">
						<div className="flex flex-col items-center mb-4">
							<div className="relative">
								<div className="absolute bottom-0 md:bottom-[50px] -left-8 md:-left-[209px] z-[10]">
									<div className="relative">
										<div className="w-[125px] md:w-[250px] relative">
											<Image
												src={"/images/tokenomic.svg"}
												alt="EuroCupINU"
												width={0}
												height={0}
												sizes="100vw"
												className="w-full h-full"
											/>
										</div>
									</div>
								</div>
								<div className="w-[190px] md:w-[350px] ml-16 md:ml-0">
									<Image
										src={"/images/pie-chart.svg"}
										alt="EuroCupInu - Pie Chart"
										width={0}
										height={0}
										sizes="100vw"
										className="w-full h-full"
									/>
								</div>
								<div className="w-[80px] md:w-[110px] ml-8 md:ml-0 mt-1 md:mt-2 md:mt-1 absolute top-2/4 -translate-y-2/4  left-2/4 -translate-x-2/4">
									<Image
										src={"/content/elements/football.png"}
										alt="EuroCupInu - Ball"
										width={0}
										height={0}
										sizes="100vw"
										className="w-full h-full animate-spin"
										style={{
											animationDuration: "5s",
										}}
									/>
								</div>
							</div>
							<div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 mt-4 md:mt-8">
								<div className="flex items-center gap-4">
									<span className="w-7 h-7 rounded-full bg-[#EA3323] " />
									<Paragraph>Uni-V2 pool</Paragraph>
								</div>
								<div className="flex items-center gap-4">
									<span className="w-7 h-7 rounded-full bg-[#FFCB01] " />
									<Paragraph>Rewards</Paragraph>
								</div>
								<div className="flex items-center gap-4">
									<span className="w-7 h-7 rounded-full bg-[#00BA5D] " />
									<Paragraph>Partnerships</Paragraph>
								</div>
							</div>
						</div>

						<div>
							<ul className="text-white gap-6 text-lg md:text-2xl mb-6 flex md:flex-col flex-row flex-wrap items-center justify-center md:items-start">
								<li>
									<p className="flex flex-row md:flex-col">
										<span>
											<b>Tax:</b>
										</span>
										<span>4/4</span>
									</p>
								</li>
								<li>
									<p className="flex flex-row md:flex-col">
										<span>
											<b>LP Locked:</b>
										</span>
										<span> 6 months</span>
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</SectionWrapper>
		</div>
	);
};
