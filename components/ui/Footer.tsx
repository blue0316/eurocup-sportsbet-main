import { SiteImage } from "./Image";
import { Paragraph } from "./Paragraph";
import { SectionWrapper } from "./SectionWrapper";

export const Footer = () => {
	return (
		<footer className="relative text-white">
			{/* Footer Content */}
			<SectionWrapper name={"footer"}>
				<div className="py-12 md:py-16 px-12 md:px-0 flex flex-col md:flex-row gap-8 md:gap-28 items-center">
					<div>
						<SiteImage
							src="/logo-footer.svg"
							className="w-[80px] md:w-[160px]"
						/>
					</div>

					<div>
						<Paragraph className="text-center md:text-left mb-4">
							eurocupinu.com ($ECI) has no affiliation with any
							football player or club nor is endorsed by UEFA or
							the Euro 2024 event.
						</Paragraph>
						<Paragraph className="text-center md:text-left mb-4">
							$ECI is a meme coin with no intrinsic value or
							expectation of financial return, the token is
							useless and for entertainment purposes only.
						</Paragraph>
						<Paragraph className="text-center md:text-left">
							$ECI is not an investment or financial product and
							published content should not be taken as financial
							advice. $ECI are not responsible for any losses you
							may incur through the $ECI token on any affiliated
							website.
						</Paragraph>
					</div>
				</div>
			</SectionWrapper>

			<div>
				<div className="border-b border-black"></div>
				<p className="py-8 text-sm md:text-base text-center">
					©EuroCupInu, {new Date().getFullYear()}
				</p>
			</div>
		</footer>
	);
};
