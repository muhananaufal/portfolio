'use client';

import { useState } from 'react';
import { ChatButton } from './chat/ChatButton';
import { ChatModal } from './chat/ChatModal';

export const Chat = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{!isOpen && <ChatButton onClick={() => setIsOpen(true)} />}
			<ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	);
};
