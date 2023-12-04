import xlsx from 'xlsx'

interface ExtractedData {
  gush: number
  helaka: number
  tatHelaka: number
  saleDay: string
  declaredReturnNIS: string
  salesValueNIS: string
  essence: string
  partSold: string
  yishuv: string
  yearConstruction: string
  area: string
  rooms: string
}

export function extractDataFromExcel(
  filePath: string,
): ExtractedData[] | boolean {
  try {
    const workbook = xlsx.readFile(filePath)
    const worksheet = workbook.Sheets['Sheet1']

    if (!worksheet) {
      throw new Error('Worksheet not found in the Excel file.')
    }

    const data = xlsx.utils.sheet_to_json(worksheet, { header: 1, raw: false})
   
    return data.slice(1).map((row: any) => {
      const [gush, helaka, tatHelaka] = row[0].toString().split('-');
      return {
        gush: +gush,
        helaka: +helaka,
        tatHelaka: +tatHelaka,
        saleDay: row[1],
        declaredReturnNIS: row[2],
        salesValueNIS: row[3],
        essence: row[4],
        partSold: row[5],
        yishuv: row[6],
        yearConstruction: row[7],
        area: row[8],
        rooms: row[9]
      }
    })
  } catch (err) {
    console.error(err)
    return false
  }
}
