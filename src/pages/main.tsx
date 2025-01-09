import HostCarousel from '@/components/host-carousel';
import PrizeCarousel from '@/components/prize-carousel';
import SideMenu from '@/components/side-menu';
import SnowBackground from '@/components/snow-background';
import useDexieData from '@/hooks/dexie-data';
import { useEffect, useRef, useState } from 'react';

function getHostImage(idx: number): string {
  return `/person-${idx % 3 + 1}.webp`;
}

export default function Main() {
  return (
    <div>main</div>
  );
}

// export default function Main() {
//   const {
//     employeeList,
//     hostList,
//     currentHostCompoundName,
//     setCurrentHostCompoundName,
//     availablePrizeList,
//     syncDataToDB,
//     completeThisRound,
//   } = useDexieData();

//   const [isSpinning, setIsSpinning] = useState(false);
//   const [pickedAmount, setPickedAmount] = useState(0);
//   const [isWinnerDialogShow, setIsWinnerDialogShow] = useState(false);

//   const currentPrizeIdRef = useRef(0);

//   function onHostChange(idx: number) {
//     const compoundName = hostList[idx];
//     setCurrentHostCompoundName(compoundName);
//   }

//   function onPrizeChange(idx: number) {
//     console.log(idx);
//   }

//   useEffect(() => {
//     if (hostList.length === 0) {
//       return;
//     }

//     setCurrentHostCompoundName(hostList[0]);
//   }, [hostList, setCurrentHostCompoundName]);

//   useEffect(() => {
//     const prize = availablePrizeList.find(({ id }) => id === currentPrizeIdRef.current);
//   }, [currentPrizeIdRef, availablePrizeList]);

//   return (
//     <SnowBackground>
//       <SideMenu onUpload={syncDataToDB} />
//       <div className="mx-auto flex h-screen w-full items-center justify-center gap-10 pr-6">
//         <HostCarousel className="w-[360px]" hostList={hostList} onHostChange={onHostChange}></HostCarousel>
//         {/* <Reel
//           className="relative z-[2] w-[560px]"
//           employeeList={employeeList}
//           pickedAmount={pickedAmount}
//           canReelsSpin={canReelsSpin}
//           isSpinning={isSpinning}
//           isMaskShow={showMask}
//           onSpinStart={onSpinStart}
//           onCompleted={onSpinComplete}
//         >
//           <CountSelector prizeCountRemain={prizeCountRemain} count={count} onCountChange={setCount} />
//         </Reel> */}
//         <PrizeCarousel className="w-[360px]" prizeList={availablePrizeList} onPrizeChange={onPrizeChange} />
//       </div>
//       {/* <WinnerDialog open={isWinnerDialogShow} prize={targetPrize} /> */}
//     </SnowBackground>
//   );
// }
