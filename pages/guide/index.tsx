import { NextPage } from 'next';
import BehaviorBox from '../../components/BehiverBox';

const Guide: NextPage = () => {
  return (
    <>
      <section>
        <div className="w-full xl:w-[1280px] mx-auto my-12">
          <h2 className="mb-3 text-2xl font-medium">주요 행동 요령</h2>
          <div className="flex">
            <BehaviorBox
              link="/guide/01001"
              bgcolor="#FFD064"
              linecolor="#EFB227"
              icon="SvgIconRain"
            >
              태풍&#183;폭우
              <br />
              행동 요령
            </BehaviorBox>
            <BehaviorBox
              link="/guide/01002"
              bgcolor="#18BF69"
              linecolor="#11A85A"
              icon="SvgIconCollapse"
            >
              지진&#183;해일
              <br />
              행동 요령
            </BehaviorBox>
            <BehaviorBox
              link="/guide/01003"
              bgcolor="#6CC8EA"
              linecolor="#3DB4DF"
              icon="SvgIconSnow"
              last
            >
              태풍&#183;폭우
              <br />
              행동 요령
            </BehaviorBox>
          </div>
        </div>
      </section>
      <section className="w-full h-[300px] bg-slate-500">
        <div />
      </section>
    </>
  );
};

export default Guide;
