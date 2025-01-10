import type { CarouselApi } from '@/components/ui/carousel';

import CarouselCard from '@/components/carousel-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

function getHostImage(idx: number): string {
  return `/person-${idx % 3 + 1}.webp`;
}

type Props = {
  className: string;
  hostList: string[];
  onHostChange: (hostName: string) => void;
};

export default function HostCarousel({ className, hostList, onHostChange }: Props) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    function onSelectHandler(api: CarouselApi) {
      const idx = api?.selectedScrollSnap() || 0;
      onHostChange(hostList[idx]);
    }

    api.on('slidesInView', onSelectHandler);

    return () => {
      api.off('slidesInView', onSelectHandler);
    };
  }, [api, onHostChange, hostList]);

  return (
    <Carousel
      className={cn(
        'group relative w-full translate-x-14 overflow-hidden rounded-xl',
        className,
      )}
      opts={{
        loop: true,
        watchDrag: false,
        duration: 20,
      }}
      setApi={setApi}
    >
      <CarouselContent>
        {hostList.map((name, idx) => (
          <CarouselItem key={name} className="relative flex flex-col">
            <CarouselCard
              imgSrc={getHostImage(idx)}
              imgAlt={name}
              label={name}
              imgClassName="scale-125"
              labelClassName="bg-onead-primary-blue/80"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="animate-shake-l pointer-events-none bottom-[40px] left-4 border-transparent bg-gray-900/70 text-white opacity-0 transition-opacity ease-in-out group-hover:pointer-events-auto group-hover:opacity-100 group-[.no-prize]:hidden" />
      <CarouselNext className="animate-shake-r pointer-events-none bottom-[40px] right-4 border-transparent bg-gray-900/70 text-white opacity-0 transition-opacity ease-in-out group-hover:pointer-events-auto group-hover:opacity-100 group-[.no-prize]:hidden" />
    </Carousel>
  );
}
