'use client';
import { LinksButton, LinksHead } from '@/components';

export default function Links() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-start pt-16 px-4 bg-[#DBE2EF]">
			<LinksHead />
			<LinksButton />
		</div>
	);
}
