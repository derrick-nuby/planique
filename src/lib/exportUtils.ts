import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export async function exportToXlsx<T extends object>(data: T[], fileName: string) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data");

  if (data.length) {
    const columns = Object.keys(data[0]).map(key => ({ header: key, key }));
    worksheet.columns = columns as ExcelJS.Column[];
    data.forEach(item => worksheet.addRow(item));
  }

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, fileName.endsWith(".xlsx") ? fileName : `${fileName}.xlsx`);
}

export function exportToCsv<T extends object>(data: T[], fileName: string) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csv =
    headers.join(",") +
    "\n" +
    data
      .map(item =>
        headers
          .map(key => {
            const value = String((item as Record<string, unknown>)[key] ?? "");
            return `"${value.replace(/"/g, '""')}"`;
          })
          .join(",")
      )
      .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, fileName.endsWith(".csv") ? fileName : `${fileName}.csv`);
}

export function exportToPdf<T extends object>(data: T | T[], fileName: string) {
  const doc = new jsPDF();

  if (Array.isArray(data)) {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const rows = data.map(item =>
      headers.map(h => String((item as Record<string, unknown>)[h] ?? ""))
    );
    autoTable(doc, { head: [headers], body: rows });
  } else {
    const content = JSON.stringify(data, null, 2);
    doc.text(content, 10, 10);
  }

  doc.save(fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`);
}
