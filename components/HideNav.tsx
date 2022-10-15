import { useEffect, useState } from 'react';

export default function HideNav() {
  const [ScrollY, setScrollY] = useState(0);
  const [NavStatus, setNavStatus] = useState(true);

  const handleScroll = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY < window.pageYOffset) {
      setNavStatus(false);
    } else {
      setNavStatus(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return NavStatus;
}
