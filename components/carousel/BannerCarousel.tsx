import useEmblaCarousel from 'embla-carousel-react';
import uuid from 'react-uuid';
import ImportIcon from '../common/SvgDynamic';

interface Contents {
  text: string;
  icon: string;
  link: string;
  viewBox: string;
}

const BannerCarousel = ({ contents }: { contents: Contents[] }) => {
  const [emblaRef] = useEmblaCarousel({ startIndex: 1, skipSnaps: true });
  const colors: string[] = ['bg-[#769ABA]', 'bg-[#009548]', 'bg-[#8b8b8b]'];

  return (
    <div className="w-full overflow-hidden py-[30px]" ref={emblaRef}>
      <div className="flex w-full">
        {contents.map((e, i) => {
          return (
            <a
              key={uuid()}
              href={e.link}
              className={`block max-w-full mx-2 sm:mx-3 rounded-[10px] flex-[0_0_80%] sm:flex-[0_0_60%] md:flex-[0_0_460px] ${colors[i]}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex flex-col md:h-[250px] md:flex-row p-7 box-border">
                <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                  {e.text}
                  <br />
                  어떻게 하지?
                </h3>
                <ImportIcon
                  icon={e.icon}
                  className="ml-auto mt-auto w-fit h-[114px]"
                  viewBox={e.viewBox}
                />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default BannerCarousel;
