import Link from 'next/link';
import { useRouter } from 'next/router';
import uuid from 'react-uuid';
import ImportIcon from './SvgDynamic';

interface Nav {
  link: string;
  icon: string;
  name: string;
}

export default function NavItem({ nav }: { nav: Nav[] }) {
  const router = useRouter();

  return (
    <>
      {nav.map((e, i) => {
        return (
          <li key={uuid()} className="w-1/3">
            <Link href={e.link}>
              <a
                className={`flex flex-col items-center p-3 ${
                  i === 0
                    ? 'rounded-l-full'
                    : nav.length - 1 === i
                    ? 'rounded-r-full'
                    : ''
                } group`}
              >
                <ImportIcon
                  icon={e.icon}
                  fill={
                    router.pathname.includes(e.link) ? '#009548' : '#BDBDBD'
                  }
                />
                <span className="text-sm">{e.name}</span>
              </a>
            </Link>
          </li>
        );
      })}
    </>
  );
}
