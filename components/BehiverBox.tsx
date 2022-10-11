import Link from 'next/link';
import IcoCollapse from '../public/ico/icon-collapse.svg';
import IcoRain from '../public/ico/icon-rain.svg';
import IcoSnow from '../public/ico/icon-snow.svg';

export default function BehaviorBox({
  children,
  link,
  hover,
  bgcolor,
  linecolor,
  icon,
  last,
}: {
  children: React.ReactNode;
  link: string;
  hover: string;
  bgcolor: string;
  linecolor: string;
  icon: string;
  last?: boolean | undefined;
}) {
  interface icoType {
    [key: string]: any;
  }

  const iconType: icoType = {
    SvgIconCollapse: IcoCollapse,
    SvgIconRain: IcoRain,
    SvgIconSnow: IcoSnow,
  };
  const Ico: React.ElementType = iconType[icon];

  return (
    <Link href={link}>
      <a
        className={`flex w-1/3 hover:border-8 hover:bg-white group ${
          last ? '' : 'mr-6'
        } ${bgcolor} ${hover}`}
      >
        <div className="p-2">
          <div className={`w-1 h-full group-hover:invisible ${linecolor}`} />
        </div>
        <div className="flex w-full p-6 md:flex-col group-hover:p-4">
          <h2 className="text-2xl font-bold text-white group-hover:text-black">
            {children}
          </h2>
          <div className="flex items-end justify-end">
            <Ico className="mr-2 fill-white group-hover:fill-[#333333]" />
          </div>
        </div>
      </a>
    </Link>
  );
}

BehaviorBox.defaultProps = {
  last: false,
};
