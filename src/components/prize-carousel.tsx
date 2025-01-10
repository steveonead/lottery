import type { CarouselApi } from '@/components/ui/carousel';
import type { Prize } from '@/models/prize';

import CarouselCard from '@/components/carousel-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

type Props = {
  className: string;
  prizeList: Prize[];
  noPrizeRemain: boolean;
  onPrizeChange: (prizeId: number) => void;
};

export default function PrizeCarousel({ className, prizeList, onPrizeChange, noPrizeRemain }: Props) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    function onSelectHandler() {
      const idx = api?.selectedScrollSnap() || 0;
      const nodes = api?.slideNodes() || [];

      const prize = prizeList.find(({ item }) => item === nodes[idx].dataset.prizeName);

      if (prize) {
        onPrizeChange(prize.id);
      }
    }

    api.on('slidesInView', onSelectHandler);

    return () => {
      api.off('slidesInView', onSelectHandler);
    };
  }, [api, onPrizeChange, prizeList]);

  return (
    <Carousel
      className={cn(
        'group relative w-full -translate-x-14 overflow-hidden rounded-xl',
        noPrizeRemain ? 'no-prize' : '',
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
        {noPrizeRemain
          ? (
              <CarouselItem className="relative flex flex-col">
                <CarouselCard
                  imgSrc="/person-no-prize.webp"
                  imgAlt="無獎品"
                  label="獎品已抽完"
                  labelClassName="bg-white/70"
                />
              </CarouselItem>
            )
          : (
              prizeList.map(({ id, item, imgSrc, amount }) => (
                <CarouselItem key={id} className="relative flex flex-col" data-prize-name={item}>
                  <CarouselCard
                    imgSrc={imgSrc}
                    imgAlt={item}
                    label={item}
                    showBookmark
                    amount={amount}
                    labelClassName={amount > 0 ? 'bg-onead-primary-blue/80' : 'bg-white/70'}
                  />
                </CarouselItem>
              ))
            )}
      </CarouselContent>
      <CarouselPrevious className="animate-shake-l pointer-events-none bottom-[40px] left-4 border-transparent bg-gray-900/70 text-white opacity-0 transition-opacity ease-in-out group-hover:pointer-events-auto group-hover:opacity-100 group-[.no-prize]:hidden" />
      <CarouselNext className="animate-shake-r pointer-events-none bottom-[40px] right-4 border-transparent bg-gray-900/70 text-white opacity-0 transition-opacity ease-in-out group-hover:pointer-events-auto group-hover:opacity-100 group-[.no-prize]:hidden" />
    </Carousel>
  );
}
