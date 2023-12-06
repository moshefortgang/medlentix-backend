import xlsx from "xlsx";
import { ExtractedData } from "../types/ExtractedData";

export function extractDataFromExcel(filePath: string): ExtractedData[] | boolean {
  try {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets["Sheet1"];

    if (!worksheet) {
      throw new Error("Worksheet not found in the Excel file.");
    }

    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1, raw: false });

    return data.slice(1).map((row: any) => {
      const [gush, helaka, tatHelaka] = row[0].toString().split("-");
      const dateParts = row[1].split("/");
      const saleDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
      return {
        gush: +gush,
        helka: +helaka,
        tatHelka: +tatHelaka,
        saleDate: saleDate,
        declaredValueInShekel: +row[2],
        saleValueInShekel: +row[3],
        propertyType: row[4],
        soldPart: +row[5],
        locality: row[6],
        constructionYear: +row[7],
        area: row[8],
        rooms: +row[9],
      };
    });
  } catch (err) {
    console.error(err);
    return false;
  }
}
