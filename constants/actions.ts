// constants/actions.ts

import { Home, User, FolderKanban, Award, Undo2, MessageSquare, Link, Mail, Github, Linkedin, Newspaper, Instagram, MessageCircleMore, Facebook, Play, Pause, SkipBack, SkipForward, FileDown, Code } from 'lucide-react';
import { usePlayerStore } from '@/store/usePlayerStore';
import type { ActionGroup } from '@/types/actions';
import { toast } from 'sonner';

export const getActions = (): ActionGroup[] => {
	const { isPlaying, togglePlayPause, nextTrack, prevTrack } = usePlayerStore.getState();

	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = '/cv/CV_Muhana_Naufal.pdf';
		link.download = 'CV_Muhana_Naufal.pdf';
		link.click();
		toast.success('CV downloaded successfully!');
	};

	return [
		{
			group: 'Navigation',
			items: [
				{ id: 'home', title: 'Home', href: '/', icon: Home, shortcut: '⌘ H' },
				{ id: 'about', title: 'About', href: '/about', icon: User, shortcut: '⌘ A' },
				{ id: 'projects', title: 'Projects', href: '/projects', icon: FolderKanban, shortcut: '⌘ P' },
				{ id: 'certifications', title: 'Certifications', href: '/certifications', icon: Award, shortcut: '⌘ C' },
				{ id: 'rewinds', title: 'Rewinds', href: '/rewinds', icon: Undo2, shortcut: '⌘ R' },
				{ id: 'contact', title: 'Contact', href: '/contact', icon: MessageSquare, shortcut: '⌘ T' },
			],
		},
		{
			group: 'Actions',
			items: [
				{
					id: 'copy-email',
					title: 'Copy Email',
					onSelect: () => navigator.clipboard.writeText('muhananaufal8@gmail.com'),
					icon: Mail,
					shortcut: '⇧ E',
				},
				{
					id: 'download-cv',
					title: 'Download CV',
					onSelect: handleDownload,
					icon: FileDown,
					shortcut: '⇧ C',
				},
			],
		},
		{
			group: 'Music',
			items: [
				{
					id: 'toggle-music',
					title: isPlaying ? 'Pause Music' : 'Play Music',
					onSelect: togglePlayPause,
					icon: isPlaying ? Pause : Play,
					shortcut: '⌥ P',
				},
				{
					id: 'next-track',
					title: 'Next Track',
					onSelect: nextTrack,
					icon: SkipForward,
					shortcut: '⌥ →',
				},
				{
					id: 'prev-track',
					title: 'Previous Track',
					onSelect: prevTrack,
					icon: SkipBack,
					shortcut: '⌥ ←',
				},
			],
		},
		{
			group: 'Social & Links',
			items: [
				{ id: 'linktree', title: 'Linktree', href: '/me', icon: Link, shortcut: '⌘ ⇧ T' },
				{ id: 'github', title: 'GitHub', href: 'https://github.com/muhananaufal', icon: Github, shortcut: '⌘ ⇧ G' },
				{ id: 'linkedin', title: 'LinkedIn', href: 'https://www.linkedin.com/in/muhana-naufal/', icon: Linkedin, shortcut: '⌘ ⇧ L' },
				{ id: 'medium', title: 'Medium', href: 'https://medium.com/@muhananaufal/', icon: Newspaper, shortcut: '⌘ ⇧ M' },
				{ id: 'instagram', title: 'Instagram', href: 'https://www.instagram.com/_muhananaufal_/', icon: Instagram, shortcut: '⌘ ⇧ I' },
				{ id: 'whatsapp', title: 'WhatsApp', href: 'https://wa.me/+6285799470985', icon: MessageCircleMore, shortcut: '⌘ ⇧ W' },
				{ id: 'facebook', title: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100022179201787/', icon: Facebook, shortcut: '⌘ ⇧ F' },
				{ id: 'source-code', title: 'View Source Code', href: 'https://github.com/muhananaufal/muhananaufal-portfolio', icon: Code, shortcut: '⌘ ⇧ S' },
			],
		},
	];
};
