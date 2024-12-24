import { Layout, Sections, Separator } from "@components";
export default function Home() {
	return (
		<Layout>
			<Sections.Hero />
			<Separator />
			<Sections.AboutUs />
			<Separator />
			<Sections.Tokenomics />
			<Separator />
			<Sections.BeOnEuros />
			<Separator />
			<Sections.BecomeAFan />
			<Separator />
		</Layout>
	);
}
