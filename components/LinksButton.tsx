// components/LinksButton.tsx

'use client';

import { linksTree } from '@/constants';
import LinkItem from './LinkItem'; // Impor komponen baru

export default function LinksButton() {
	return (
		<div className="w-full max-w-md space-y-4 mb-14 mt-4">
			{linksTree.map((link, index) => (
				// Render komponen LinkItem di dalam map
				<LinkItem key={link.name} link={link} index={index} />
			))}
		</div>
	);
}
