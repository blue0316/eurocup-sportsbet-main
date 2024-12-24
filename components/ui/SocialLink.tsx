import Image from "next/image";
import Link from "next/link";

type SocialLinkProps = {
	href: string;
	icon: { src: string; alt: string };
};
export const SocialLink: React.FC<SocialLinkProps> = ({ ...props }) => {
	return (
		<Link href={props.href} target="_blank">
			<div className="w-10 md:w-16">
				<Image
					src={props.icon.src}
					alt={`EuroCupInu - ${props.icon.alt}`}
					width={0}
					height={0}
					sizes="100vw"
					className="w-full h-full"
				/>
			</div>
		</Link>
	);
};
