// components/FluidBackground.tsx

'use client';

interface FluidBackgroundProps {
	blobColor: string;
}

// Menambahkan 1 bentuk baru untuk blob keenam
const blobShapes = [
	'30% 70% 70% 30% / 30% 30% 70% 70%',
	'62% 38% 47% 53% / 51% 52% 48% 49%',
	'34% 66% 51% 49% / 54% 52% 48% 46%',
	'45% 55% 51% 49% / 54% 62% 38% 46%',
	'50% 50% 39% 61% / 61% 53% 47% 39%',
	'58% 42% 55% 45% / 41% 51% 49% 80%',
];

export default function FluidBackground({ blobColor }: FluidBackgroundProps) {
	return (
		<div style={{ filter: 'url(#gooey)' }} className="absolute inset-0 w-full h-full overflow-hidden">
			{/* Blob ke-5 (dari tengah) */}
			<div
				style={{ borderRadius: blobShapes[4] }}
				className={`absolute w-40 h-40 top-1/2 left-1/2 ${blobColor}
                   transform -translate-x-1/2 -translate-y-1/2 scale-0
                   group-hover:scale-110
                   transition-transform duration-500 delay-200 ease-[cubic-bezier(0.18,0.89,0.32,1.28)]`}
			/>

			{/* Blob 1: Besar, dari kanan bawah */}
			<div
				style={{ borderRadius: blobShapes[0] }}
				className={`absolute w-72 h-72 bottom-0 right-0 ${blobColor} 
                   transform translate-x-full translate-y-full 
                   group-hover:translate-x-[15%] group-hover:translate-y-[15%] 
                   transition-transform duration-700 ease-[cubic-bezier(0.18,0.89,0.32,1.28)]`}
			/>
			{/* Blob 2: Sedang, dari kiri atas */}
			<div
				style={{ borderRadius: blobShapes[1] }}
				className={`absolute w-48 h-48 top-0 left-0 ${blobColor} 
                   transform -translate-x-full -translate-y-full 
                   group-hover:translate-x-[-15%] group-hover:translate-y-[-15%] 
                   transition-transform duration-700 delay-100 ease-[cubic-bezier(0.18,0.89,0.32,1.28)]`}
			/>
			{/* Blob 3: Kecil, dari kanan atas */}
			<div
				style={{ borderRadius: blobShapes[2] }}
				className={`absolute w-36 h-36 top-0 right-0 ${blobColor} 
                   transform translate-x-full -translate-y-full
                   group-hover:translate-x-[-25%] group-hover:translate-y-[25%]
                   transition-transform duration-700 delay-200 ease-[cubic-bezier(0.18,0.89,0.32,1.28)]`}
			/>
			{/* Blob 4: Paling kecil, dari kiri bawah */}
			<div
				style={{ borderRadius: blobShapes[3] }}
				className={`absolute w-28 h-28 bottom-0 left-0 ${blobColor} 
                   transform -translate-x-full translate-y-full
                   group-hover:translate-x-[25%] group-hover:translate-y-[-25%]
                   transition-transform duration-700 delay-300 ease-[cubic-bezier(0.18,0.89,0.32,1.28)]`}
			/>

			{/* --- BLOB TAMBAHAN (KE-6) --- */}
			{/* Blob ini khusus untuk menambal celah kanan bawah */}
			<div
				style={{ borderRadius: blobShapes[5] }}
				className={`absolute w-24 h-24 bottom-0 right-0 ${blobColor} 
                   transform translate-x-full translate-y-full 
                   group-hover:translate-x-[5%] group-hover:translate-y-[5%] 
                   transition-transform duration-700 delay-400 ease-[cubic-bezier(0.18,0.89,0.32,1.28)]`}
			/>
		</div>
	);
}
