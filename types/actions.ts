import { LucideIcon } from 'lucide-react';

export type ActionItem =
	| {
			id: string;
			title: string;
			href: string;
			icon: LucideIcon;
			shortcut?: string;
	  }
	| {
			id: string;
			title: string;
			onSelect: () => void;
			icon: LucideIcon;
			shortcut?: string;
	  };

export interface ActionGroup {
	group: string;
	items: ActionItem[];
}
