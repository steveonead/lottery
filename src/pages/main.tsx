import type { Employee } from '@/models/employee';
import type { Prize } from '@/models/prize';

import CountSelector from '@/components/count-selector';
import HostCarousel from '@/components/host-carousel';
import PrizeCarousel from '@/components/prize-carousel';
import Reel from '@/components/reel';
import WinnerDialog from '@/components/winner-dialog';
import { completeThisRound, queryAvailableEmployeeList, queryAvailablePrizeList } from '@/lib/db';
import { fillEmployeeList } from '@/lib/reel';
import { shuffle } from '@/lib/shuffle';
import { cn } from '@/lib/utils';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

export default function Main() {
  const { hostList, initialHostCompoundName, initialPrize } = useLoaderData() as {
    hostList: string[];
    initialHostCompoundName: string;
    initialPrize: Prize;
  };

  const [currentHostCompoundName, setCurrentHostCompoundName] = useState(initialHostCompoundName);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isMaskShow, setIsMaskShow] = useState(!!initialPrize);
  const [pickedAmount, setPickedAmount] = useState(1);
  const [isWinnerDialogShow, setIsWinnerDialogShow] = useState(false);
  const [targetPrizeId, setTargetPrizeId] = useState(initialPrize?.id);
  const [winners, setWinners] = useState<Employee[]>([]);

  const availableEmployeeList = useLiveQuery<Employee[], Employee[]>(
    async () => {
      const list = await queryAvailableEmployeeList();
      const shuffledList = shuffle(list);

      return fillEmployeeList(shuffledList, 60, pickedAmount);
    },
    [pickedAmount],
    [],
  );
  const availablePrizeList = useLiveQuery<Prize[], Prize[]>(
    () => queryAvailablePrizeList(currentHostCompoundName),
    [currentHostCompoundName],
    [],
  );

  const targetPrize = availablePrizeList?.find(({ id }) => id === targetPrizeId);
  const noPrizeRemain = availablePrizeList?.length === 0;

  function onPrizeChange(prizeId: number) {
    setTargetPrizeId(prizeId);
    setPickedAmount(1);
  }

  function onHostChange(hostName: string) {
    setCurrentHostCompoundName(hostName);
    setPickedAmount(1);
  }

  function onSpinStart() {
    setIsMaskShow(false);
    setIsSpinning(true);
  }

  function onSpinComplete(winnerArr: Employee[]) {
    setWinners(winnerArr);
    setIsSpinning(false);
    setIsMaskShow(false);

    setTimeout(() => {
      setIsWinnerDialogShow(true);
    }, 1500);
  }

  async function onWinnerDialogDismiss() {
    await completeThisRound({
      prizeId: targetPrizeId,
      winnerIdArr: winners.map(({ id }) => id),
      pickedAmount,
    });

    setPickedAmount(1);
    setIsWinnerDialogShow(false);
    setIsMaskShow(true);
  }

  return (
    <>
      <div
        className={cn(
          'mx-auto flex h-screen w-full items-center justify-center gap-10 pr-6',
          isSpinning && 'pointer-events-none',
        )}
      >
        <HostCarousel className="w-[360px]" hostList={hostList} onHostChange={onHostChange}></HostCarousel>
        <Reel
          className="relative z-[2] w-[560px]"
          employeeList={availableEmployeeList}
          pickedAmount={pickedAmount}
          isSpinning={isSpinning}
          isMaskShow={isMaskShow}
          noPrizeRemain={noPrizeRemain}
          onSpinStart={onSpinStart}
          onCompleted={onSpinComplete}
        >
          <CountSelector
            prizeAmountRemain={targetPrize?.amount || 1}
            count={pickedAmount}
            onCountChange={setPickedAmount}
          />
        </Reel>
        <PrizeCarousel
          className="w-[360px]"
          prizeList={availablePrizeList}
          onPrizeChange={onPrizeChange}
          noPrizeRemain={noPrizeRemain}
        />
      </div>
      {isWinnerDialogShow && (
        <WinnerDialog
          open={isWinnerDialogShow}
          winners={winners}
          targetPrize={targetPrize}
          onDismiss={onWinnerDialogDismiss}
        />
      )}
    </>
  );
}
