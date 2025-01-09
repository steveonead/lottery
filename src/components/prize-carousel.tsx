import type { Prize } from '@/lib/prize-group-list';

import CarouselBlock from '@/components/carousel-block';
import CarouselCard from '@/components/carousel-card';
import {
  CarouselItem,
} from '@/components/ui/carousel';

type Props = {
  className: string;
  prizeList: Prize[];
  onPrizeChange: (idx: number) => void;
};

export default function PrizeCarousel({ className, prizeList, onPrizeChange }: Props) {
  return (
    <CarouselBlock
      className={className}
      position="right"
      onSelect={onPrizeChange}
    >
      {prizeList.map(({ item, imgSrc, amount }) => (
        <CarouselItem key={item} className="relative flex flex-col">
          <CarouselCard
            imgSrc={imgSrc}
            imgAlt={item}
            label={item}
            showBookmark
            amount={amount}
            labelClassName={amount > 0 ? 'bg-onead-primary-blue/80' : 'bg-white/70'}
          />
        </CarouselItem>
      ))}
    </CarouselBlock>
  );
}
