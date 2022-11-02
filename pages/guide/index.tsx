import { NextPage } from 'next';
import BannerCarousel from '../../components/carousel/BannerCarousel';
import BehaviorBox from '../../components/box/BehiverBox';
import ImportIcon from '../../components/common/SvgDynamic';

const Guide: NextPage = () => {
  return (
    <main className="my-12">
      <section className="mb-12">
        <div className="max-w-[1280px] mx-3 xl:mx-auto">
          <h2 className="mb-3 text-xl font-medium md:text-2xl">
            주요 행동 요령
          </h2>
          <div className="flex">
            <BehaviorBox
              contents={[
                {
                  text: '태풍·호우',
                  link: '/guide/behaviorTips/1',
                  icon: 'icon-rain',
                },
                {
                  text: '지진·해일',
                  link: '/guide/behaviorTips/2',
                  icon: 'icon-collapse',
                },
                {
                  text: '한파·대설',
                  link: '/guide/behaviorTips/3',
                  icon: 'icon-snow',
                },
              ]}
            />
          </div>
        </div>
      </section>
      <section className="flex w-full mb-12 bg-[#F2F2F2] items-center">
        <BannerCarousel
          contents={[
            {
              text: '지하 공간 침수 시',
              icon: 'icon-stairs',
              link: 'https://www.donga.com/news/amp/all/20220909/115382533/1',
              viewBox: '0 0 160 160',
            },
            {
              text: '대피 시 반려 동물은',
              icon: 'icon-dog',
              link: 'https://m.blog.naver.com/animalscoop/221528135223',
              viewBox: '0 0 218 142',
            },
            {
              text: '차량 침수 시',
              icon: 'icon-car',
              link: 'https://www.korea.kr/news/visualNewsView.do?newsId=148904544',
              viewBox: '23 15 180 175',
            },
          ]}
        />
      </section>
      <section>
        <div className="flex flex-col sm:flex-row max-w-[1280px] mx-3 xl:mx-auto">
          <a
            className="flex sm:w-2/4 mb-4 sm:mb-0 mr-0 sm:mr-5 bg-[#F1F1F1] rounded-[10px] items-center"
            href="https://m.safekorea.go.kr/idsiSFK/neo/main_m/chk/emergencySupplies.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ImportIcon
              icon="icon-check"
              className="m-6 w-[38px] h-[38px] md:w-[44px] md:h-[44px]"
              viewBox="0 0 44 44"
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-base font-medium sm:text-lg md:text-xl">
                재난 대피 체크리스트
              </h2>
              <span className="text-xs sm:text-sm md:text-base">
                나는 얼마나 준비했을까?
              </span>
            </div>
          </a>

          <a
            className="flex sm:w-2/4 bg-[#F1F1F1] rounded-[10px]"
            href="https://www.nongsaro.go.kr/portal/ps/psv/psvr/psvre/curationDtl.ps?menuId=PS03352&srchCurationNo=1536"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ImportIcon
              icon="icon-apple"
              className="m-6 w-[42px] h-[42px] md:w-[50px] md:h-[50px]"
              viewBox="0 0 54 54"
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-base font-medium sm:text-lg md:text-xl">
                농업 피해 예방
              </h2>
              <span className="text-xs sm:text-sm md:text-base">
                농업 피해를 예방하세요.
              </span>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
};

export default Guide;
