import { useState } from 'react';
import uuid from 'react-uuid';
import ImportIcon from '../common/SvgDynamic';

export default function ReqBtns({
  getData,
}: {
  // eslint-disable-next-line no-unused-vars
  getData: (id: number) => Promise<void>;
}) {
  const [active, setActive] = useState<boolean>(true);
  const [btnActive, setBtnActive] = useState<number | undefined>();
  const btnList: {
    name: string;
    icon: string;
    style?: string;
    viewBox?: string;
  }[] = [
    {
      name: '대피소',
      icon: 'main_side_one',
      style: 'w-[44px] h-[44px]',
      viewBox: '0 0 512 436',
    },
    {
      name: '지진 해일 대피',
      icon: 'main_side_two',
      style: 'w-[40px] h-[40px]',
      viewBox: '0 0 512 452',
    },
    {
      name: '실내 지진 대피',
      icon: 'main_side_three',
    },
    {
      name: '실외 지진 대피',
      icon: 'main_side_four',
    },
  ];
  return (
    <div
      className={`fixed z-40 bg-white right-0 top-2/4 translate-y-[-50%] text-xs shadow-nav border rounded-tl-[4px] rounded-bl-[4px] transition-all ${
        active ? '' : 'right-[-80px]'
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
      {Array.from(Array(4).keys()).map((e, i, a) => (
        <button
          key={uuid()}
          className={`block w-[80px] h-[80px] hover:text-white hover:bg-[#009548] group ${
            i === 0
              ? 'rounded-tl-[4px]'
              : i === a.length - 1
              ? 'rounded-bl-[4px]'
              : ''
          } ${btnActive === i && 'bg-[#009548] text-white'}`}
          onClick={() => {
            getData(i + 1);
            setBtnActive(i);
          }}
          type="button"
        >
          <ImportIcon
            icon={btnList[i].icon}
            className={`mx-auto mb-[6px] group-hover:fill-white ${
              btnList[i].style
            } ${btnActive === i ? 'fill-white' : 'fill-black'}`}
            viewBox={btnList[i].viewBox}
          />
          {btnList[i].name}
        </button>
      ))}
    </div>
  );
}
