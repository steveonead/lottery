import type { CarouselApi } from '@/components/ui/carousel';

import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { type ReactNode, useEffect, useState } from 'react';

type Props = {
  className?: string;
  position: 'left' | 'right';
  isPageButtonInvisible: boolean;
  children: ReactNode;
  onSelect: (idx: number) => void;
};

export default function CarouselBlock({
  className,
  position,
  isPageButtonInvisible,
  children,
  onSelect,
}: Props) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    function onSlideInView(api: CarouselApi) {
      const idx = api?.selectedScrollSnap() || 0;
      onSelect(idx);
    }

    api.on('slidesInView', onSlideInView);
  }, [api, onSelect]);

  return (
    <Carousel
      className={cn(
        'group relative w-full translate-x-14 rounded-xl',
        position === 'left' ? 'translate-x-14' : '-translate-x-14',
        className,
      )}
      opts={{
        loop: true,
        watchDrag: false,
        duration: 40,
        skipSnaps: true,
      }}
      setApi={setApi}
    >
      <CarouselContent>{children}</CarouselContent>
      <CarouselPrevious
        className={cn(
          'animate-shake-l pointer-events-none bottom-[40px] left-4 border-transparent bg-gray-900/70 text-white opacity-0 transition-opacity ease-in-out group-hover:pointer-events-auto group-hover:opacity-100',
          isPageButtonInvisible && 'hidden',
        )}
      />
      <CarouselNext
        className={cn(
          'animate-shake-r pointer-events-none bottom-[40px] right-4 border-transparent bg-gray-900/70 text-white opacity-0 transition-opacity ease-in-out group-hover:pointer-events-auto group-hover:opacity-100',
          isPageButtonInvisible && 'hidden',
        )}
      />
    </Carousel>
  );
}
