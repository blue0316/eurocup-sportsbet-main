export const Button = ({
	text,
	type,
	onClick,
}: {
	text: string;
	type?: string;
	onClick?: Function;
}) => {
	return (
		<button
			onClick={() => {
				if (onClick) {
					onClick();
				}
			}}
			className={`${
				type === "small"
					? "site-button-small"
					: type === "xs"
					? "site-button-xs text-xs md:text-base"
					: "site-button"
			}`}
		>
			<span
				className={`${
					type === "xs" ? "text-sm md:text-xl" : "text-xl"
				} relative z-[3] text-white font-bold`}
			>
				{text}
			</span>
			<span className="button"></span>
			<span className="button !top-[5px] !shadow-none !z-[1]"></span>
		</button>
	);
};
