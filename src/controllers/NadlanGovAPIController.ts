import axios, { AxiosRequestConfig } from "axios";
import { Request, Response } from "express";
import prisma from "../db/prisma/client";

interface RealEstateTransaction {
  DEALDATETIME: string;
  FULLADRESS: string;
  DISPLAYADRESS: string;
  GUSH: string;
  DEALNATUREDESCRIPTION: string;
  ASSETROOMNUM: string;
  FLOORNO: string;
  DEALNATURE: string;
  DEALAMOUNT: string;
  NEWPROJECTTEXT: string;
  PROJECTNAME: string | null;
  BUILDINGYEAR: string;
  YEARBUILT: string;
  BUILDINGFLOORS: string | null;
  KEYVALUE: string;
  TYPE: number;
  POLYGON_ID: string;
  TREND_IS_NEGATIVE: boolean;
  TREND_FORMAT: string;
}

const insertToDb = async (allResultsData: RealEstateTransaction[], kodYeshuv: any): Promise<void> => {
  try {
    const mappedData = allResultsData.map((resultData) => {

      const [gush, helka, tatHelka] = resultData.GUSH.toString().split("-");

      return {
        dealDateTime: new Date(resultData.DEALDATETIME),
        fullAddress: resultData.FULLADRESS,
        displayAddress: resultData.DISPLAYADRESS,
        gush: +gush,
				helka: +helka,
				tatHelka: +tatHelka,
        dealNatureDescription: resultData.DEALNATUREDESCRIPTION,
        assetRoomNum: resultData.ASSETROOMNUM,
        floorNo: resultData.FLOORNO,
        dealNature: resultData.DEALNATURE,
        dealAmount: resultData.DEALAMOUNT,
        newProjectText: resultData.NEWPROJECTTEXT,
        projectName: resultData.PROJECTNAME,
        buildingYear: resultData.BUILDINGYEAR,
        yearBuilt: resultData.YEARBUILT,
        buildingFloors: resultData.BUILDINGFLOORS,
        keyValue: resultData.KEYVALUE,
        type: resultData.TYPE,
        polygonId: resultData.POLYGON_ID,
        trendIsNegative: resultData.TREND_IS_NEGATIVE,
        trendFormat: resultData.TREND_FORMAT,
        locality: +kodYeshuv
      };
    });

    await prisma.realEstateTransactionsNadlanGov.createMany({
      data: mappedData,
      skipDuplicates: true,
    });

    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};

const fetchData = async (kodYeshuv: any, pageNo: number): Promise<RealEstateTransaction[]> => {
  const data = JSON.stringify({
    ObjectID: kodYeshuv,
    CurrentLavel: 2,
    PageNo: pageNo,
  });

  const config: AxiosRequestConfig = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://www.nadlan.gov.il/Nadlan.REST/Main/GetAssestAndDeals",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };

  try {
    const response = await axios.request(config);
    const allResults = response.data.AllResults;

    if (!Array.isArray(allResults)) {
      console.log("Invalid data structure. AllResults is not an array.");
      return [];
    }

    insertToDb(allResults, kodYeshuv);
    console.log(JSON.stringify(allResults));

    return allResults;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchDataFromNadlanGov = async (req: Request, res: Response): Promise<void> => {
  let { kodYeshuv } = req.query;
  kodYeshuv = kodYeshuv || "5000";

  try {
    await fetchDataWithPagination(kodYeshuv);
    res.send("Data fetching complete");
  } catch (error) {
    console.error("Error in fetchDataFromNadlanGov:", error);
    res.status(500).send("Internal Server Error");
  }
};

const fetchDataWithPagination = async (kodYeshuv: any): Promise<void> => {
  let pageNo = 1;

  while (true) {
    try {
      const allResults = await fetchData(kodYeshuv, pageNo);

      if (allResults.length === 0) {
        console.log("No data found.");
        break;
      }

      const firstResult = allResults[0];

      if (!firstResult) {
        console.log("Invalid data structure. Result is missing.");
        break;
      }

      const { DEALDATETIME } = firstResult;

      if (!DEALDATETIME) {
        console.log("Invalid data structure. DEALDATETIME is missing.");
        break;
      }

      const firstDealDate = new Date(DEALDATETIME);

      if (allResults.length < 20 || firstDealDate.getFullYear() < 2010) {
        // Break the loop if AllResults is less than 20 or if the year is greater than 2010
        break;
      }

      // Increment pageNo for the next iteration
      pageNo++;
    } catch (error) {
      // Handle the error as needed
      console.error("Error in fetchDataWithPagination:", error);
      throw error; // Re-throw the error to be caught by the outer function
    }
  }
};
