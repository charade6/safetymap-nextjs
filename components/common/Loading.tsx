import Image from 'next/image';
import loading from '../../assets/loading.gif';

const Loading = () => {
  return (
    <div className="absolute top-0 left-0 z-30 w-full h-screen">
      <div className="h-full bg-[#999] opacity-50" />
      <div className="absolute translate-x-[-50%] translate-y-[-50%] top-2/4 left-2/4">
        <Image src={loading} width={40} height={40} layout="fixed" priority />
      </div>
    </div>
  );
};

export default Loading;
