import type { Employee } from '@/models/employee';
import type { Prize } from '@/models/prize';

import Dexie, { type EntityTable } from 'dexie';

const db = new Dexie('onead-lottery-2025') as Dexie & {
  employeeList: EntityTable<Employee, 'id'>;
  prizeList: EntityTable<Prize, 'id'>;
};

// Schema declaration:
db.version(1).stores({
  employeeList: 'id,department,name,prize',
  prizeList: 'id,hosts,item,amount',
});

export async function isDBInitialized(): Promise<boolean> {
  const employeeListLength = await db.employeeList.count();
  const prizeListLength = await db.prizeList.count();

  return employeeListLength > 0 && prizeListLength > 0;
}

export async function initDB({
  employeeList,
  prizeList,
}: {
  employeeList: Employee[];
  prizeList: Prize[];
}): Promise<void> {
  await db.employeeList.bulkPut(employeeList);
  await db.prizeList.bulkPut(prizeList);
}

async function getEmployeeList() {
  const employeeList = (await db.employeeList.toArray()) || [];

  return employeeList;
}

async function getHostList() {
  const hostList = await db.prizeList.toArray();

  const res = hostList.map(({ hosts }) => hosts);

  return [...new Set(res)];
}

async function getFirstPrizeId(firstHostCompoundName: string) {
  const firstPrize = await db.prizeList.where('hosts').equals(firstHostCompoundName).first();

  return firstPrize?.id || 0;
}

export async function getInitialData(): Promise<{
  employeeList: Employee[];
  hostList: string[];
  initialHostCompoundName: string;
  initialPrizeId: number;
}> {
  const employeeList = await getEmployeeList();
  const hostList = await getHostList();
  const initialHostCompoundName = hostList[0];
  const initialPrizeId = await getFirstPrizeId(initialHostCompoundName);

  return {
    employeeList,
    hostList,
    initialHostCompoundName,
    initialPrizeId,
  };
}
