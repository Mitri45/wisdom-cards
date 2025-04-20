import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t border-purple-800 py-3 bg-slate-900/50 backdrop-blur-sm">
			<div className="container mx-auto px-4">
				<div className="text-center">
					<p className="text-purple-200 mb-2">
						All images are original artwork by{" "}
						<Link
							href="https://drex.art/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-pink-300 hover:text-pink-200 transition-colors font-medium"
						>
							Drex
						</Link>
						.
					</p>
					<p className="text-purple-300 text-sm">
						Explore more works:{" "}
						<Link
							href="https://drex.art/frames"
							target="_blank"
							rel="noopener noreferrer"
							className="text-purple-200 hover:text-white transition-colors"
						>
							Frames
						</Link>
						,{" "}
						<Link
							href="https://drex.art/prints"
							target="_blank"
							rel="noopener noreferrer"
							className="text-purple-200 hover:text-white transition-colors"
						>
							Prints
						</Link>
						,{" "}
						<Link
							href="https://drex.art/t-shirts"
							target="_blank"
							rel="noopener noreferrer"
							className="text-purple-200 hover:text-white transition-colors"
						>
							T-Shirts
						</Link>{" "}
						&amp;{" "}
						<Link
							href="https://drex.art/hoodies"
							target="_blank"
							rel="noopener noreferrer"
							className="text-purple-200 hover:text-white transition-colors"
						>
							Hoodies
						</Link>
						.
					</p>
				</div>
			</div>
		</footer>
	);
}
