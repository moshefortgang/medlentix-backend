import axios, { AxiosRequestConfig } from 'axios';

export async function dataRemi() {
  try {
    let data = JSON.stringify({
      ActiveQuickSearch: false,
      KodYeshuv: 2610,
      ActiveMichraz: false,
      FromVaadaDate: "2014-12-31T22:00:00.000Z"
    });

    let config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://apps.land.gov.il/MichrazimSite/api/SearchApi/Search',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'he,en-US;q=0.9,en;q=0.8',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    const response = await axios.request(config);
    filterDiur(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function filterDiur(arrData: any[]): Promise<void> {
  const filteredData = arrData.filter((item) => item.YechidotDiur > 0);
  for (let i = 0; i < filteredData.length; i++) {
    try {
      let config1: AxiosRequestConfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://apps.land.gov.il/MichrazimSite/api/MichrazDetailsApi/Get?michrazID=${filteredData[i].MichrazID}`,
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'he,en-US;q=0.9,en;q=0.8',
          'Content-Type': 'application/json',
        }
      };

      const response = await axios.request(config1);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}