import type { Member } from '@/lib/member-list';

import CarouselBlock from '@/components/carousel-block';
import CarouselCard from '@/components/carousel-card';
import CountSelector from '@/components/count-selector';
import Reel from '@/components/reel';
import SideMenu from '@/components/side-menu';
import SnowBackground from '@/components/snow-background';
import {
  CarouselItem,
} from '@/components/ui/carousel';
import WinnerDialog from '@/components/winner-dialog';
import { memberList } from '@/lib/member-list';
import { prizeGroupList } from '@/lib/prize-group-list';
import { shuffle } from '@/lib/shuffle';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const hostList = prizeGroupList.map(({ hosts }) => hosts.join(' & ')) || [];

function getHostImage(idx: number) {
  return `/person-${idx % 3 + 1}.webp`;
}

export default function App() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [nameList, setNameList] = useState(memberList);
  const [prizeGroups, setPrizeGroups] = useState(prizeGroupList);
  const [prizeGroupIndex, setPrizeGroupIndex] = useState(0);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [winners, setWinners] = useState<Member[]>([]);
  const [count, setCount] = useState(0);
  const [showMask, setShowMask] = useState(true);
  const [isWinnerDialogShow, setIsWinnerDialogShow] = useState(false);

  const { prizes } = prizeGroups[prizeGroupIndex];
  const targetPrize = prizes[prizeIndex];
  const prizeCountRemain = targetPrize?.amount || 0;
  const canReelsSpin = prizeCountRemain > 0;

  function onPrizeChange(idx: number) {
    setPrizeIndex(idx);
    setCount(0);
    setShowMask(true);
  }

  function onHostGroupChange(idx: number) {
    setPrizeGroupIndex(idx);
    setCount(0);
    setShowMask(true);
  }

  function onSpinStart() {
    if (isSpinning || !canReelsSpin) return;

    setShowMask(false);
    setIsSpinning(true);
    setNameList(shuffle(memberList));
  }

  function onSpinComplete(count: number) {
    setIsSpinning(false);

    const updatedPrizes = prizes.map((prize, index) =>
      index === prizeIndex ? { ...prize, amount: prize.amount - count } : prize,
    );

    const updatedPrizeGroups = prizeGroups.map((group, index) =>
      index === prizeGroupIndex ? { ...group, prizes: updatedPrizes } : group,
    );

    setPrizeGroups(updatedPrizeGroups);
    setTimeout(() => {
      setIsWinnerDialogShow(true);
    }, 500);
  }

  useEffect(() => {
    setPrizeIndex(0);
  }, [prizeGroupIndex]);

  return (
    <SnowBackground>
      <SideMenu />
      <div className="mx-auto flex h-screen w-full items-center justify-center gap-10 pr-6">
        <CarouselBlock
          className="w-[360px]"
          position="left"
          isPageButtonInvisible={false}
          onSelect={onHostGroupChange}
        >
          {hostList.map((name, idx) => (
            <CarouselItem key={name} className="relative flex flex-col">
              <CarouselCard
                imgSrc={getHostImage(idx)}
                imgAlt={name}
                label={name}
                labelClassName="bg-onead-primary-blue/80"
              />
            </CarouselItem>
          ))}
        </CarouselBlock>
        <Reel
          className={cn('relative z-[2] w-[560px]', prizeCountRemain === 0 && 'pointer-events-none')}
          memberList={nameList}
          count={count}
          canReelsSpin={canReelsSpin}
          isSpinning={isSpinning}
          isMaskShow={showMask}
          onSpinStart={onSpinStart}
          onCompleted={onSpinComplete}
        >
          <CountSelector prizeCountRemain={prizeCountRemain} count={count} onCountChange={setCount} />
        </Reel>
        <CarouselBlock
          className="w-[360px]"
          position="right"
          isPageButtonInvisible={prizeCountRemain === 0}
          onSelect={onPrizeChange}
        >
          {prizes.map(({ item, imgSrc, amount }) => (
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
      </div>
      <WinnerDialog open={isWinnerDialogShow} prize={targetPrize} />
    </SnowBackground>
  );
}
