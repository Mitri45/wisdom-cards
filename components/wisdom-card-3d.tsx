"use client";

import type { WisdomItem } from "@/types/wisdom";
import { motion } from "framer-motion";
import Image from "next/image";

interface WisdomCard3DProps {
	wisdom: WisdomItem;
	position: number;
	totalCards: number;
	onClick: () => void;
	isActive: boolean;
	isMobile: boolean;
}

export function WisdomCard3D({
	wisdom,
	position,
	totalCards,
	onClick,
	isActive,
	isMobile,
}: WisdomCard3DProps) {
	// Calculate z-index, scale, and position based on card position
	const getCardStyles = () => {
		// For mobile, use a simpler transformation
		if (isMobile) {
			return {
				zIndex: totalCards - Math.abs(position),
				x: position === 0 ? 0 : position > 0 ? 150 : -150,
				y: 0,
				scale: position === 0 ? 1.1 : 0.9,
				rotateY: 0,
				opacity: position === 0 ? 1 : 0.8,
			};
		}

		// For desktop, use more dramatic 3D effects
		return {
			zIndex: totalCards - Math.abs(position),
			x:
				position === 0
					? 0
					: position > 0
						? 200 + position * 50
						: -200 + position * 50,
			y: position === 0 ? 0 : 20 * Math.abs(position),
			scale: 1 - Math.abs(position) * 0.1,
			rotateY: position === 0 ? 0 : position > 0 ? -15 : 15,
			opacity: position === 0 ? 1 : 1 - Math.abs(position) * 0.2,
		};
	};

	const styles = getCardStyles();

	return (
		<motion.div
			className={`absolute aspect-[3/4] cursor-pointer ${isMobile ? "w-4/5" : "w-1/3"}`}
			initial={false}
			animate={{
				zIndex: styles.zIndex,
				x: styles.x,
				y: styles.y,
				scale: styles.scale,
				rotateY: styles.rotateY,
				opacity: styles.opacity,
			}}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 30,
				mass: 1,
			}}
			onClick={onClick}
			onTap={onClick}
			whileHover={
				isActive ? { scale: styles.scale * 1.05, y: styles.y - 10 } : {}
			}
			style={{
				transformStyle: "preserve-3d",
				transformOrigin: "center center",
				boxShadow: isActive
					? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px 5px rgba(139, 92, 246, 0.3)"
					: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
			}}
		>
			<div
				className={`relative bg-gradient-to-br rounded-2xl overflow-hidden h-full
          ${getGradientColor(position)}
          border border-white/20 backdrop-filter backdrop-blur-sm`}
			>
				<div className="relative w-full h-full">
					<Image
						src={wisdom.imageUrl || "/placeholder.svg"}
						alt={wisdom.title}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>

				{isActive && (
					<div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
						<span className="inline-flex items-center text-xs text-white/90 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm animate-pulse">
							Click to explore
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 ml-1"
							>
								<title>Explore icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
								/>
							</svg>
						</span>
					</div>
				)}
			</div>
		</motion.div>
	);
}

// Helper function to get gradient colors based on position
function getGradientColor(position: number): string {
	if (position === 0) return "from-purple-900 to-indigo-900"; // Active card
	if (position === 1 || position === -1) return "from-indigo-900 to-blue-900"; // Adjacent cards
	if (position === 2 || position === -2) return "from-blue-900 to-cyan-900"; // Further cards
	return "from-slate-900 to-slate-800"; // Default for other positions
}
