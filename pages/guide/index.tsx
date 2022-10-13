import { NextPage } from 'next';
import BehaviorBox from '../../components/BehiverBox';
import IcoApple from '../../public/ico/icon-apple.svg';
import IcoCheck from '../../public/ico/icon-check.svg';

const Guide: NextPage = () => {
  return (
    <>
      <section>
        <div className="xl:w-[1280px] mx-3 xl:mx-auto my-12">
          <h2 className="mb-3 text-base font-medium sm:text-xl md:text-2xl">
            주요 행동 요령
          </h2>
          <div className="flex">
            <BehaviorBox
              link="/guide/01001"
              bgcolor="bg-[#FFD064]"
              hover="hover:border-[#FFD064]"
              linecolor="bg-[#EFB227]"
              icon="SvgIconRain"
            >
              태풍&#183;폭우
              <br />
              행동 요령
            </BehaviorBox>
            <BehaviorBox
              link="/guide/01002"
              bgcolor="bg-[#18BF69]"
              hover="hover:border-[#18BF69]"
              linecolor="bg-[#11A85A]"
              icon="SvgIconCollapse"
            >
              지진&#183;해일
              <br />
              행동 요령
            </BehaviorBox>
            <BehaviorBox
              link="/guide/01003"
              bgcolor="bg-[#6CC8EA]"
              hover="hover:border-[#6CC8EA]"
              linecolor="bg-[#3DB4DF]"
              icon="SvgIconSnow"
              last
            >
              한파&#183;폭설
              <br />
              행동 요령
            </BehaviorBox>
          </div>
        </div>
      </section>
      <section className="w-full h-[300px] bg-[#F2F2F2]">
        <div />
      </section>
      <section>
        <div className="flex flex-col sm:flex-row xl:w-[1280px] my-10 mx-3 xl:mx-auto">
          <a
            className="flex sm:w-2/4 mb-7 sm:mb-0 mr-0 sm:mr-5 bg-[#F1F1F1] rounded-[10px] items-center"
            href="https://m.safekorea.go.kr/idsiSFK/neo/main_m/chk/emergencySupplies.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IcoCheck
              className="m-6 w-[38px] h-[38px] md:w-[44px] md:h-[44px]"
              viewBox="0 0 44 44"
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-base font-medium sm:text-lg md:text-xl">
                재난 대비 체크리스트
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
            <IcoApple
              className="m-6 w-[42px] h-[42px] md:w-[50px] md:h-[50px]"
              viewBox="3 0 54 54"
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
    </>
  );
};

export default Guide;
