"use client";
import { useEffect } from "react";
import { Curve, Ready } from "@/components";
import {
	HeroProjects,
	ListsProjects,
	Publication,
} from "@/container";

export default function Presentation() {
	useEffect(() => {
		(async () => {
			const LocomotiveScroll = (await import("locomotive-scroll")).default;
			const locomotiveScroll = new LocomotiveScroll();
		})();
	}, []);
	return (
		<>
			<Curve backgroundColor={"#DBE2EF"}>
				<HeroProjects />
				<ListsProjects />
				<Ready />
			</Curve>
		</>
	);
}
