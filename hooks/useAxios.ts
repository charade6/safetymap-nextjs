import axios from 'axios';
import { useRef, useState } from 'react';
import { ApiTypes } from '../types/apiType';

const useAxios = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const api = useRef<ApiTypes>([]);

  const getData = async (name: string) => {
    setIsLoading(true);
    const menuList: { [menu: string]: number } = {
      TemporaryHousing: 15,
      TsunamiShelter: 1,
      EarthquakeIndoors: 6,
      EarthquakeOutdoors: 11,
    };

    if (!menuList[name]) {
      setIsLoading(false);
      return;
    }

    const requestList = Array.from(Array(menuList[name])).map((e, i) =>
      axios.get(`/api/${name}/${i + 1}`),
    );

    await axios
      .all(requestList)
      .then(
        axios.spread((...responses) => {
          const list: ApiTypes = [];
          responses.forEach((e) => list.push(...e.data));
          api.current = list;
        }),
      )
      .catch(() => alert('서버 오류\n잠시후 다시 시도해주세요.'));

    setIsLoading(false);
  };

  return { data: api.current, isLoading, getData };
};

export default useAxios;
