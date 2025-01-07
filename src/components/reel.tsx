import type { Member } from '@/lib/member-list';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { animate, motion } from 'motion/react';
import { useEffect, useState } from 'react';

const ITEM_GAP = 12;
const ITEM_HEIGHT = 50;
const ITEM_IN_VIEW = 9;
const CONTAINER_HEIGHT = ITEM_HEIGHT * ITEM_IN_VIEW + ITEM_GAP * (ITEM_IN_VIEW + 1);
const INDICATOR_BORDER_WIDTH = 2;
const TARGET_INDEX_ARR_MAP: Record<number, number[]> = {
  1: [4],
  3: [3, 4, 5],
  5: [2, 3, 4, 5, 6],
  7: [1, 2, 3, 4, 5, 6, 7],
};

type Props = {
  className?: string;
  memberList: Member[];
  isSpinning: boolean;
  isMaskShow: boolean;
  count: number;
  canReelsSpin: boolean;
  children: ReactNode;
  onSpinStart: () => void;
  onCompleted: (count: number) => void;
};

export default function Reel({
  className,
  memberList,
  isSpinning,
  isMaskShow,
  count,
  canReelsSpin,
  children,
  onSpinStart,
  onCompleted,
}: Props) {
  const [yPosition, setYPosition] = useState(0);

  const indexArr = TARGET_INDEX_ARR_MAP[count] || [];
  const indicatorHeight
    = ITEM_HEIGHT * count + ITEM_GAP * (count - 1) + INDICATOR_BORDER_WIDTH * 2 + ITEM_GAP / 2;

  useEffect(() => {
    if (isSpinning) {
      const totalItems = memberList.length;
      const totalHeight = totalItems * ITEM_HEIGHT;
      const minRotations = 2;
      const totalDistance = minRotations * totalHeight;

      animate(0, totalDistance, {
        duration: 3,
        onUpdate: (latest) => {
          setYPosition(-latest % (memberList.length * ITEM_HEIGHT));
        },
        onComplete: () => {
          onCompleted(count);
        },
        ease: [0.2, 0.5, 0.8, 1.0],
      });
    }
  }, [isSpinning, memberList, onCompleted, count]);

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center',
        className,
        !canReelsSpin && '!pointer-events-none',
      )}
    >
      <div className="relative w-full rounded-3xl bg-gray-900/70 p-4">
        <div
          className={cn(
            'relative h-full overflow-hidden rounded-2xl bg-gray-900',
            isMaskShow && 'opacity-0',
          )}
          style={{ height: `${CONTAINER_HEIGHT}px` }}
        >
          {/* 頂部光影效果 */}
          <div className="absolute inset-x-0 top-0 z-20 h-5 bg-gradient-to-b from-gray-900 via-gray-800 to-transparent" />

          {/* 滾動內容容器 */}
          <div className="absolute inset-0 flex" style={{ padding: `${ITEM_GAP}px 0` }}>
            <motion.div style={{ y: yPosition }} className="flex-1">
              <div className="grid" style={{ rowGap: `${ITEM_GAP}px` }}>
                {memberList.map((member, idx) => (
                  <div
                    key={`${member.department}-${member.name}`}
                    className={cn(
                      'mx-2 flex items-center justify-center rounded-xl',
                      indexArr.includes(idx) && !isSpinning ? 'bg-onead-orange' : 'bg-gray-700',
                    )}
                    style={{ height: `${ITEM_HEIGHT}px` }}
                  >
                    <span className="truncate text-2xl font-medium text-white">
                      {member.department}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div style={{ y: yPosition }} className="flex-1">
              <div className="grid" style={{ rowGap: `${ITEM_GAP}px` }}>
                {memberList.map((member, idx) => (
                  <div
                    key={`${member.department}-${member.name}`}
                    className={cn(
                      'mx-2 flex items-center justify-center rounded-xl',
                      indexArr.includes(idx) && !isSpinning ? 'bg-onead-orange' : 'bg-gray-700',
                    )}
                    style={{ height: `${ITEM_HEIGHT}px` }}
                  >
                    <span className="truncate text-2xl font-medium text-white">{member.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* 底部光影效果 */}
          <div className="absolute inset-x-0 bottom-0 z-20 h-5 bg-gradient-to-t from-gray-900 via-gray-800 to-transparent" />
        </div>

        {/* 中獎指示器 */}
        <div
          className={cn(
            'absolute inset-x-0 top-1/2 z-10 -translate-y-1/2',
            isMaskShow && 'opacity-0',
          )}
        >
          {/* 中間透明區域 */}
          <div
            className="mx-2 rounded-[0.5rem] border-onead-orange-light bg-onead-orange-light/10"
            style={{
              height: `${indicatorHeight}px`,
              borderTopWidth: `${INDICATOR_BORDER_WIDTH}px`,
              borderBottomWidth: `${INDICATOR_BORDER_WIDTH}px`,
            }}
          />
          {/* 左側指示器 */}
          <div className="absolute left-0 top-1/2 h-7 w-4 -translate-y-1/2 rounded-r-[0.5rem] bg-onead-orange-light" />
          {/* 右側指示器 */}
          <div className="absolute right-0 top-1/2 h-7 w-4 -translate-y-1/2 rounded-l-[0.5rem] bg-onead-orange-light" />
        </div>

        {/* 中獎數量選擇 */}
        <div
          className={cn(
            'absolute inset-0 z-20 flex flex-col items-center justify-center text-4xl font-bold',
            !isMaskShow && 'opacity-0',
          )}
        >
          <div className={cn(!canReelsSpin && 'cursor-pointer opacity-50')}>{children}</div>
          <button
            type="button"
            onClick={onSpinStart}
            className="animate-soft-bounce mt-20 flex flex-col items-center"
          >
            <img className="max-w-[200px]" src="/onead.png" alt="onead" />
            <div className="mt-6 tracking-widest text-white">
              {canReelsSpin ? '點擊抽獎' : '獎品已抽完'}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
