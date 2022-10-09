import Link from 'next/link';
import { useRouter } from 'next/router';
import IcoRunning from '../public/ico/icon-running.svg';
import IcoLocation from '../public/ico/icon-location.svg';
import IcoMoney from '../public/ico/icon-money.svg';

export default function NavItem({
  id,
  position,
}: {
  id: number;
  position?: string;
}) {
  type Navitem = {
    id: number;
    title: string;
    link: string;
    ico: JSX.Element;
  };
  const router = useRouter();
  const navItems: Navitem[] = [
    {
      id: 1,
      title: '가이드',
      link: '/guide',
      ico: (
        <IcoRunning
          className="group-hover:animate-bounce"
          fill={router.pathname.includes('/guide') ? '#009548' : '#BDBDBD'}
        />
      ),
    },
    {
      id: 2,
      title: '대피소',
      link: '/map',
      ico: (
        <IcoLocation
          className="group-hover:animate-bounce"
          fill={router.pathname === '/map' ? '#009548' : '#BDBDBD'}
        />
      ),
    },
    {
      id: 3,
      title: '지원금',
      link: '/sptfund',
      ico: (
        <IcoMoney
          className="group-hover:animate-bounce"
          fill={router.pathname === '/sptfund' ? '#009548' : '#BDBDBD'}
        />
      ),
    },
  ];
  const item = navItems.find((e) => e.id === id);

  return (
    <li className="w-[33.333333336%]">
      <Link href={item!.link}>
        <a
          className={`flex flex-col items-center p-3 ${
            position === 'left'
              ? 'rounded-l-full'
              : position === 'right'
              ? 'rounded-r-full'
              : null
          } group`}
        >
          {item!.ico}
          <span className="">{item!.title}</span>
        </a>
      </Link>
    </li>
  );
}

NavItem.defaultProps = {
  position: undefined,
};
