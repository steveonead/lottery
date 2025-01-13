import type { Employee } from '@/models/employee';
import type { Prize } from '@/models/prize';

import ExcelJS from 'exceljs';

function readFile(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      resolve(reader.result as ArrayBuffer);
    };
  });
}

function processEmployeeData(data: string[], id: number): Employee {
  const [department, name] = data;
  return { id, department, name, prize: '' };
}

function processPrizeData(data: string[], id: number): Prize {
  const [hostText, item, imgSrc, amount] = data;
  return {
    id,
    hosts: hostText.replace(', ', ' & '),
    item,
    imgSrc,
    amount: +amount || 0,
  };
}

export async function readExcel(file: File) {
  const buffer = await readFile(file);
  const workbook = new ExcelJS.Workbook();
  const res = await workbook.xlsx.load(buffer);

  const prizeSheet = res.getWorksheet('獎品');
  const employeeSheet = res.getWorksheet('名單');

  const employeeList: Employee[] = [];
  const prizeList: Prize[] = [];

  prizeSheet?.eachRow(({ values }, id) => {
    if (id === 1) {
      return;
    }

    if (Array.isArray(values) && values.length > 0) {
      const dataArr = values.filter((item) => item !== null || item !== undefined);
      prizeList.push(processPrizeData(dataArr as string[], id));
    }
  });

  employeeSheet?.eachRow(({ values }, id) => {
    if (id === 1) {
      return;
    }

    if (Array.isArray(values) && values.length > 0) {
      const dataArr = values.filter((item) => item !== null || item !== undefined);
      employeeList.push(processEmployeeData(dataArr as string[], id));
    }
  });

  return [employeeList, prizeList] as [Employee[], Prize[]];
}

export async function exportToExcel(data: Employee[]) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('得獎名單');

  sheet.columns = [
    { header: '部門', key: 'department' },
    { header: '姓名', key: 'name' },
    { header: '獎項', key: 'prize' },
  ];

  data.forEach((employee) => {
    sheet.addRow(employee);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '得獎名單.xlsx';
  a.click();
  URL.revokeObjectURL(url);
}
