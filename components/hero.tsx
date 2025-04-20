export function Hero() {
	return (
		<div className="relative z-20 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div className="absolute -inset-[10px] opacity-50">
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-500 rounded-full blur-[80px]" />
					<div className="absolute top-1/3 right-1/3 w-[400px] h-[300px] bg-blue-500 rounded-full blur-[100px]" />
					<div className="absolute bottom-1/3 left-1/3 w-[400px] h-[300px] bg-pink-500 rounded-full blur-[100px]" />
				</div>
			</div>

			<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 relative">
				<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300">
					Life Wisdom Cards
				</span>
			</h1>
			<p className="text-xl text-purple-100 max-w-3xl mx-auto mb-6 relative">
				A collection of timeless wisdom to help you navigate life's challenges
				and find greater meaning, purpose, and happiness.
			</p>
		</div>
	);
}
