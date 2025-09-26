// components/chat/ChatModal.tsx

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, Send, Loader2, Sparkles, Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useChat } from '@ai-sdk/react';
import Image from 'next/image';
import { toast } from 'sonner'; // Ditambahkan untuk tombol copy
import { CopyButton } from './CopyButton';

interface ChatModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export const ChatModal = ({ isOpen, onClose }: ChatModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const chatContentRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const preRef = useRef<HTMLPreElement | null>(null);

	const { messages, handleInputChange, input, handleSubmit, isLoading, setMessages } = useChat({
		api: '/api/gemini',
	});

	const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e as any);
		}
	};

	const clearChat = () => {
		setMessages([]);
	};

	useEffect(() => {
		if (chatContentRef.current) {
			chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<>
			{isOpen && (
				<motion.div
					ref={modalRef}
					initial={{ opacity: 0, scale: 0.9, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.9, y: 20 }}
					transition={{ type: 'spring', damping: 25, stiffness: 300 }}
					className="md:rounded-xl lg:rounded-xl xl:rounded-xl font-NeueMontreal fixed bottom-0 right-0 w-full md:bottom-6 md:right-6 lg:bottom-6 lg:right-6 xl:bottom-6 xl:right-6 md:w-[35rem] md:h-[700px] lg:w-[35rem] lg:h-[700px] xl:w-[35rem] xl:h-[700px] sm:h-[100dvh] xm:h-[101dvh] bg-white shadow-xl overflow-hidden z-[8001]"
				>
					{/* Header - Dikembalikan ke versi asli Anda */}
					<div className="flex items-center justify-between p-4 md:p-6 lg:p-6 xl:p-6 border-b">
						<motion.h2 className="text-xl md:text-2xl font-semibold flex items-center gap-2 relative" whileHover={{ scale: 1.05 }}>
							Firefly AI
							<Sparkles className="w-5 h-5" />
						</motion.h2>
						<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={onClose} className="p-2 rounded-full bg-black hover:bg-white transition-colors">
							<X className="w-5 h-5 md:w-6 md:h-6 lg:w-6 lg:h-6 xl:w-6 xl:h-6  text-white  hover:text-black transition-colors" />
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
								{messages.map((message, index) => (
									<div key={index} className="relative group">
										<motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-center gap-3 md:gap-4 lg:gap-4 xl:gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
											{/* Avatar - Dikembalikan ke versi asli Anda */}
											<div className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-16 xl:h-16 rounded-full flex items-center justify-center ${message.role === 'user' ? 'bg-about' : 'bg-about'}`}>
												{message.role === 'user' ? (
													<Image className="text-white" src="/chat/march7-icon.gif" width={60} height={60} alt="User Icon" unoptimized />
												) : (
													<Image src="/chat/firefly-icon.gif" width={60} height={60} alt="AI Icon" unoptimized />
												)}
											</div>
											{/* PERUBAHAN HANYA DI SINI */}
											<div
												className={`prose max-w-[75%] rounded-lg p-3 text-base md:p-4 md:text-lg lg:p-4 lg:text-lg xl:p-4 xl:text-lg break-words ${
													message.role === 'user' ? 'bg-marquee text-white prose-invert' : 'bg-black text-white prose-invert'
												}`}
											>
												<ReactMarkdown
													remarkPlugins={[remarkGfm]}
													// Ini adalah satu-satunya penambahan fungsionalitas
													components={{
														h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
														h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-3 mb-1" {...props} />,
														h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mt-2 mb-1" {...props} />,
														ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2" {...props} />,
														ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-2" {...props} />,
														a: ({ node, ...props }) => <a className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
														p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
														code: ({ node, inline, className, children, ...props }: any) => {
															const match = /language-(\w+)/.exec(className || '');
															return !inline && match ? (
																<div className="bg-gray-800 rounded-md my-2">
																	<div className="flex items-center justify-between px-4 py-1 bg-gray-700 rounded-t-md text-xs text-gray-400">
																		<span>{match[1]}</span>
																		<button
																			onClick={() => {
																				navigator.clipboard.writeText(String(children));
																				toast.success('Copied to clipboard!');
																			}}
																			className="hover:text-white transition-colors"
																		>
																			Copy
																		</button>
																	</div>
																	<pre className="p-4 overflow-x-auto">
																		<code className="text-white" {...props}>
																			{children}
																		</code>
																	</pre>
																</div>
															) : (
																<code className="bg-gray-700 text-sm rounded px-1 py-0.5 mx-0.5" {...props}>
																	{children}
																</code>
															);
														},
													}}
												>
													{message.content}
												</ReactMarkdown>
											</div>
										</motion.div>
										<AnimatePresence>
											<CopyButton textToCopy={message.content} className={`${message.role === 'user' ? 'right-16' : 'left-16'} bottom-0 translate-y-1/2 opacity-0 group-hover:opacity-100`} />
										</AnimatePresence>
									</div>
								))}
								{/* Indikator Loading - Dikembalikan ke versi asli Anda */}
								{isLoading && (
									<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 md:gap-4 lg:gap-4 xl:gap-4">
										<div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-16 xl:h-16 rounded-full flex items-center justify-center bg-about">
											<Image src="/chat/firefly-icon.gif" width={60} height={60} alt="AI Icon" unoptimized />
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

					{/* Input Area - Dikembalikan ke versi asli Anda */}
					<div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-6 xl:p-6 bg-white border-t">
						<div className="relative scrollbar-thin">
							<form onSubmit={handleSubmit}>
								<textarea
									ref={inputRef}
									value={input}
									onChange={handleInputChange}
									onKeyDown={handleKeyPress}
									placeholder="Type your message..."
									disabled={isLoading}
									className="textarea w-full px-5 pr-24 py-3 md:px-5 md:py-4 md:pr-[7.8rem] lg:px-5 lg:py-4 lg:pr-[7.8rem] xl:px-5 xl:py-4 xl:pr-[7.8rem] rounded-lg border border-black disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg lg:text-lg xl:text-lg resize-none md:min-h-[60px] md:max-h-[120px] lg:min-h-[60px] lg:max-h-[120px] xl:min-h-[60px] xl:max-h-[120px] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent bg-white"
									style={{ height: '50px' }}
								/>
								<div className="absolute right-2 top-[0.3rem] flex gap-1 md:gap-2 lg:gap-2 xl:gap-2">
									<motion.button
										type="button"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										onClick={clearChat}
										disabled={isLoading || messages.length === 0}
										className="p-2 md:p-3 xl:p-3 lg:p-3 rounded-lg bg-black text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
									>
										{isLoading ? <Loader2 className="w-6 h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-7 xl:h-7 animate-spin" /> : <Trash2 className="w-6 h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-7 xl:h-7" />}
									</motion.button>
									<motion.button
										type="submit"
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										disabled={isLoading || !input.trim()}
										className="p-2 md:p-3 xl:p-3 lg:p-3 rounded-lg bg-black text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:text-white"
									>
										{isLoading ? <Loader2 className="w-6 h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-7 xl:h-7 animate-spin" /> : <Send className="w-6 h-6 md:w-7 md:h-7 lg:w-7 lg:h-7 xl:w-7 xl:h-7" />}
									</motion.button>
								</div>
							</form>
						</div>
					</div>
				</motion.div>
			)}
		</>
	);
};
