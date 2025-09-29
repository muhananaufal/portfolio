'use client';

import { useLayoutConfig } from '@/hooks/useLayoutConfig';
import Navbar from './Navbar';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from './Footer';
import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ToolsMenu from './ToolsMenu';
import GlobalPlayer from './GlobalPlayer';
import { useCommandStore } from '@/store/useCommandStore';
import CommandPalette from './CommandPalette';
import { getActions } from '@/constants/actions';
import { toast } from 'sonner';
import type { ActionItem } from '@/types/actions';


export function ClientLayout({ children }: { children: React.ReactNode }) {
	const { shouldShowLayout } = useLayoutConfig();
	const pathname = usePathname();
	const router = useRouter();
	const { onToggle, onClose } = useCommandStore();
	const actions = getActions();

	// Listener untuk semua shortcut
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			// Shortcut utama untuk membuka/menutup palette
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				onToggle();
				return;
			}

			// Cari dan jalankan aksi shortcut lainnya
			const allItems: ActionItem[] = actions.flatMap((group) => group.items);
			for (const item of allItems) {
				if (!item.shortcut) continue;

				const parts = item.shortcut.split(' ');
				const mod = parts.length > 1 ? parts[0] : null;
				const key = parts.length > 1 ? parts[1] : parts[0];

				const isModPressed = !mod || (mod === '⌘' && (e.metaKey || e.ctrlKey)) || (mod === '⇧' && e.shiftKey) || (mod === '⌥' && e.altKey);

				if (isModPressed && e.key.toLowerCase() === key.toLowerCase()) {
					e.preventDefault();

					if ('href' in item) {
						item.href.startsWith('/') ? router.push(item.href) : window.open(item.href, '_blank');
					} else if ('onSelect' in item) {
						item.onSelect();
						if (item.id === 'copy-email') toast.success('Email copied!');
					}

					onClose();
					return;
				}
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, [actions, onToggle, onClose, router]);

	// Listener untuk keyboard shortcut utama (⌘K / Ctrl+K)
	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				onToggle();
			}
		};
		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, [onToggle]);

	return (
		<>
			{shouldShowLayout && <Navbar />}
			<AnimatePresence mode="wait">
				<motion.div key={pathname}>{children}</motion.div>
				{shouldShowLayout && (
					<>
						<ToolsMenu />
						<GlobalPlayer />
						<CommandPalette />
					</>
				)}
			</AnimatePresence>
			{shouldShowLayout && <Footer />}
		</>
	);
}
