"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@/components/ui/dialog";
import { useMobile } from "@/hooks/use-mobile";
import type { WisdomItem } from "@/types/wisdom";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface WisdomModalProps {
	wisdom: WisdomItem;
	onClose: () => void;
}

export function WisdomModal({ wisdom, onClose }: WisdomModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const isMobile = useMobile();
	const [activeTab, setActiveTab] = useState<
		"Explanation" | "Examples" | "Action Steps"
	>("Explanation");

	useEffect(() => {
		setIsOpen(true);
	}, []);

	const handleClose = () => {
		setIsOpen(false);
		setTimeout(onClose, 300);
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
			<DialogContent
				className={`sm:max-w-[1000px] lg:max-w-[1200px] xl:max-w-[1400px] w-full ${isMobile ? "h-screen p-0 flex flex-col" : "h-auto max-h-[90vh] p-4 md:p-0 md:h-[90vh] flex flex-col md:grid md:grid-cols-5"} overflow-hidden bg-gradient-to-br from-slate-900 to-purple-900 border-purple-500/20 text-white`}
			>
				<div className="relative h-60 md:col-span-2 md:h-full">
					<Image
						src={wisdom.imageUrl || "/placeholder.svg"}
						alt={wisdom.title}
						fill
						className="object-cover"
						priority
					/>
				</div>

				<div className="flex-1 flex flex-col overflow-y-auto md:col-span-3">
					<div className="p-6 border-b border-purple-800 flex-none flex items-center justify-between">
						<div>
							<DialogTitle className="text-2xl sm:text-3xl font-bold mb-2">
								{wisdom.title}
							</DialogTitle>
							<DialogDescription className="text-base sm:text-lg text-purple-200">
								{wisdom.shortDescription}
							</DialogDescription>
						</div>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleClose}
							className={`h-8 w-8 bg-black/30 hover:bg-black/50 text-white rounded-full ${isMobile ? "hidden" : ""}`}
							aria-label="Close modal"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>

					{isMobile && (
						<div className="flex border-b border-purple-800">
							<button
								type="button"
								onClick={() => setActiveTab("Explanation")}
								className={`flex-1 py-2 text-center ${
									activeTab === "Explanation"
										? "text-white border-b-2 border-white"
										: "text-purple-300"
								}`}
							>
								Explanation
							</button>
							{wisdom.examples && (
								<button
									type="button"
									onClick={() => setActiveTab("Examples")}
									className={`flex-1 py-2 text-center ${
										activeTab === "Examples"
											? "text-white border-b-2 border-white"
											: "text-purple-300"
									}`}
								>
									Examples
								</button>
							)}
							{wisdom.actionSteps && (
								<button
									type="button"
									onClick={() => setActiveTab("Action Steps")}
									className={`flex-1 py-2 text-center ${
										activeTab === "Action Steps"
											? "text-white border-b-2 border-white"
											: "text-purple-300"
									}`}
								>
									Action Steps
								</button>
							)}
						</div>
					)}

					<div className="flex-1 p-6 space-y-6">
						{(!isMobile || activeTab === "Explanation") && (
							<div>
								<h3 className="text-xl font-semibold mb-3 text-purple-100">
									Explanation
								</h3>
								<p className="text-purple-100 leading-relaxed">
									{wisdom.explanation}
								</p>
							</div>
						)}

						{wisdom.examples && (!isMobile || activeTab === "Examples") && (
							<div>
								<h3 className="text-xl font-semibold mb-3 text-purple-100">
									Examples
								</h3>
								<ul className="list-disc pl-5 space-y-2 text-purple-100">
									{wisdom.examples.map((ex) => (
										<li key={ex}>{ex}</li>
									))}
								</ul>
							</div>
						)}

						{wisdom.actionSteps &&
							(!isMobile || activeTab === "Action Steps") && (
								<div>
									<h3 className="text-xl font-semibold mb-3 text-purple-100">
										Action Steps
									</h3>
									<ul className="list-disc pl-5 space-y-2 text-purple-100">
										{wisdom.actionSteps.map((step) => (
											<li key={step}>{step}</li>
										))}
									</ul>
								</div>
							)}
					</div>
				</div>

				{isMobile && (
					<div className="p-4 border-t border-purple-800">
						<Button
							type="button"
							onClick={handleClose}
							className="w-full bg-black/30 hover:bg-black/50 text-white rounded-full"
						>
							Close
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
