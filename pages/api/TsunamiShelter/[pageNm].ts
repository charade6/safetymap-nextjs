import axios from 'axios';
import https from 'https';
import type { NextApiRequest, NextApiResponse } from 'next';
import { TsunamiShelter } from '../../../types/apiType';

type FetchData = {
  id: number;
  sido_name: string;
  sigungu_name: string;
  remarks: string;
  shel_nm: string;
  address: string;
  lon: number;
  lat: number;
  shel_av: number;
  lenth: number;
  shel_div_type: string;
  seismic: string;
  height: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>,
) {
  const { query } = req;
  const httpsAgent: https.Agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const url = `https://apis.data.go.kr/1741000/TsunamiShelter3/getTsunamiShelter1List?serviceKey=${process.env.PUBLIC_DATA_API_KEY}&pageNo=${query.pageNm}&numOfRows=647&type=json`;

  const data: TsunamiShelter[] = await axios
    .get(url, { httpsAgent })
    .then((response) => response.data.TsunamiShelter[1].row)
    .then((e) =>
      e.map((el: FetchData) => {
        return {
          ctprvn_nm: el.sido_name,
          sgg_nme: el.sigungu_name,
          vt_acmdfclty_nm: el.shel_nm,
          dtl_adres: el.address,
          xcode: el.lon,
          ycode: el.lat,
        };
      }),
    );

  res.status(200).json(data);
}
