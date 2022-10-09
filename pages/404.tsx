import { useRouter } from 'next/router';
import Ico404 from '../public/ico/icon-404.svg';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-full h-screen bg-[#F4F5F6] overflow-hidden">
      <div className="flex flex-col lg:flex-row relative w-full xl:w-[1280px] h-screen m-auto justify-center lg:justify-start items-center">
        <Ico404
          className="lg:absolute w-[178px] h-[200px] lg:w-[890px] lg:h-[1000px] lg:right-[-280px] lg:top-[4%] opacity-100 lg:opacity-50"
          fill="#009548"
          viewBox="0 0 178 200"
        />
        <div className="z-10 text-[#009548] text-center lg:text-left lg:ml-[170px] mb-16">
          <h1 className="text-[65px] lg:text-[100px] font-black">404</h1>
          <h2 className="mb-2 text-2xl font-bold">메인 화면으로 대피하세요</h2>
          <p className="text-base">
            요청하신 페이지가 사라졌거나 잘못된 경로입니다.
          </p>
          <p className="text-base">
            입력하신 주소가 정확한지 다시 확인해주세요.
          </p>
          <div className="mt-7">
            <button
              className="block sm:inline-block w-full sm:w-40 h-11 sm:mr-4 mb-5 sm:mb-0 border border-[#009548] rounded"
              type="button"
              onClick={() => router.back()}
            >
              이전 화면으로
            </button>
            <button
              className="block sm:inline-block w-full sm:w-40 h-11 bg-[#009548] text-white rounded"
              type="button"
              onClick={() => router.push('/map')}
            >
              메인 화면으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
