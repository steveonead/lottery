import CarouselBlock from '@/components/carousel-block';
import CarouselCard from '@/components/carousel-card';
import { CarouselItem } from '@/components/ui/carousel';

function getHostImage(idx: number): string {
  return `/person-${idx % 3 + 1}.webp`;
}

type Props = {
  className: string;
  hostList: string[];
  onHostChange: (idx: number) => void;
};

export default function HostCarousel({ className, hostList, onHostChange }: Props) {
  return (
    <CarouselBlock
      className={className}
      position="left"
      onSelect={onHostChange}
    >
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
    </CarouselBlock>
  );
}
