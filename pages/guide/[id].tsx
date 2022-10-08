import axios from 'axios';

type BehaviorTips = {
  safetyCateNm3: string;
  contentsType: number;
  actRmks: string;
};

export default function GuideDetail({ data }: { data: BehaviorTips[] }) {
  return (
    <div className="mb-20">
      {data.map((e, index) => (
        <p key={index}>{e.actRmks}</p>
      ))}
    </div>
  );
}

export async function getStaticPaths() {
  const pathArr: object[] = [];
  for (let i = 1; i < 18; i++) {
    pathArr.push({ params: { id: `010${i > 9 ? i : '0' + i}` } });
  }
  return {
    paths: pathArr,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const url = `http://openapi.safekorea.go.kr/openapi/service/behaviorconductKnowHow/naturaldisaster/list?safety_cate=${params.id}&serviceKey=${process.env.PUBLIC_DATA_API_KEY}`;
  const data: BehaviorTips[] = await axios.get(url).then((res) => {
    return res.data.response.body.items.item;
  });

  return {
    props: {
      data,
    },
  };
}
