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
          last ? '' : 'mr-2 sm:mr-4 md:mr-6 '
        } ${bgcolor} ${hover}`}
      >
        <div className="px-1 py-2 md:p-2">
          <div className={`w-1 h-full group-hover:invisible ${linecolor}`} />
        </div>
        <div className="flex flex-col-reverse items-center w-full p-4 md:p-6 md:items-baseline md:flex-col group-hover:p-2 md:group-hover:p-4">
          <h2 className="mt-5 text-base font-bold text-white md:mt-0 sm:text-lg md:text-2xl group-hover:text-black">
            {children}
          </h2>
          <div className="flex justify-center w-full md:justify-end">
            <Ico
              className="mr-0 md:mr-2 fill-white group-hover:fill-[#333333] w-[42px] h-[42px] sm:w-[52px] sm:h-[52px] md:w-[63px] md:h-[63px] lg:w-[74px] lg:h-[74px]"
              viewBox="0 0 74 74"
            />
          </div>
        </div>
      </a>
    </Link>
  );
}

BehaviorBox.defaultProps = {
  last: false,
};
