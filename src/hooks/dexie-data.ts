/* eslint-disable no-alert */
import type { Employee } from '@/models/employee';
import type { Prize } from '@/models/prize';

import { db } from '@/models/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';

export default function useDexieData() {
  const employeeList = useLiveQuery<Employee[], Employee[]>(
    () => db.employeeList.where('prize').equals('').toArray() || [],
    [], // deps
    [], // initial value
  );

  const hostList = useLiveQuery<string[], string[]>(async () => {
    const prizeList = (await db.prizeList.toArray()) || [];

    try {
      const res = [...new Set(prizeList.map(({ hosts }) => hosts))];

      return Promise.resolve(res);
    } catch {
      return Promise.resolve([]);
    }
  }, [], []);

  const [currentHostCompoundName, setCurrentHostCompoundName] = useState('');

  const availablePrizeList = useLiveQuery<Prize[], Prize[]>(async () => {
    const targetPrizeList = (await db.prizeList.where('hosts').equals(currentHostCompoundName).toArray()) || [];

    try {
      const res = targetPrizeList.filter(({ amount }) => amount > 0);

      return Promise.resolve(res);
    } catch {
      return Promise.resolve([]);
    }
  }, [currentHostCompoundName], []);

  const isDBInitialized = true;

  async function syncDataToDB({
    employeeList,
    prizeList,
  }: {
    employeeList: Employee[];
    prizeList: Prize[];
  }): Promise<void> {
    if (isDBInitialized) {
      const isConfirmed = confirm('資料庫已有資料，是否覆蓋？');

      if (!isConfirmed) {
        return;
      }
    }

    await db.employeeList.bulkPut(employeeList);
    await db.prizeList.bulkPut(prizeList);
  }

  async function completeThisRound({
    prizeId,
    winnerIdArr,
    pickedAmount,
  }: {
    prizeId: number;
    winnerIdArr: number[];
    pickedAmount: number;
  }): Promise<void> {
    db.transaction('rw', db.employeeList, db.prizeList, async () => {
      // update winner
      const targetPrize = await db.prizeList.get(prizeId);

      if (!targetPrize) {
        throw new Error('prize not found');
      }

      await db.employeeList.bulkUpdate(
        winnerIdArr.map((id) => ({
          key: id,
          changes: {
            prize: targetPrize.item,
          },
        })),
      );

      // update prize amount
      const remainAmount = targetPrize.amount - pickedAmount;
      await db.prizeList.update(prizeId, { amount: remainAmount });
    })
      .then(() => {
        console.log('transaction complete');
      })
      .catch((err) => {
        console.error(err.stack);
      });
  }

  return {
    employeeList,
    hostList,
    currentHostCompoundName,
    setCurrentHostCompoundName,
    availablePrizeList,
    syncDataToDB,
    completeThisRound,
  };
}
