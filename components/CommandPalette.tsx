// components/CommandPalette.tsx

'use client';

import { Command } from 'cmdk';
import { useCommandStore } from '@/store/useCommandStore';
import { useRouter } from 'next/navigation';
import { getActions } from '@/constants/actions';
import { toast } from 'sonner';
import { usePlayerStore } from '@/store/usePlayerStore';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import * as Dialog from '@radix-ui/react-dialog';

export default function CommandPalette() {
	const { isOpen, onClose } = useCommandStore();
	const router = useRouter();

	// Panggil hook untuk mendapatkan data dinamis
	usePlayerStore();

	// Panggil getActions() di sini agar ia selalu mendapatkan state terbaru
	const actions = getActions();

	const runAction = (action: () => void) => {
		action();
		onClose();
	};

	return (
		<Command.Dialog open={isOpen} onOpenChange={onClose}>
			<VisuallyHidden>
				<Dialog.Title>Global Command Menu</Dialog.Title>
			</VisuallyHidden>
			<Command.Input placeholder="Ketik perintah atau cari..." />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				{actions.map((group) => (
					<Command.Group key={group.group} heading={group.group}>
						{group.items.map((item) => {
							const Icon = item.icon;
							return (
								<Command.Item
									key={item.id}
									onSelect={() => {
										if ('href' in item) {
											if (item.href.startsWith('/')) {
												runAction(() => router.push(item.href));
											} else {
												runAction(() => window.open(item.href, '_blank'));
											}
										} else if ('onSelect' in item) {
											runAction(item.onSelect);
											if (item.id === 'copy-email') {
												toast.success('Email copied to clipboard!');
											}
										}
									}}
								>
									<div className="flex items-center gap-3">
										<Icon size={18} />
										<span>{item.title}</span>
									</div>
									{item.shortcut && (
										<div cmdk-shortcut="">
											{item.shortcut.split(' ').map((key, idx, arr) => (
												<span key={`${key}-${idx}`} className="flex items-center gap-1">
													<kbd>{key}</kbd>
													{idx < arr.length - 1 && <span>+</span>}
												</span>
											))}
										</div>
									)}
								</Command.Item>
							);
						})}
					</Command.Group>
				))}
			</Command.List>
			<div className="cmdk-footer">
				<span>Press</span>
				<kbd>⌘</kbd>
				<kbd>K</kbd>
				<span>to open</span>
			</div>
		</Command.Dialog>
	);
}
