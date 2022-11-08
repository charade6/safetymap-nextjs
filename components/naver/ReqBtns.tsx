/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import ImportIcon from '../common/SvgDynamic';

export default function ReqBtns() {
  const router = useRouter();
  const [active, setActive] = useState<boolean>(true);
  const [btnActive, setBtnActive] = useState<number | undefined>();
  const btnList: {
    title: string;
    name: string;
    icon: string;
    style?: string;
    viewBox?: string;
  }[] = [
    {
      title: '대피소',
      name: 'TemporaryHousing',
      icon: 'main_side_one',
      style: 'w-[44px] h-[44px]',
      viewBox: '0 0 512 436',
    },
    {
      title: '지진 해일 대피',
      name: 'TsunamiShelter',
      icon: 'main_side_two',
      style: 'w-[40px] h-[40px]',
      viewBox: '0 0 512 452',
    },
    {
      title: '실내 지진 대피',
      name: 'EarthquakeIndoors',
      icon: 'main_side_three',
    },
    {
      title: '실외 지진 대피',
      name: 'EarthquakeOutdoors',
      icon: 'main_side_four',
    },
  ];

  useEffect(() => {
    const activeIdx = btnList.findIndex((e) => e.name === router.query.type);
    setBtnActive(activeIdx);
  }, [router.query.type]);

  return (
    <div
      className={`fixed z-40 bg-white top-2/4 translate-y-[-50%] text-xs shadow-nav border rounded-tl-[4px] rounded-bl-[4px] transition-all ${
        active ? 'right-0' : 'right-[-82px]'
      }`}
    >
      <button
        className={`absolute w-[22px] h-[50px] top-2/4 right-full translate-y-[-50%] bg-white border border-r-0 rounded-tl-[4px] rounded-bl-[4px] before:inline-block before:w-2 before:h-2 before:border-t-2 before:border-r-2 before:border-black ${
          active ? 'before:rotate-45' : 'before:-rotate-[135deg]'
        }`}
        aria-label="pannel-folding-btn"
        type="button"
        onClick={() => (active ? setActive(false) : setActive(true))}
      />
      {btnList.map((e, i, a) => (
        <button
          key={uuid()}
          className={`block w-[80px] h-[80px] box-border hover:border-2 hover:border-[#00954870] group ${
            i === 0
              ? 'rounded-tl-[4px]'
              : i === a.length - 1
              ? 'rounded-bl-[4px]'
              : ''
          } ${btnActive === i && 'bg-[#009548] text-white'}`}
          onClick={() => router.replace({ query: { type: e.name } })}
          type="button"
        >
          <ImportIcon
            icon={btnList[i].icon}
            className={`mx-auto mb-[6px] ${btnList[i].style} ${
              btnActive === i ? 'fill-white' : 'fill-black'
            }`}
            viewBox={btnList[i].viewBox}
          />
          {btnList[i].title}
        </button>
      ))}
    </div>
  );
}
