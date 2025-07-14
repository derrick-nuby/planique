import { utils, writeFile } from 'xlsx';

export function exportToXlsx<T extends object>(data: T[], fileName: string) {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Data');
  writeFile(workbook, fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`);
}

export function exportToCsv<T extends object>(data: T[], fileName: string) {
  const worksheet = utils.json_to_sheet(data);
  const csv = utils.sheet_to_csv(worksheet);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName.endsWith('.csv') ? fileName : `${fileName}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportToPdf<T extends object>(data: T[], fileName: string) {
  if (!data.length) return;
  const doc = new jsPDF();
  const headers = Object.keys(data[0]);
  const rows = data.map(item =>
    headers.map(h => String((item as Record<string, unknown>)[h] ?? ''))
  );
  autoTable(doc, { head: [headers], body: rows });
  doc.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
}
