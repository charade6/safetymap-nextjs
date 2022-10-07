import Link from 'next/link';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href={'/guide'}>
              <a>가이드</a>
            </Link>
          </li>
          <li>
            <Link href={'/'}>
              <a>대피소</a>
            </Link>
          </li>
          <li>
            <Link href={'/sptfund'}>
              <a>지원금</a>
            </Link>
          </li>
        </ul>
      </nav>
      {children}
      <footer></footer>
    </>
  );
}
