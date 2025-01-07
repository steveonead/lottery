import type { ReactNode } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Bookmark } from 'lucide-react';

type Props = {
  showAvatarBackground?: boolean;
  imgSrc: string;
  imgAlt: string;
  label: string;
  showBookmark?: boolean;
  amount?: number;
  labelClassName?: string;
};

export default function CarouselCard({ imgSrc, imgAlt, label, showBookmark, amount, labelClassName }: Props) {
  return (
    <div className="relative flex w-full flex-col items-center overflow-hidden rounded-xl bg-gray-900/70">
      {showBookmark && (
        <div className="absolute right-0 top-0 z-[2]">
          <Bookmark size={72} strokeWidth={0} className="fill-onead-orange" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/3 text-2xl font-bold text-white">
            {amount || '完'}
          </div>
        </div>
      )}
      <Avatar className={cn('mb-10 mt-14 aspect-[1] size-52', showBookmark && 'bg-white')}>
        <AvatarImage src={imgSrc} className="object-contain" alt={imgAlt} />
        <AvatarFallback>{imgAlt}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'flex h-28 w-full items-center justify-center px-8 text-center text-2xl font-medium text-white',
          labelClassName,
        )}
      >
        {label}
      </div>
    </div>
  );
}
