import { TLinkPreviewProps } from '@/types';
import { LinkView } from '@/components/ui/link-preview';

export default function LinkPreview({ url, title, imageSrc, className, }: TLinkPreviewProps) {
	return (
		<div>
			<LinkView
				className={`font-NeueMontreal relative ease-[0.19, 1, 0.22, 1] before:absolute before:content-[''] before:left-0 text-secondry  before:block before:w-full  before:bg-secondry before:transition before:duration-[0.6s] after:absolute after:content-[''] after:left-0  after:block after:w-full  after:bg-secondry after:transition after:duration-[0.6s] before:scale-x-0 before:origin-left after:origin-right after:delay-[0.25s] hover:before:scale-x-100 hover:before:delay-[0.25s] hover:after:scale-x-0 hover:after:delay-0 ${className}`}
				url={url}
				imageSrc={`${imageSrc}`}
				isStatic
			>
				{title}
			</LinkView>
		</div>
	);
}
