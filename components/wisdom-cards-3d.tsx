"use client";

import { WisdomCard3D } from "@/components/wisdom-card-3d";
import { WisdomModal } from "@/components/wisdom-modal";
import { wisdomData } from "@/data/wisdom-data";
import { useMobile } from "@/hooks/use-mobile";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";

export function WisdomCards3D() {
	const [selectedWisdom, setSelectedWisdom] = useState<number | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const isMobile = useMobile();
	// Swipe handlers for mobile carousel
	const swipeHandlers = useSwipeable({
		onSwipedLeft: () => handleNext(),
		onSwipedRight: () => handlePrev(),
		delta: 50,
		trackTouch: true,
		trackMouse: false,
		preventScrollOnSwipe: true,
	});

	const openModal = (index: number) => {
		setSelectedWisdom(index);
	};

	const closeModal = () => {
		setSelectedWisdom(null);
	};

	const handleNext = () => {
		setActiveIndex((prev) => (prev + 1) % wisdomData.length);
	};

	const handlePrev = () => {
		setActiveIndex(
			(prev) => (prev - 1 + wisdomData.length) % wisdomData.length,
		);
	};

	// Add refs to keep track of the latest activeIndex and selectedWisdom
	const activeIndexRef = useRef(activeIndex);
	const selectedWisdomRef = useRef(selectedWisdom);

	// Sync refs when state changes
	useEffect(() => {
		activeIndexRef.current = activeIndex;
	}, [activeIndex]);
	useEffect(() => {
		selectedWisdomRef.current = selectedWisdom;
	}, [selectedWisdom]);

	// ⬇️ updated effect to intercept Enter in capture phase and prevent the modal's auto-close
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.repeat) return;

			if (e.key === "Enter" && selectedWisdomRef.current === null) {
				// prevent the Enter from "clicking" the modal's close button
				e.preventDefault();
				e.stopPropagation();
				setSelectedWisdom(activeIndexRef.current);
			} else if (e.key === "Escape" && selectedWisdomRef.current !== null) {
				e.preventDefault();
				e.stopPropagation();
				setSelectedWisdom(null);
			} else if (e.key === "ArrowRight") {
				e.preventDefault();
				if (selectedWisdomRef.current !== null) {
					const nextIndex = (selectedWisdomRef.current + 1) % wisdomData.length;
					setSelectedWisdom(nextIndex);
				} else {
					setActiveIndex((prev) => (prev + 1) % wisdomData.length);
				}
			} else if (e.key === "ArrowLeft") {
				e.preventDefault();
				if (selectedWisdomRef.current !== null) {
					const prevIndex =
						(selectedWisdomRef.current - 1 + wisdomData.length) %
						wisdomData.length;

					setSelectedWisdom(prevIndex);
				} else {
					setActiveIndex(
						(prev) => (prev - 1 + wisdomData.length) % wisdomData.length,
					);
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown, true);
		return () => {
			window.removeEventListener("keydown", handleKeyDown, true);
		};
	}, []);

	return (
		<div className="relative py-12 w-full h-full overflow-hidden">
			{/* Navigation buttons */}
			<div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
				<button
					type="button"
					onClick={handlePrev}
					className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors"
					aria-label="Previous card"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6"
						aria-hidden="true"
					>
						<title>Previous</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5L8.25 12l7.5-7.5"
						/>
					</svg>
				</button>
			</div>
			<div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
				<button
					type="button"
					onClick={handleNext}
					className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-colors"
					aria-label="Next card"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-6 h-6"
						aria-hidden="true"
					>
						<title>Next</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 4.5l7.5 7.5-7.5 7.5"
						/>
					</svg>
				</button>
			</div>

			{/* 3D Card Stack */}
			<div
				{...swipeHandlers}
				ref={containerRef}
				className="w-full px-4 h-full flex items-center justify-center perspective overflow-hidden"
				style={{ touchAction: "pan-y" }}
			>
				<div className="relative w-full h-full flex items-center justify-center">
					{wisdomData.map((wisdom, index) => {
						// Calculate signed position offset relative to active index
						const total = wisdomData.length;
						const rawPosition = (index - activeIndex + total) % total;
						const position =
							rawPosition > total / 2 ? rawPosition - total : rawPosition;
						// Show active ±2 cards on both sides
						const isVisible = Math.abs(position) <= 2;

						return isVisible ? (
							<WisdomCard3D
								key={`wisdom-card-${wisdom.title}`}
								wisdom={wisdom}
								position={position}
								totalCards={wisdomData.length}
								onClick={() => {
									if (index === activeIndex) {
										openModal(index);
									} else {
										setActiveIndex(index);
									}
								}}
								isActive={position === 0}
								isMobile={isMobile}
							/>
						) : null;
					})}
				</div>
			</div>

			{/* Card counter */}
			<div className="text-center mt-2">
				<p className="text-purple-200 font-medium">
					{activeIndex + 1} / {wisdomData.length}
				</p>
			</div>

			{/* Modal */}
			{selectedWisdom !== null && (
				<WisdomModal wisdom={wisdomData[selectedWisdom]} onClose={closeModal} />
			)}
		</div>
	);
}
