'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import logo from '@/public/logo.png';

import { navbarItems } from '@/constants';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { AnimatePresence, motion } from 'framer-motion';
import TransitionLink from './TransitionLink';

export default function MobileNav() {
	const [toggle, setToggle] = useState(false);
	return (
		<>
			<div className="w-full hidden justify-between items-center h-[8vh] padding-x sm:flex xm:flex md:flex bg-white ">
				<TransitionLink href={'/'}>
					<Image src={logo} alt="ochi logo" width={200} height={200} />
				</TransitionLink>
				<HiOutlineMenuAlt4 onClick={() => setToggle(true)} className="text-3xl cursor-pointer text-black" />
			</div>
			<AnimatePresence>
				{toggle && (
					<motion.div
						initial={{ y: '-100%' }}
						animate={{ y: 0 }}
						exit={{ y: '-100%' }}
						transition={{ duration: 1, ease: [0.3, 0.86, 0.36, 0.95] }}
						className="fixed top-0 bottom-0 right-0 z-50 w-full min-h-screen flex justify-end items-end flex-col bg-secondry"
					>
						<div className="w-full flex justify-between items-center h-[8vh] border-b border-[#f1f1f155] padding-x">
							<TransitionLink href={'/'}>
								<Image src={logo} alt="logo" width={200} height={200} className="invert" />
							</TransitionLink>
							<IoMdClose onClick={() => setToggle(false)} className="text-3xl cursor-pointer text-white hover:text-about active:text-about" />
						</div>
						<ul className="h-full w-full flex justify-center text-left flex-col gap-[10px] padding-x">
							{navbarItems.map((item) => (
								<TransitionLink
									href={item.href}
									key={item.id}
									onClick={(toggle) => setToggle(!toggle)}
									className="text-[80px] leading-[67px] font-FoundersGrotesk uppercase font-bold tracking-[-.9] hover:text-about active:text-about transition-all duration-500 text-white"
								>
									{item.title}
								</TransitionLink>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
