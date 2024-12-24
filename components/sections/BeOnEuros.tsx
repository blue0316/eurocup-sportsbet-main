import { BeOnEurosLayer } from "@components/overlays";
import {
	Button,
	Heading,
	Paragraph,
	SectionWrapper,
	SiteImage,
} from "@components/ui";

export const BeOnEuros = () => {
	return (
		<div className="relative">
			<BeOnEurosLayer />
			<SectionWrapper name="how-to">
				<div className="pt-16 md:pt-32 pb-8 px-8">
					<div className="flex flex-col md:flex-row items-center gap-8 md:gap-24">
						<SiteImage
							src="/images/cards.png"
							className="md:basis-2/4 w-full"
						/>
						<div className="basis-full md:basis-2/4 text-center md:text-left">
							<Heading>Bet on Euro 2024!</Heading>

							<div className="mt-8 space-y-4">
								<Paragraph>
									Our GambleFi betting dapp allows you to bet
									on your favourite teams using $ECI tokens
								</Paragraph>
								<Paragraph>
									Immerse yourself into the Euro&apos;s like
									never before and back your best team.
								</Paragraph>
							</div>
							<div className="mt-8">
								<Button text="Coming soon!" />
							</div>
						</div>
					</div>

					<div className="flex w-full md:w-5/6 mx-auto mt-16">
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
				</div>
			</SectionWrapper>
		</div>
	);
};
