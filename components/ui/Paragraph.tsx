import { PropsWithChildren } from "react";

export const Paragraph: React.FC<
	PropsWithChildren & { className?: string }
> = ({ ...props }) => {
	return (
		<p
			className={`${
				props.className ? props.className : ""
			} text-sm md:text-xl text-white`}
		>
			{props.children}
		</p>
	);
};
