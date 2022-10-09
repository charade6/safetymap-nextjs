import { NextPage } from 'next';
import Link from 'next/link';

const Guide: NextPage = () => {
  const link: string[] = [];
  for (let i = 1; i < 18; i++) {
    link.push(`guide/010${i > 9 ? i : `0${i}`}`);
  }
  return (
    <>
      {link.map((e, i) => (
        <Link key={i} href={e}>
          <a>링크{i + 1}</a>
        </Link>
      ))}
    </>
  );
};

export default Guide;
