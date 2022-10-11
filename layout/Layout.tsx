import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import NavItem from '../components/NavItem';
import IcoLogo from '../public/ico/icon-logo.svg';

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  return (
    <div>
      <nav className="fixed z-50 w-4/5 m-auto font-bold translate-x-[-50%] bg-white rounded-full bottom-[3%] left-2/4 shadow-nav sm:w-[460px]">
        <ul className="flex items-center justify-around w-full text-xs sm:text-base">
          <NavItem link="/guide" icon="SvgIconRunning" position="left">
            가이드
          </NavItem>
          <NavItem link="/map" icon="SvgIconLocation">
            대피소
          </NavItem>
          <NavItem link="/sptfund" icon="SvgIconMoney" position="right">
            지원금
          </NavItem>
        </ul>
      </nav>
      {children}
      {router.pathname === '/map' || router.pathname === '/404' ? null : (
        <footer className="flex flex-col h-[200px] bg-[#F2F2F2] text-center text-[#A2A8A5] justify-center">
          <h3 className="mb-2 text-base font-bold sm:text-lg md:text-xl">
            <IcoLogo className="inline mr-3" />
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
