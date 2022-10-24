import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';

type BehaviorTips = {
  safetyCateNm2: string;
  safetyCateNm3: string;
  safetyCate3: string;
  contentsType: number;
  contentsUrl: string;
  actRmks: string;
};

export default function BehaviorTipsDetail({
  data,
  title,
}: {
  data: BehaviorTips[][];
  title: string;
}) {
  const [active, setActive] = useState<number>();
  const [activeIndex, setActiveIndex] = useState<number>();
  const group = data.map((e) => e[0].safetyCateNm2);
  const sgroup = data.map((e) =>
    Array.from(
      new Set(e.map((el) => el.safetyCateNm3).filter((el) => el !== undefined)),
    ),
  );

  useEffect(() => {
    setActiveIndex(undefined);
  }, [active]);

  return (
    <main className="w-full max-w-[1280px] min-h-[70vh] mx-auto my-12 px-3 xl:px-0">
      <h1 className="mb-3 text-xl font-medium md:text-2xl">
        {title} 행동 요령
      </h1>
      {data.map((e, i, a) => (
        <div key={uuid()} className="bg-[#F2F2F2] mb-[1px]">
          <button
            className={`flex justify-between items-center w-full px-4 py-2 text-left bg-[#009548] text-white text-2xl after:w-3 after:h-3 after:border-t-2 after:border-r-2 after:transition-all ${
              active === i
                ? 'after:-rotate-45 after:mt-2'
                : 'after:rotate-[135deg] after:mb-2'
            } ${
              i === 0
                ? 'rounded-t-lg'
                : i === a.length - 1
                ? 'rounded-b-lg'
                : ''
            }`}
            onClick={() => setActive(active !== i ? i : undefined)}
            type="button"
          >
            {group[i]}
          </button>
          <div className={`${active === i && 'p-6'}`}>
            {sgroup[i].map((el, idx, arr) => (
              <div
                key={uuid()}
                className={`p-2 ${
                  idx !== arr.length - 1 && 'border-b border-[#dfdfdf]'
                } ${active !== i ? 'hidden' : 'block'}`}
              >
                <button
                  className={`w-full text-left text-lg ${
                    activeIndex === idx && 'font-bold'
                  }`}
                  onClick={() =>
                    setActiveIndex(activeIndex !== idx ? idx : undefined)
                  }
                  type="button"
                >
                  {el}
                </button>
                <div
                  className={`my-4 ${activeIndex !== idx ? 'hidden' : 'block'}`}
                >
                  {e
                    .filter(
                      (element) =>
                        element.safetyCateNm3 === el &&
                        element.contentsType !== 3 &&
                        element.contentsType !== 4,
                    )
                    .map((element) => (
                      <React.Fragment key={uuid()}>
                        {element.safetyCate3 === '01011007' ||
                        element.safetyCate3 === '01011008' ? (
                          <div className="relative inline-block w-full translate-x-[-50%] left-2/4 sm:w-2/4 sm:left-0 md:w-1/3 sm:translate-x-0">
                            <Image
                              src={element.contentsUrl}
                              width={300}
                              height={320}
                              layout="responsive"
                              objectPosition={5}
                              priority
                              alt="img"
                            />
                          </div>
                        ) : element.contentsUrl ? (
                          <div className="relative w-full max-w-[600px] mb-5">
                            <Image
                              src={element.contentsUrl}
                              width={450}
                              height={300}
                              layout="responsive"
                              objectPosition={0}
                              priority
                              alt="img"
                            />
                          </div>
                        ) : (
                          <pre className="font-sans leading-8 whitespace-pre-wrap">
                            {element.actRmks}
                          </pre>
                        )}
                      </React.Fragment>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const path = Number(params.id);
  const url = `http://openapi.safekorea.go.kr/openapi/service/behaviorconductKnowHow/naturaldisaster/list?&serviceKey=${process.env.PUBLIC_DATA_API_KEY}`;
  const reqKeys = [
    ['01001', '01003'],
    ['01011', '01012', '01013'],
    ['01006', '01005'],
  ];
  const titleList = ['태풍·폭우', '지진·해일', '한파·폭설'];
  const reqList = reqKeys[path - 1].map((e) =>
    axios.get(`${url}&safety_cate=${e}`),
  );
  const data: BehaviorTips[][] = await axios
    .all(reqList)
    .then(
      axios.spread((...res) => res.map((e) => e.data.response.body.items.item)),
    );

  return {
    props: {
      data,
      title: titleList[path - 1],
    },
  };
}
