import type { ReactNode } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CloudDownload, CloudUpload, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

function SideMenuButton({ children, tooltip, onClick }: { children: ReactNode; tooltip: string; onClick: () => void }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="cursor-pointer transition-transform duration-150 hover:scale-110"
            onClick={onClick}
          >
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function SideMenu() {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <aside className="absolute right-4 top-4 grid gap-6">
      <SideMenuButton tooltip={isMuted ? '開啟音樂' : '靜音'} onClick={() => setIsMuted((prev) => !prev)}>
        {isMuted ? <VolumeX size={40} color="#ffffff" /> : <Volume2 size={40} color="#ffffff" />}
      </SideMenuButton>
      <SideMenuButton tooltip="匯入檔案" onClick={() => {}}>
        <CloudUpload size={40} color="#ffffff" />
      </SideMenuButton>
      <SideMenuButton tooltip="匯出檔案" onClick={() => {}}>
        <CloudDownload size={40} color="#ffffff" />
      </SideMenuButton>
    </aside>
  );
}
