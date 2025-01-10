import type { ChangeEvent } from 'react';

import { initializeDB } from '@/lib/db';
import { readExcel } from '@/lib/excel';
import { CloudUpload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const navigate = useNavigate();

  async function fileHandler(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const [employeeList, prizeList] = await readExcel(file);
    await initializeDB({
      employeeList,
      prizeList,
    });

    navigate('/');
  }

  return (
    <div>
      <label className="animate-neon flex cursor-pointer flex-col items-center gap-6 rounded-xl bg-gray-900/70 p-10 transition hover:scale-110">
        <CloudUpload size={72} color="#ffffff" />
        <span className="text-5xl text-white">匯入抽獎資料</span>
        <input
          type="file"
          className="sr-only"
          accept=".xls,.xlsx"
          onChange={fileHandler}
        />
      </label>
    </div>
  );
}
