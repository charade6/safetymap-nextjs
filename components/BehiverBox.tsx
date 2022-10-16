import Link from 'next/link';
import uuid from 'react-uuid';
import ImportIcon from './SvgDynamic';

interface Contents {
  text: string;
  link: string;
  icon: string;
}

export default function BehaviorBox({
  contents,
}: {
  contents: Contents[];
}): JSX.Element {
  const colors: { color1: string; color2: string }[] = [
    { color1: 'bg-[#FFD064] hover:border-[#FFD064]', color2: 'bg-[#EFB227]' },
    { color1: 'bg-[#18BF69] hover:border-[#18BF69]', color2: 'bg-[#11A85A]' },
    { color1: 'bg-[#6CC8EA] hover:border-[#6CC8EA]', color2: 'bg-[#3DB4DF]' },
  ];
  return (
    <>
      {contents.map((e, i) => {
        return (
          <Link href={e.link} key={uuid()}>
            <a
              className={`flex w-1/3 hover:border-8 hover:bg-white group ${
                contents.length - 1 === i ? '' : 'mr-3 sm:mr-4 md:mr-5 '
              } ${colors[i].color1}`}
            >
              <div className="px-1 py-2 md:p-2">
                <div
                  className={`w-1 h-full group-hover:invisible ${colors[i].color2}`}
                />
              </div>
              <div className="flex flex-col-reverse items-center w-full p-4 md:p-6 md:items-baseline md:flex-col group-hover:p-2 md:group-hover:p-4">
                <h2 className="mt-3 text-base font-bold text-white md:mt-0 sm:text-lg md:text-2xl group-hover:text-black">
                  {e.text}
                  <br />
                  행동 요령
                </h2>
                <ImportIcon
                  icon={e.icon}
                  className="ml-2/4 md:ml-auto fill-white group-hover:fill-[#333333] w-[42px] h-[42px] sm:w-[52px] sm:h-[52px] md:w-[63px] md:h-[63px] lg:w-[74px] lg:h-[74px]"
                  viewBox="0 0 74 74"
                />
              </div>
            </a>
          </Link>
        );
      })}
    </>
  );
}
