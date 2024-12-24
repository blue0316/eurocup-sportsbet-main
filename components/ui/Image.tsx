import NextImage from "next/image";

type ImageProps = {
	src: string;
	className: string;
	imageClassName?: string;
	style?: object;
	imageStyle?: object;
	unoptimized?: boolean;
};
export const SiteImage: React.FC<ImageProps> = ({ ...props }) => {
	return (
		<div
			className={props.className}
			{...(props.style ? { style: props.style } : {})}
		>
			<NextImage
				unoptimized={props.unoptimized}
				src={props.src}
				alt="EuroCupInu"
				width={0}
				height={0}
				sizes="100vw"
				className={`w-full h-full ${
					props.imageClassName ? props.imageClassName : ""
				}`}
				{...(props.imageStyle ? { style: props.imageStyle } : {})}
			/>
		</div>
	);
};
