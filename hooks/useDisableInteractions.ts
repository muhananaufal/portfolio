'use client';

import { useEffect } from 'react';

export function useDisableInteractions() {
	useEffect(() => {
		// Disable right-click context menu
		const disableContextMenu = (event: MouseEvent) => {
			event.preventDefault();
		};

		// Disable keyboard shortcuts for DevTools
		const disableDevToolsShortcuts = (event: KeyboardEvent) => {
			if (
				(event.ctrlKey && event.shiftKey && ['I', 'J', 'C', 'U'].includes(event.key.toUpperCase())) || // Ctrl+Shift+I/J/C/U
				event.key === 'F12' // F12
			) {
				event.preventDefault();
			}
		};

		// Disable text/image dragging
		const disableDrag = (event: DragEvent) => {
			event.preventDefault();
		};

		document.addEventListener('contextmenu', disableContextMenu);
		document.addEventListener('keydown', disableDevToolsShortcuts);
		document.addEventListener('dragstart', disableDrag);

		return () => {
			document.removeEventListener('contextmenu', disableContextMenu);
			document.removeEventListener('keydown', disableDevToolsShortcuts);
			document.removeEventListener('dragstart', disableDrag);
		};
	}, []);
}
