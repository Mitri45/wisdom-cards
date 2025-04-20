"use client";

import Image from "next/image";

interface WisdomCardProps {
	title: string;
	imageUrl: string;
	onClick: () => void;
}

export function WisdomCard({ title, imageUrl, onClick }: WisdomCardProps) {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			onClick();
		}
	};

	return (
		<div
			className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col overflow-hidden"
			onClick={onClick}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			role="button"
			aria-label={title}
		>
			<div className="relative w-full h-48">
				<Image
					src={imageUrl || "/placeholder.svg"}
					alt={title}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>
			<div className="p-6 flex-1 flex items-center justify-center">
				<h3 className="text-xl font-semibold text-center text-slate-800">
					{title}
				</h3>
			</div>
		</div>
	);
}
