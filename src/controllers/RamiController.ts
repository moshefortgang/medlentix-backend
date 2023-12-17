
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Request, Response } from "express";
import prisma from "../db/prisma/client";
import { TikData } from "../types/TikData";

interface SearchRequestBody {
  ActiveQuickSearch: boolean;
  KodYeshuv: number;
  ActiveMichraz: boolean;
  FromVaadaDate: string;
}

export const fetchDataFromRami = async (req: Request, res: Response): Promise<void> => {
  try {
    const { kodYeshuv, fromVaadaDate } = req.body;

    const requestData: SearchRequestBody = {
      ActiveQuickSearch: false,
      KodYeshuv: kodYeshuv || 2610, //need to improve
      ActiveMichraz: false,
      FromVaadaDate: fromVaadaDate || "2014-12-31T22:00:00.000Z", //need to improve
    };

    const config: AxiosRequestConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://apps.land.gov.il/MichrazimSite/api/SearchApi/Search",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "he,en-US;q=0.9,en;q=0.8",
        "Content-Type": "application/json",
      },
      data: requestData,
    };

    const response: AxiosResponse = await axios.request(config);
    const filteredData = response.data.filter((item: { YechidotDiur: number }) => item.YechidotDiur > 0);
    // getMichrazByID(filteredData);

    const promises = filteredData.map(async (item: { MichrazID: any }) => {
      const config: AxiosRequestConfig = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://apps.land.gov.il/MichrazimSite/api/MichrazDetailsApi/Get?michrazID=${item.MichrazID}`,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "he,en-US;q=0.9,en;q=0.8",
          "Content-Type": "application/json",
        },
      };

      const detailsResponse = await axios.request(config);
      processMichraz(detailsResponse.data);
    });

    await Promise.all(promises);
    res.json({ message: "Form data processed successfully" });
  } catch (error) {
    console.error("Error fetching data from Rami: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const processMichraz = async (michraz: { VaadaDate: any; Shchuna: string; Tik: TikData[] }): Promise<void> => {
  for (const tik of michraz.Tik) {
    if (tik.SchumZchiya < 1 || tik.Kibolet < 2) continue;

    try {
      let michrazResult = await prisma.michraz.create({
        data: {
          MichrazID: tik.MichrazID,
          MitchamName: tik.MitchamName,
          SchumZchiya: tik.SchumZchiya,
          ShemZoche: tik.ShemZoche,
          Kibolet: tik.Kibolet,
          HotzaotPituach: tik.HotzaotPituach,
          VaadaDate: michraz.VaadaDate,
        },
      });

      let project = await prisma.project.create({
        data: {
          projectName: "בית שמש - " + tik.ShemZoche,
          shchuna: michraz.Shchuna,
          michrazId: michrazResult.id,
        },
      });
      for (const gushHelka of tik.GushHelka) {
        await prisma.block.createMany({
          data: {
            id: gushHelka.id,
            projectId: project.id,
            gush: +gushHelka.Gush,
            helka: +gushHelka.Helka,
          },
        });
      }
    } catch (error) {
      console.error("Error processing Michraz:", error);
    }
  }
};
