import Link from 'next/link';
import IcoCollapse from '../public/ico/icon-collapse.svg';
import IcoRain from '../public/ico/icon-rain.svg';
import IcoSnow from '../public/ico/icon-snow.svg';

export default function BehaviorBox({
  children,
  link,
  bgcolor,
  linecolor,
  icon,
  last,
}: {
  children: React.ReactNode;
  link: string;
  bgcolor: string;
  linecolor: string;
  icon: string;
  last?: boolean | undefined;
}) {
  const svgList = [
    <IcoCollapse className="mr-2 fill-white group-hover:fill-[#333333]" />,
    <IcoRain className="mr-2 fill-white group-hover:fill-[#333333]" />,
    <IcoSnow className="mr-2 fill-white group-hover:fill-[#333333]" />,
  ];
  const idx = svgList.findIndex((e) => e.type.name === icon);
  const bg = `bg-[${bgcolor}] hover:border-[${bgcolor}]`;
  const line = `bg-[${linecolor}]`;
  return (
    <Link href={link}>
      <a
        className={`flex w-1/3 ${bg} hover:border-8 hover:bg-white group ${
          last ? '' : 'mr-6'
        }`}
      >
        <div className="p-2">
          <div className={`w-1 h-full group-hover:invisible ${line}`} />
        </div>
        <div className="flex flex-col w-full p-6 group-hover:p-4">
          <h2 className="text-2xl font-bold text-white group-hover:text-black">
            {children}
          </h2>
          <div className="flex items-end justify-end">{svgList[idx]}</div>
        </div>
      </a>
    </Link>
  );
}

BehaviorBox.defaultProps = {
  last: false,
};
