import type { Employee } from '@/lib/employee-list';
import type { Prize } from '@/lib/prize-group-list';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import ConfettiExplosion from 'react-confetti-explosion';

function NameCard({ employee, className }: { employee: Employee; className?: string }) {
  return (
    <div className={cn('flex w-full items-center justify-between rounded-xl border bg-card px-8 py-4 text-card-foreground shadow', className)}>
      <div className="text-lg font-bold tracking-wider">{employee.department}</div>
      <div className="text-2xl">{employee.name}</div>
    </div>
  );
}

type Props = {
  open: boolean;
  winners?: Employee[];
  prize?: Prize;
  onDismiss?: () => void;
};

const list = [
  { department: 'ITO', name: '小明' },
  { department: 'ITO', name: '小張' },
  { department: 'ITO', name: '小黃' },
  { department: 'SALES', name: '小林' },
];

export default function WinnerDialog({ open, winners, prize, onDismiss }: Props) {
  const winnerNames = list.map(({ department, name }) => `${department} ${name}`).join('、');

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-lg rounded-2xl">
        <DialogHeader className="px-6">
          <DialogTitle className="flex justify-center text-center text-3xl font-bold">
            <span>🎉</span>
            <span className="mx-3">恭喜以下獲獎同仁</span>
            <span>🎉</span>
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
        <div className="flex flex-col items-center">
          <ConfettiExplosion duration={4000} particleCount={150} zIndex={100} />
          <div className="mb-1 mt-2 aspect-square w-full max-w-48 overflow-hidden rounded-lg">
            <img
              src={prize?.imgSrc}
              alt="獎品圖片"
              className="size-full object-contain"
            />
          </div>
          <div className="text-2xl font-medium">{prize?.item}</div>
          <div className="mt-5 px-4 text-xl leading-loose">
            {winnerNames}
          </div>
        </div>
        <DialogFooter className="mt-4 flex">
          <Button className="mx-auto w-full rounded-xl bg-onead-primary-blue py-5 text-xl hover:bg-onead-primary-blue/80 sm:w-32">
            確認
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
