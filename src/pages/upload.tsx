import type { ChangeEvent } from 'react';

import { readExcel } from '@/lib/excel';
import { initDB } from '@/models/db';
import { CloudUpload } from 'lucide-react';

export default function Upload() {
  async function fileHandler(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const [employeeList, prizeList] = await readExcel(file);
    await initDB({
      employeeList,
      prizeList,
    });
  }

  return (
    <div>
      <h1>點擊匯入抽獎資料</h1>
      <label className="cursor-pointer transition-transform duration-150 hover:scale-110">
        <CloudUpload size={40} color="#ffffff" />
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
