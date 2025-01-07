import type { CarouselApi } from '@/components/ui/carousel';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type Props = {
  className?: string;
  hostList: string[];
  onHostGroupChange: (idx: number) => void;
};

function getHostImage(idx: number) {
  return `/person-${idx % 3 + 1}.webp`;
}

export default function HostCarousel({ className, hostList, onHostGroupChange }: Props) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    function selectHost(api: CarouselApi) {
      const idx = api?.selectedScrollSnap() || 0;
      onHostGroupChange(idx);
    }

    api.on('slidesInView', selectHost);
  }, [api, onHostGroupChange]);

  return (
    <Carousel
      className={cn('group', className)}
      opts={{
        loop: true,
        watchDrag: false,
        duration: 50,
        skipSnaps: true,
      }}
      setApi={setApi}
    >
      <CarouselContent>
        {hostList.map((name, idx) => (
          <CarouselItem key={name} className="relative">
            <Card className="relative flex flex-col items-center overflow-hidden border-0 bg-gray-900/70">
              <Avatar className="mb-12 mt-16 aspect-[1] size-40 -translate-y-2 scale-[130%]">
                <AvatarImage src={getHostImage(idx)} className="object-contain" alt={name} />
                <AvatarFallback>{name}</AvatarFallback>
              </Avatar>
              <CardContent className="w-full bg-onead-primary-blue/80 py-6 text-center text-2xl font-medium text-white">
                {name}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="animate-shake-l pointer-events-none bottom-[24px] left-4 z-[3] border-transparent bg-gray-900/70 text-white opacity-0 transition-opacity ease-in-out group-hover:pointer-events-auto group-hover:opacity-100" />
      <CarouselNext className="animate-shake-r pointer-events-none bottom-[24px] right-4 z-[3] border-transparent bg-gray-900/70 text-white opacity-0 transition-opacity ease-in-out group-hover:pointer-events-auto group-hover:opacity-100" />
    </Carousel>
  );
}
