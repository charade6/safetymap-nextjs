import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import NavItem from '../NavItem';
import HideNav from '../HideNav';
import ImportIcon from '../SvgDynamic';

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  const navList = [
    { link: '/guide', icon: 'icon-running', name: '가이드' },
    { link: '/map', icon: 'icon-location', name: '대피소' },
    { link: '/sptfund', icon: 'icon-money', name: '지원금' },
  ];
  const title = `주변 대피소 찾기 | ${
    navList.find((e) => router.pathname.includes(e.link))?.name
  }`;

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <nav
        className={`fixed z-50 w-4/5 m-auto font-bold translate-x-[-50%] bg-white rounded-full bottom-[3%] left-2/4 shadow-nav sm:w-[460px] transition-all ${
          HideNav() ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <ul className="flex items-center justify-around w-full text-xs sm:text-base">
          <NavItem nav={navList} />
        </ul>
      </nav>
      {children}
      {router.pathname === '/map' || router.pathname === '/404' ? null : (
        <footer className="flex flex-col h-[200px] bg-[#F2F2F2] text-center text-[#A2A8A5] justify-center">
          <h3 className="mb-2 text-base font-bold sm:text-lg md:text-xl">
            <ImportIcon icon="icon-logo" className="inline mr-3" />
            주변 대피소 찾기
          </h3>
          <p className="text-xs sm:text-sm md:text-base">
            <span className="font-bold">학과</span> 컴퓨터정보학부 &#124;&#160;
            <span className="font-bold">제작</span> 학점대피소
          </p>
          <p>Copyright &#169; credit shelter All Rights Reserved</p>
        </footer>
      )}
    </div>
  );
}
