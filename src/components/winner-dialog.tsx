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

type Props = {
  winners: Employee[];
  targetPrize?: Prize;
  onDismiss?: () => void;
};

export default function WinnerDialog({ winners, targetPrize, onDismiss }: Props) {
  const winnerNames = winners?.map(({ department, name }) => `${department} ${name}`).join('、') || '';

  return (
    <Dialog defaultOpen>
      <DialogContent className="confetti max-w-lg !rounded-2xl">
        <DialogHeader className="px-6">
          <DialogTitle className="flex justify-center text-center text-3xl font-bold">
            <span>🎉</span>
            <span className="mx-3">恭喜以下獲獎同仁</span>
            <span>🎉</span>
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
        <div className="relative flex flex-col items-center overflow-hidden">
          <Avatar className="size-40">
            <AvatarImage src={targetPrize?.imgSrc} className="size-full object-contain" />
            <AvatarFallback>獎品圖片</AvatarFallback>
          </Avatar>
          <div className="mt-4 text-2xl font-medium">{targetPrize?.item}</div>
          <div className="mt-6 px-6 text-xl leading-loose">{winnerNames}</div>
        </div>
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
