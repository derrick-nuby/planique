import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';

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

export function exportToPdf<T extends object>(data: T, fileName: string) {
  const doc = new jsPDF();
  const content = JSON.stringify(data, null, 2);
  doc.text(content, 10, 10);
  doc.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
}
