/* eslint-disable no-unused-expressions */
import { useEffect, useState } from 'react';

export default function HideNav() {
  const [ScrollY, setScrollY] = useState(0);
  const [NavStatus, setBtnStatus] = useState(true);

  const handleScroll = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY < window.pageYOffset) {
      setBtnStatus(false);
    } else {
      setBtnStatus(true);
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
