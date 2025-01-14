import type { Employee } from '@/models/employee';

export const ITEM_IN_VIEW = 9;
export const ITEM_GAP = 12;
export const ITEM_HEIGHT = 50;
export const CONTAINER_HEIGHT = ITEM_HEIGHT * ITEM_IN_VIEW + ITEM_GAP * (ITEM_IN_VIEW + 1);
export const INDICATOR_BORDER_WIDTH = 2;
export const WINNER_INDEX_ARR_MAP: Record<number, number[]> = {
  1: [4],
  3: [3, 4, 5],
  5: [2, 3, 4, 5, 6],
};

type PickedAmount = keyof typeof WINNER_INDEX_ARR_MAP;

export function fillEmployeeList(employeeList: Employee[], targetLength: number, pickedAmount: PickedAmount) {
  if (employeeList.length >= targetLength) return employeeList;

  if (employeeList.length >= ITEM_IN_VIEW) {
    return Array.from(
      { length: targetLength },
      (_, idx) => employeeList[idx] || { id: crypto.randomUUID(), department: '', name: '', prize: '' },
    );
  }

  const winnerIdxArr = WINNER_INDEX_ARR_MAP[pickedAmount];
  const firstIdx = winnerIdxArr.at(0) || 4;
  const offsetRight = firstIdx;

  const res: Employee[] = Array.from({ length: targetLength }, () => ({ id: crypto.randomUUID(), department: '', name: '', prize: '' }));

  employeeList.forEach((employee, idx) => {
    res[idx + offsetRight] = employee;
  });

  return res;
}
