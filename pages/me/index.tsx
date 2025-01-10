'use client';
import { LinksButton, LinksHead } from '@/components';

export default function Me() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-start pt-28 px-4 bg-[#DBE2EF]">
			<LinksHead />
			<LinksButton />
		</div>
	);
}
