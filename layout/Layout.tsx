import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import NavItem from '../components/NavItem';

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
      <footer />
    </div>
  );
}
