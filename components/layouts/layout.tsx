import { Footer } from "@components";
import localFont from "next/font/local";
import Head from "next/head";
const siteFont = localFont({
	src: [
		{
			path: "../../public/fonts/UEFAEuro-Book.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/UEFAEuro-Medium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../../public/fonts/UEFAEuro-Bold.ttf",
			weight: "700",
			style: "bold",
		},
		{
			path: "../../public/fonts/UEFAEuro-HeavyNarrow.ttf",
			weight: "800",
			style: "bold",
		},
		{
			path: "../../public/fonts/UEFAEuro-ExtraBoldNarrow.ttf",
			weight: "900",
			style: "bold",
		},
	],
	display: "swap",
});
export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className={`${siteFont.className} overflow-hidden`}>
			<Head>
				<title>Euro Cup Inu</title>
			</Head>
			{children}
			<Footer />
		</main>
	);
};
