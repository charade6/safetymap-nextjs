import axios from 'axios';
import { ApiTypes } from '../types/apiType';

const getData = async (name: string) => {
  const menuList: { [menu: string]: number } = {
    TemporaryHousing: 15,
    TsunamiShelter: 1,
    EarthquakeIndoors: 6,
    EarthquakeOutdoors: 11,
  };

  const requestList = Array.from(Array(menuList[name])).map((e, i) =>
    axios.get(`/api/${name}/${i + 1}`),
  );

  const data = await axios.all(requestList).then(
    axios.spread((...responses) => {
      const list: ApiTypes = [];
      responses.forEach((e) => list.push(...e.data));
      return list;
    }),
  );

  return data;
};

export default getData;
