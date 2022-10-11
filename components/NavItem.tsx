import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import IcoRunning from '../public/ico/icon-running.svg';
import IcoLocation from '../public/ico/icon-location.svg';
import IcoMoney from '../public/ico/icon-money.svg';

export default function NavItem({
  link,
  icon,
  children,
  position,
}: {
  link: string;
  icon: string;
  children: React.ReactNode;
  position?: string;
}) {
  const router = useRouter();
  const iconList = [IcoRunning, IcoMoney, IcoLocation];
  const idx = iconList.findIndex((e) => e.name === icon);

  return (
    <li className="w-1/3">
      <Link href={link}>
        <a
          className={`flex flex-col items-center p-3 ${
            position === 'left'
              ? 'rounded-l-full'
              : position === 'right'
              ? 'rounded-r-full'
              : ''
          } group`}
        >
          {React.createElement(iconList[idx], {
            className: 'group-hover:animate-bounce',
            fill: router.pathname.includes(link) ? '#009548' : '#BDBDBD',
          })}
          <span className="text-sm">{children}</span>
        </a>
      </Link>
    </li>
  );
}

NavItem.defaultProps = {
  position: undefined,
};
