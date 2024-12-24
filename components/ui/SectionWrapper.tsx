import classNames from "classnames";
import { PropsWithChildren } from "react";
export const SectionWrapper: React.FC<
	PropsWithChildren & { container?: boolean; name: string }
> = ({ container = true, ...props }) => {
	const sectionClasses = classNames({
		"relative z-10": true,
		"container mx-auto": container === true,
	});
	return <section className={sectionClasses}>{props.children}</section>;
};
