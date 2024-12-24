import { PropsWithChildren } from "react";

type HeadingProps = PropsWithChildren & {
	className?: string;
};
export const Heading: React.FC<HeadingProps> = ({ ...props }) => {
	return (
		<h2
			className={`${
				props.className ? props.className : ""
			} text-3xl md:text-6xl text-white font-extrabold`}
		>
			{props.children}
		</h2>
	);
};
