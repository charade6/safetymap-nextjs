import { NextPage } from 'next';
import ImportIcon from '../../components/SvgDynamic';

const SupportFund: NextPage = () => {
  return (
    <main className="max-w-[1280px] mx-3 my-12 xl:mx-auto">
      <h2 className="mb-3 text-xl font-medium md:text-2xl">대상별 지원 내역</h2>
      <div className="grid grid-flow-row-dense grid-cols-10 gap-x-3 gap-y-4 sm:gap-4">
        <a className="flex flex-col-reverse sm:flex-row items-center justify-between col-span-5 sm:h-[140px] p-6 md:px-8 rounded-xl bg-[#F4F5F6]">
          <h1 className="mt-4 text-base font-medium sm:mt-0 sm:text-2xl md:text-3xl">
            재난 피해
          </h1>
          <ImportIcon
            icon="icon-money"
            className="w-[43px] sm:w-[54px] h-fit fill-[#151816]"
            viewBox="0 0 40 40"
          />
        </a>
        <a className="flex flex-col-reverse sm:flex-row items-center justify-between col-span-5 p-6 md:px-8 rounded-xl bg-[#F4F5F6]">
          <h1 className="mt-4 text-base font-medium sm:mt-0 sm:text-2xl md:text-3xl">
            이재민
          </h1>
          <ImportIcon
            icon="main_side_one"
            className="w-[43px] sm:w-[54px] h-2/4 sm:h-fit fill-[#151816]"
            viewBox="0 0 512 436"
          />
        </a>
        <a className="flex flex-col-reverse md:flex-row justify-between col-span-10 md:col-span-6 row-span-2 p-6 md:px-8 rounded-xl bg-[#DEEAF4]">
          <h1 className="text-2xl font-bold md:text-3xl md:mt-auto">
            2022년
            <br />
            폭우 피해 재난지원금
          </h1>
          <ImportIcon
            icon="icon-rainbow"
            className="w-[94px] sm:w-[106px] md:w-[118px] md:h-fit ml-auto md:ml-0 md:my-auto"
            viewBox="0 0 94 73"
          />
        </a>
        <a
          href="https://www.1365.go.kr/vols/1572247904127/partcptn/timeCptn.do"
          className="flex items-center justify-between col-span-10 md:col-span-4 h-[120px] p-6 md:px-8 rounded-xl bg-[#FFF7E4]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="text-xl font-medium">
            수해 현장
            <br />
            자원 봉사자 모집
          </h2>
          <ImportIcon
            icon="icon-hearthand"
            className="w-[55px] md:w-[63px] h-fit"
            viewBox="0 0 67 67"
          />
        </a>
        <a
          href="https://opengov.seoul.go.kr/public/19699644"
          className="flex flex-col-reverse md:flex-row md:items-center justify-between col-span-5 md:col-span-4 md:h-[120px] p-6 md:px-8 rounded-xl bg-[#FFCACB]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="hidden text-xl font-medium md:block">
            무료 집수리
            <br />
            &#39;희망의 집수리&#39; 신청
          </h2>
          <h2 className="text-lg font-medium md:hidden">
            희망의
            <br />
            집수리 신청
          </h2>
          <ImportIcon
            icon="icon-hearthouse"
            className="w-[50px] h-fit md:w-[63px] ml-auto"
            viewBox="0 0 50 56"
          />
        </a>
        <a
          href="https://www.redcross.or.kr/voluntary/recovery_support.do"
          className="flex flex-row-reverse md:flex-row items-center justify-between md:justify-start col-span-10 md:col-span-5 h-[120px] md:h-fit p-6 md:px-8 rounded-xl bg-[#FFF7E4]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImportIcon
            icon="icon-heartcommunication"
            className="md:mr-6 w-fit h-[55px] md:h-[52px]"
            viewBox="0 0 79 69"
          />
          <h2 className="hidden text-xl font-medium md:block">
            재난 심리 회복 지원 센터
          </h2>
          <h2 className="text-xl font-medium md:hidden">
            재난 심리
            <br />
            회복 지원 센터
          </h2>
        </a>
        <a
          href="https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%ED%98%B8%EC%9A%B0+%EC%B9%A8%EC%88%98+%EC%9D%B4%EC%9E%AC%EB%AF%BC+%EA%B5%AC%ED%98%B8+%EC%A7%80%EC%9B%90+%EC%95%88%EB%82%B4&oquery=%EC%9D%B4%EC%9E%AC%EB%AF%BC+%EA%B5%AC%ED%98%B8+%EC%A7%80%EC%9B%90+%EC%95%88%EB%82%B4&tqi=h0ik3sp0Jy0ssONilahssssstll-168421"
          className="flex flex-col items-start md:items-center md:flex-row col-span-5 h-full p-6 md:px-8 rounded-xl bg-[#D9F2FF]"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImportIcon
            icon="icon-plusbox"
            className="ml-auto md:ml-0 md:mr-6 w-fit h-[55px] md:h-[47px]"
            viewBox="0 0 55 55"
          />
          <h2 className="hidden text-xl font-medium md:block">
            이재민 구호 지원 안내
          </h2>
          <h2 className="text-lg font-medium md:hidden">
            이재민
            <br />
            구호 지원 안내
          </h2>
        </a>
      </div>
    </main>
  );
};

export default SupportFund;
