'use client';

import Link from 'next/link';
import React, { useRef } from 'react';
import TransitionLink from './TransitionLink';

interface Text3dProps {
	primary: string;
	secondary: string;
	href: string;
}

export default function Text3d({ primary, secondary, href }: Text3dProps) {
	const text1 = useRef<HTMLParagraphElement>(null);
	const text2 = useRef<HTMLParagraphElement>(null);

	return (
		<div className="textContainer ">
			<p className="primary" ref={text1}>
				<TransitionLink href={href} className="blend-target">
					{primary}
				</TransitionLink>
			</p>{' '}
			<p className="secondary" ref={text2}>
				<TransitionLink href={href} className="blend-target">
					{secondary}
				</TransitionLink>
			</p>
		</div>
	);
}
