import { PropsWithChildren } from "react";

export const Card: React.FC<PropsWithChildren> = ({ ...props }) => {
	return (
		<div className="px-16 py-8 bg-black/50 border-2 border-white rounded-tr-2xl rounded-bl-2xl">
			{props.children}
		</div>
	);
};
