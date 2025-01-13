import type { Employee } from '@/models/employee';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { queryAllEmployeeList } from '@/lib/db';
import { exportToExcel } from '@/lib/excel';
import { useLiveQuery } from 'dexie-react-hooks';

export default function ExportDialog({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const data = useLiveQuery<Employee[], Employee[]>(() => queryAllEmployeeList(), [], []);

  return (
    <Dialog defaultOpen onOpenChange={onOpenChange}>
      <DialogContent className="show-close max-w-3xl !rounded-2xl">
        <DialogHeader className="px-6">
          <DialogTitle className="flex justify-center text-center text-3xl font-bold">得獎名單</DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
        <div className="flex max-h-[70vh] flex-col items-center overflow-y-auto px-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>部門</TableHead>
                <TableHead>姓名</TableHead>
                <TableHead>獎項</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="">{+employee.id - 1}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell className="!max-w-[250px] !truncate" title={employee.prize}>
                    {employee.prize}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter className="mt-4 flex">
          <Button
            className="mx-auto w-full rounded-xl bg-onead-primary-blue py-6 text-xl hover:bg-onead-primary-blue/80 sm:w-32"
            onClick={() => exportToExcel(data)}
          >
            確認匯出
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
