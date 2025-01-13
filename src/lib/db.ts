import type { Employee } from '@/models/employee';
import type { Prize } from '@/models/prize';

import { db } from '@/models/db';

export async function isDBInitialized(): Promise<boolean> {
  const employeeListLength = await db.employeeList.count();
  const prizeListLength = await db.prizeList.count();

  return employeeListLength > 0 && prizeListLength > 0;
}

export async function initializeDB({
  employeeList,
  prizeList,
}: {
  employeeList: Employee[];
  prizeList: Prize[];
}): Promise<void> {
  await db.employeeList.bulkPut(employeeList);
  await db.prizeList.bulkPut(prizeList);
}

async function queryHostList(): Promise<string[]> {
  const hostList = await db.prizeList.toArray();

  const res = hostList.map(({ hosts }) => hosts);

  return [...new Set(res)];
}

async function queryFirstPrize(): Promise<Prize> {
  const prizeList = await db.prizeList.where('amount').above(0).sortBy('id');

  return prizeList[0];
}

export async function queryInitialData(): Promise<{
  hostList: string[];
  initialHostCompoundName: string;
  initialPrize?: Prize;
}> {
  const hostList = await queryHostList();
  const firstPrize = await queryFirstPrize();

  return {
    hostList,
    initialHostCompoundName: firstPrize.hosts,
    initialPrize: firstPrize,
  };
}

export async function queryAvailableEmployeeList(): Promise<Employee[]> {
  return db.employeeList.where('prize').equals('').toArray();
}

export async function queryAllEmployeeList(): Promise<Employee[]> {
  return db.employeeList.toArray();
}

export function queryAvailablePrizeList(hostCompoundName: string): Promise<Prize[]> {
  return db.prizeList
    .where('hosts')
    .equals(hostCompoundName)
    .and((prize) => prize.amount > 0)
    .toArray();
}

export async function completeThisRound({
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

    if (targetPrize.amount < pickedAmount) {
      throw new Error('picked amount exceed prize amount');
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
