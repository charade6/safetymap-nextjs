import { useRef } from 'react';
import naverMap from '../../hooks/useNaverMap';
import ImportIcon from '../common/SvgDynamic';

export default function SearchBar({
  map,
}: {
  map: naver.maps.Map | undefined;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const naver = naverMap(map);

  return (
    <>
      <div
        className={`fixed flex place-content-between z-40 w-4/5 bg-white py-2 border shadow-nav left-2/4 translate-x-[-50%] rounded-full transition-all ${
          naver.isHide ? 'top-[-50px]' : 'top-10'
        }`}
      >
        <input
          className="w-full ml-4 mr-2 focus:outline-none"
          placeholder="현재 위치를 입력해주세요."
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              naver.searchAddress(inputRef.current?.value);
            }
          }}
          type="search"
          ref={inputRef}
        />
        <div className="flex mr-4">
          <button
            className="hidden sm:block"
            onClick={() => {
              naver.findCurrentLocation();
            }}
            type="button"
          >
            <ImportIcon icon="icon-gps" className="w-[24px]" />
          </button>
          <button
            className="sm:ml-[20px]"
            onClick={() => naver.searchAddress(inputRef.current?.value)}
            type="button"
          >
            <ImportIcon icon="icon-search" className="w-[24px]" />
          </button>
        </div>
      </div>
      <div
        className={`fixed z-40 bg-white rounded-full left-[5%] shadow-nav transition-all ${
          naver.isHide ? 'bottom-[-20%]' : 'bottom-[20%]'
        }`}
      >
        <button
          className="p-4 sm:hidden"
          onClick={() => naver.findCurrentLocation()}
          type="button"
        >
          <ImportIcon icon="icon-gps" className="w-[24px]" />
        </button>
      </div>
    </>
  );
}
