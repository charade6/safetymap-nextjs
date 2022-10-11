import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import NavItem from '../components/NavItem';
import IcoLogo from '../public/ico/icon-logo.svg';

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  return (
    <div
      className={`${
        router.pathname === '/map' || router.pathname === '/404'
          ? ''
          : 'xl:w-[1280px]'
      } w-full m-auto`}
    >
      <nav className="fixed z-50 w-4/5 m-auto font-bold translate-x-[-50%] bg-white rounded-full bottom-[3%] left-2/4 shadow-nav sm:w-[460px]">
        <ul className="flex items-center justify-around w-full text-xs sm:text-base">
          <NavItem id={1} position="left" />
          <NavItem id={2} />
          <NavItem id={3} position="right" />
        </ul>
      </nav>
      {children}
      {router.pathname === '/map' || router.pathname === '/404' ? null : (
        <footer className="flex flex-col h-[200px] bg-[#F2F2F2] text-center text-[#A2A8A5] justify-center">
          <h3 className="mb-2 text-xl font-bold">
            <IcoLogo className="inline mr-3" />
            주변 대피소 찾기
          </h3>
          <p>
            <span className="font-bold">학과</span> 컴퓨터정보학부 &#124;&#160;
            <span className="font-bold">제작</span> 학점대피소
          </p>
          <p>Copyright &#169; credit shelter All Rights Reserved</p>
        </footer>
      )}
    </div>
  );
}
