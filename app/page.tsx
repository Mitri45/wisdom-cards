import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { WisdomCards3D } from "@/components/wisdom-cards-3d";

export default function Home() {
	return (
		<main className="h-screen overflow-y-hidden bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex flex-col">
			<Hero />
			<div className="flex-1 w-full flex items-start justify-center">
				<WisdomCards3D />
			</div>
			<Footer />
		</main>
	);
}
