import axios from 'axios';
import https from 'https';
import type { NextApiRequest, NextApiResponse } from 'next';
import { EarthquakeOutdoors } from '../../../types/apiType';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<object>,
) {
  const { query } = req;
  const httpsAgent: https.Agent = new https.Agent({
    rejectUnauthorized: false,
  });

  const url = `https://apis.data.go.kr/1741000/EmergencyAssemblyArea_Earthquake2/getArea1List?serviceKey=${process.env.PUBLIC_DATA_API_KEY}&pageNo=${query.pageNm}&numOfRows=1000&type=json`;

  const data: EarthquakeOutdoors[] = await axios
    .get(url, { httpsAgent })
    .then((response) => response.data.EarthquakeOutdoorsShelter[1].row);

  res.status(200).json(data);
}
