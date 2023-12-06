import axios, { AxiosRequestConfig } from 'axios'


export async function dataRemi() {
  try {
    let data = JSON.stringify({
      ActiveQuickSearch: false,
      KodYeshuv: 2610,
      ActiveMichraz: false,
    })

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
    }

    axios
      .request(config)
      .then((response) => {
        filterDiur(response.data);
      })
      .catch((error) => {
        console.log(error)
      })

  } catch (error) {
    console.error(error)
  }
}
function filterDiur(arrData: any[]): void {
  const filteredData = arrData.filter((item) => item.YechidotDiur > 0)
}

