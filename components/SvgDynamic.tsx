import dynamic from 'next/dynamic';
import { FC, SVGAttributes } from 'react';

interface Props extends SVGAttributes<SVGElement> {
  icon: string;
}

const ImportIcon: FC<Props> = ({ icon, ...props }) => {
  const Icon = dynamic(() => import(`../public/ico/${icon}.svg`));
  return <Icon {...props} />;
};

export default ImportIcon;
