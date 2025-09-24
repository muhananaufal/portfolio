// components/StableCanvas.tsx
'use client';
import dynamic from 'next/dynamic';
import React from 'react';

// Import Scene secara dinamis di sini
const Scene = dynamic(() => import('@/components/Scene'), {
	ssr: false,
});

// Buat komponen pembungkus
function CanvasContainer() {
	return <Scene key="stable-canvas-key" />;
}

// Ekspor versi yang sudah di-memoized
export const StableCanvas = React.memo(CanvasContainer);
