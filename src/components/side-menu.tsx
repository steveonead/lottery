import type { Employee, Prize } from '@/models/prize';
import type { ChangeEvent } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { readExcel } from '@/lib/excel';
import { CloudDownload, CloudUpload, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

export default function SideMenu() {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <aside className="absolute right-4 top-4 grid gap-6">
      <button type="button" onClick={() => setIsMuted((prev: boolean) => !prev)}>
        {isMuted ? <VolumeX size={40} color="#ffffff" /> : <Volume2 size={40} color="#ffffff" />}
      </button>
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <label className="cursor-pointer transition-transform duration-150 hover:scale-110">
              <CloudDownload size={40} color="#ffffff" />
              <input type="file" className="sr-only" accept=".xls,.xlsx" />
            </label>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>匯出檔案</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </aside>
  );
}
