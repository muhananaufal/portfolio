'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Trash2, Loader2, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import Image from 'next/image';

interface Message {
	id: string;
	text: string;
	sender: 'user' | 'ai';
	timestamp: Date;
	role?: 'user' | 'assistant';
	content?: string;
}

interface ChatModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const ChatModal = ({ isOpen, onClose }: ChatModalProps) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputValue, setInputValue] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isAiTyping, setIsAiTyping] = useState(false);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	const chatContentRef = useRef<HTMLDivElement>(null);

	const handleSubmit = async () => {
		if (!inputValue.trim() || isSubmitting) return;

		setIsSubmitting(true);
		setIsAiTyping(true);

		const userMessage: Message = {
			id: Date.now().toString(),
			text: inputValue.trim(),
			sender: 'user',
			timestamp: new Date(),
			role: 'user',
			content: inputValue.trim(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue('');

		// Scroll to bottom after userMessage is added
		setTimeout(() => {
			if (chatContentRef.current) {
				chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
			}
		}, 0);

		try {
			const apiMessages = messages.concat(userMessage).map((msg) => ({
				role: msg.role || (msg.sender === 'user' ? 'user' : 'assistant'),
				content: msg.content || msg.text,
			}));

			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ messages: apiMessages }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'Failed to get AI response');
			}

			const data = await response.json();

			const aiResponse: Message = {
				id: (Date.now() + 1).toString(),
				text: data.content,
				sender: 'ai',
				timestamp: new Date(),
				role: 'assistant',
				content: data.content,
			};

			setMessages((prev) => [...prev, aiResponse]);

			// Scroll to bottom after aiResponse is added
			setTimeout(() => {
				if (chatContentRef.current) {
					chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
				}
			}, 0);
		} catch (error) {
			console.error('Error getting AI response:', error);
			// Add error message to chat
			const errorMessage: Message = {
				id: (Date.now() + 1).toString(),
				text: 'Sorry, I encountered an error. Please try again.',
				sender: 'ai',
				timestamp: new Date(),
				role: 'assistant',
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsAiTyping(false);
			setIsSubmitting(false);
		}
	};

	// Rest of the component remains the same...
	const clearChat = async () => {
		if (isDeleting) return;

		setIsDeleting(true);
		await new Promise((resolve) => setTimeout(resolve, 500));
		setMessages([]);
		setInputValue('');
		setIsDeleting(false);
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	useEffect(() => {
		if (inputRef.current) {
			const input = inputRef.current;
			const tl = gsap.timeline({
				paused: true,
				defaults: { duration: 0.3, ease: 'power2.inOut' },
			});

			tl.to(input, { borderColor: 'transparent' });

			input.addEventListener('focus', () => tl.play());
			input.addEventListener('blur', () => tl.reverse());

			return () => {
				input.removeEventListener('focus', () => tl.play());
				input.removeEventListener('blur', () => tl.reverse());
			};
		}
	}, []);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					ref={modalRef}
					initial={{ opacity: 0, scale: 0.9, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.9, y: 20 }}
					transition={{ type: 'spring', damping: 25, stiffness: 300 }}
					className="md:rounded-xl lg:rounded-xl xl:rounded-xl font-NeueMontreal fixed bottom-0 right-0 w-full md:bottom-6 md:right-6 lg:bottom-6 lg:right-6 xl:bottom-6 xl:right-6 md:w-[35rem] md:h-[700px] lg:w-[35rem] lg:h-[700px] xl:w-[35rem] xl:h-[700px] sm:h-[100dvh] xm:h-[101dvh] bg-white shadow-xl overflow-hidden z-[8001]"
				>
					{/* Header */}
					<div className="flex items-center justify-between p-4 md:p-6 lg:p-6 xl:p-6 border-b">
						<h2 className="text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold flex">
							Firefly AI
							<Sparkles />
						</h2>
						<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
							<X className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 xl:w-6 xl:h-6" />
						</motion.button>
					</div>

					{/* Chat Content */}
					<div
						ref={chatContentRef}
						className="h-[calc(100%-190px)] sm:h-[calc(100%-160px)] xm:h-[calc(100%-160px)] overflow-y-auto p-4 md:p-6 lg:p-6 xl:p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 transition-colors"
					>
						{messages.length === 0 ? (
							<div className="flex items-center justify-center h-full text-gray-500 text-base md:text-lg lg:text-lg xl:text-lg">Send a message to start a chat with Firefly Assistant!</div>
						) : (
							<div className="space-y-4 md:space-y-6 lg:space-y-6 xl:space-y-6">
								{messages.map((message) => (
									<motion.div key={message.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-center gap-3 md:gap-4 lg:gap-4 xl:gap-4 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
										<div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-16 xl:h-16 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-black' : 'bg-about'}`}>
											{message.sender === 'user' ? <Image className="text-white" src="/chat/march7-icon.gif" width={60} height={60} alt="User Icon" /> : <Image src="/chat/firefly-icon.gif" width={60} height={60} alt="AI Icon" />}
										</div>
										<div className={`max-w-[75%] rounded-lg p-3 text-base md:p-4 md:text-lg lg:p-4 lg:text-lg xl:p-4 xl:text-lg break-words ${message.sender === 'user' ? 'bg-about text-black' : 'bg-black text-white'}`}>{message.text}</div>
									</motion.div>
								))}
								{isAiTyping && (
									<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 md:gap-4 lg:gap-4 xl:gap-4">
										<div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-16 xl:h-16 rounded-full flex items-center justify-center bg-about">
											<Image src="/chat/firefly-icon.gif" width={60} height={60} alt="AI Icon" />
										</div>
										<div className="max-w-[75%] rounded-lg p-3 md:p-4 bg-black text-white">
											<motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex gap-2">
												<span className="text-base md:text-lg lg:text-lg xl:text-lg">•</span>
												<span className="text-base md:text-lg lg:text-lg xl:text-lg">•</span>
												<span className="text-base md:text-lg lg:text-lg xl:text-lg">•</span>
											</motion.div>
										</div>
									</motion.div>
								)}
							</div>
						)}
					</div>

					{/* Input Area */}
					<div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-6 xl:p-6 bg-white border-t">
						<div className="relative scrollbar-thin">
							<textarea
								ref={inputRef}
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyDown={handleKeyPress}
								placeholder="Type your message..."
								disabled={isSubmitting || isDeleting}
								className="textarea w-full px-5 pr-24 py-3 md:px-5 md:py-4 md:pr-[7.8rem] lg:px-5 lg:py-4 lg:pr-[7.8rem] xl:px-5 xl:py-4 xl:pr-[7.8rem] rounded-lg border border-black disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg lg:text-lg xl:text-lg resize-none  md:min-h-[60px] md:max-h-[120px] lg:min-h-[60px] lg:max-h-[120px] xl:min-h-[60px] xl:max-h-[120px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent bg-white"
								style={{ height: '50px' }}
							/>
							<div className="absolute right-2 top-[0.3rem] flex gap-1 md:gap-2 lg:gap-2 xl:gap-2">
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={clearChat}
									disabled={isDeleting || isSubmitting || messages.length === 0}
									className="p-2 md:p-3 xl:p-3 lg:p-3 rounded-lg bg-black text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
								>
									{isDeleting ? <Loader2 className="w-6 h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-7 xl:h-7 animate-spin" /> : <Trash2 className="w-6 h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-7 xl:h-7" />}
								</motion.button>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={handleSubmit}
									disabled={isSubmitting || isDeleting || !inputValue.trim()}
									className="p-2 md:p-3 xl:p-3 lg:p-3 rounded-lg bg-black text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
								>
									{isSubmitting ? <Loader2 className="w-6 h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-7 xl:h-7 animate-spin" /> : <Send className="w-6 h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-7 xl:h-7" />}
								</motion.button>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
