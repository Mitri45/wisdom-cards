"use client";

import { Card3D } from "@/components/3d-card";
import { WisdomModal } from "@/components/wisdom-modal";
import { wisdomData } from "@/data/wisdom-data";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

export function WisdomGrid() {
	const [selectedWisdom, setSelectedWisdom] = useState<number | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const openModal = (index: number) => {
		setSelectedWisdom(index);
	};

	const closeModal = () => {
		setSelectedWisdom(null);
	};

	// Staggered animation for cards appearing
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 15,
			},
		},
	};

	return (
		<div className="container mx-auto px-4 py-12">
			<motion.div
				ref={containerRef}
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				{wisdomData.map((wisdom) => (
					<motion.div key={wisdom.title} variants={cardVariants}>
						<Card3D
							title={wisdom.title}
							imageUrl={wisdom.imageUrl}
							index={wisdomData.findIndex(
								(item) => item.title === wisdom.title,
							)}
							total={wisdomData.length}
							onClick={() =>
								openModal(
									wisdomData.findIndex((item) => item.title === wisdom.title),
								)
							}
						/>
					</motion.div>
				))}
			</motion.div>

			{selectedWisdom !== null && (
				<WisdomModal wisdom={wisdomData[selectedWisdom]} onClose={closeModal} />
			)}
		</div>
	);
}
