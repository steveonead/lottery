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

export { db };
