import { Heading, SectionWrapper, SiteImage } from "@components/ui";

import { Chewy } from "next/font/google";
import { BecomeFanLayer } from "@components/overlays";
const elementFont = Chewy({ subsets: ["latin"], weight: ["400"] });

export const BecomeAFan = () => {
	return (
		<div className="relative">
			<BecomeFanLayer />
			<SectionWrapper name="roadmap">
				<div className="py-12 pb-0 md:py-16">
					<Heading className="text-center">
						Choose $ECI for Euro 2024
					</Heading>

					<div className="w-3/4 mx-auto mt-16 -mb-2 md:mb-0 relative">
						{/* <SiteImage
							src={"/images/goal.svg"}
							className={"w-full"}
						/> */}
						<SiteImage
							src={"/images/goal1.svg"}
							className={"w-full"}
						/>
						<SiteImage
							src={"/images/goal2.svg"}
							className={
								"w-[140px] md:w-[380px] absolute bottom-0 -right-16 md:-right-48 bounce"
							}
						/>
						<SiteImage
							src={"/images/goal3.svg"}
							className={
								"w-[75px] md:w-[150px] absolute bottom-[35%] right-20 md:right-48 animate-spin"
							}
						/>
					</div>
				</div>
			</SectionWrapper>
		</div>
	);
};
