import ExportDialog from '@/components/export-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CloudDownload, Volume2, VolumeX } from 'lucide-react';
import { useRef, useState } from 'react';

export default function SideMenu() {
  const audioRef = useRef<HTMLAudioElement>(new Audio('/bg.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExportDialogShow, setIsExportDialogShow] = useState(false);

  function togglePlayPause() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <aside className="absolute right-4 top-4 z-40 grid gap-6">
      <button type="button" onClick={togglePlayPause}>
        {isPlaying ? <Volume2 size={40} color="#ffffff" /> : <VolumeX size={40} color="#ffffff" />}
      </button>
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="transition-transform duration-150 hover:scale-110"
              onClick={() => setIsExportDialogShow(true)}
            >
              <CloudDownload size={40} color="#ffffff" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>匯出檔案</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <audio
        preload="auto"
        ref={audioRef}
        autoPlay
        loop
        muted={!isPlaying}
        src="/bg.mp3"
      />
      {isExportDialogShow && <ExportDialog onOpenChange={setIsExportDialogShow} />}
    </aside>
  );
}
