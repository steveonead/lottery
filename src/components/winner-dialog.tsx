import type { Employee } from '@/models/employee';
import type { Prize } from '@/models/prize';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Confetti from 'react-confetti-boom';

type Props = {
  open: boolean;
  winners: Employee[];
  targetPrize?: Prize;
  onDismiss?: () => void;
};

export default function WinnerDialog({ open, winners, targetPrize, onDismiss }: Props) {
  const winnerNames = winners?.map(({ department, name }) => `${department} ${name}`).join('、') || '';

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-lg !rounded-2xl">
        <DialogHeader className="px-6">
          <DialogTitle className="flex justify-center text-center text-3xl font-bold">
            <span>🎉</span>
            <span className="mx-3">恭喜以下獲獎同仁</span>
            <span>🎉</span>
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
        <div className="flex flex-col items-center">
          <Avatar className="size-40">
            <AvatarImage src={targetPrize?.imgSrc} className="size-full object-contain" />
            <AvatarFallback>獎品圖片</AvatarFallback>
          </Avatar>
          <div className="mt-4 text-2xl font-medium">{targetPrize?.item}</div>
          <div className="mt-6 px-6 text-xl leading-loose">{winnerNames}</div>
        </div>
        <Confetti
          shapeSize={30}
          particleCount={450}
          spreadDeg={90}
          launchSpeed={1}
          y={0.25}
          x={0.15}
        />
        <DialogFooter className="mt-4 flex">
          <Button
            className="mx-auto w-full rounded-xl bg-onead-primary-blue py-6 text-xl hover:bg-onead-primary-blue/80 sm:w-32"
            onClick={onDismiss}
          >
            確認
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
