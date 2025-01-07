import type { Prize } from '@/lib/prize-group-list';

import CarouselBlock from '@/components/carousel-block';
import CarouselCard from '@/components/carousel-card';
import {
  CarouselItem,
} from '@/components/ui/carousel';
import { Bookmark } from 'lucide-react';

type Props = {
  className?: string;
  isPageButtonInvisible: boolean;
  prizeList: Prize[];
  onPrizeChange: (idx: number) => void;
};

export default function PrizeCarousel({ className, prizeList, isPageButtonInvisible, onPrizeChange }: Props) {
  return (
    <div className={className}>
      <CarouselBlock
        position="right"
        isPageButtonInvisible={isPageButtonInvisible}
        onSelect={onPrizeChange}
      >
        {prizeList.map(({ item, imgSrc, amount }) => (
          <CarouselItem key={item} className="relative flex flex-col">
            <CarouselCard
              badge={(
                <div className="absolute right-0 top-0 z-[2]">
                  <Bookmark size={72} strokeWidth={0} className="fill-onead-orange" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-2/3 text-2xl font-bold text-white">
                    {amount || '完'}
                  </div>
                </div>
              )}
              imgSrc={imgSrc}
              imgAlt={item}
              label={item}
              labelClassName={amount > 0 ? 'bg-onead-primary-blue/80' : 'bg-white/70'}
            />
          </CarouselItem>
        ))}
      </CarouselBlock>
    </div>
  );
}
