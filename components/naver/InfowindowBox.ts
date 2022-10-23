import KakaoShare from '../../util/KakaoShare';

export default function InfowindowBox({
  name,
  address,
  lat,
  lng,
}: {
  name: string;
  address: string;
  lat: number;
  lng: number;
}): HTMLDivElement {
  const infowindowDiv: HTMLDivElement = document.createElement('div');
  const spanElement1: HTMLSpanElement = document.createElement('span');
  const spanElement2: HTMLSpanElement = document.createElement('span');
  const btnBox: HTMLDivElement = document.createElement('div');
  const shareBtn: HTMLButtonElement = document.createElement('button');
  const drctnBtn: HTMLButtonElement = document.createElement('button');
  const shareIco: SVGSVGElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg',
  );
  const drctnIco: SVGSVGElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'svg',
  );
  const path1: SVGPathElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path',
  );
  path1.setAttribute(
    'd',
    'M384 24c0-9.6 5.7-18.2 14.5-22s19-2 26 4.6l144 136c4.8 4.5 7.5 10.8 7.5 17.4s-2.7 12.9-7.5 17.4l-144 136c-7 6.6-17.2 8.4-26 4.6s-14.5-12.5-14.5-22V224H352 337.5c-45 0-81.5 36.5-81.5 81.5c0 22.3 10.3 34.3 19.2 40.5c6.8 4.7 12.8 12 12.8 20.3c0 9.8-8 17.8-17.8 17.8h-2.5c-2.4 0-4.8-.4-7.1-1.4C242.8 374.8 160 333.4 160 240c0-79.5 64.5-144 144-144h80V24zM0 144C0 99.8 35.8 64 80 64H96c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16H368c8.8 0 16-7.2 16-16V416c0-17.7 14.3-32 32-32s32 14.3 32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V144z',
  );
  const path2: SVGPathElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path',
  );
  path2.setAttribute(
    'd',
    'M384 476.1L192 421.2V35.9L384 90.8V476.1zm32-1.2V88.4L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3V394.6c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2V423.6L32.9 474.5C17.1 480.8 0 469.2 0 452.2V117.4c0-9.8 6-18.6 15.1-22.3z',
  );

  shareIco.setAttribute('width', '16');
  shareIco.appendChild(path1);
  shareIco.setAttribute('viewBox', '0 0 576 512');
  drctnIco.setAttribute('width', '16');
  drctnIco.appendChild(path2);
  drctnIco.setAttribute('viewBox', '0 0 576 512');
  shareIco.classList.add('mx-auto');
  drctnIco.classList.add('mx-auto');

  infowindowDiv.classList.add(
    'p-[10px]',
    'text-[13px]',
    'text-center',
    'w-[150px]',
    'leading-[14px]',
    'h-full',
  );
  spanElement1.classList.add(
    'block',
    'text-[11px]',
    'font-bold',
    'leading-[11px]',
  );
  spanElement2.classList.add(
    'block',
    'mt-1',
    'text-[11px]',
    'font-bold',
    'leading-[11px]',
  );
  btnBox.classList.add('mt-1', 'text-[11px]', 'font-medium', 'leading-none');
  shareBtn.classList.add('mr-2', 'hover:fill-[#009548]');
  drctnBtn.classList.add('hover:fill-[#009548]');

  spanElement1.append('시설명(지역명)');
  spanElement2.append('상세주소');
  shareBtn.append(shareIco, '공유');
  drctnBtn.append(drctnIco, '길찾기');

  shareBtn.addEventListener('click', () => KakaoShare({ address, name }));
  drctnBtn.addEventListener('click', () =>
    window.open(
      `http://map.naver.com/index.nhn?elng=${lng}&elat=${lat}&etext=${name}`,
    ),
  );

  btnBox.append(shareBtn, drctnBtn);
  infowindowDiv.append(spanElement1, name, spanElement2, address, btnBox);
  return infowindowDiv;
}
