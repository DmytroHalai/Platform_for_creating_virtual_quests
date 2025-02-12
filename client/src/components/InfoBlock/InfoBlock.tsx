import { JSX } from 'react';
import { IconType } from 'react-icons';
import './InfoBlock.css';

interface IFeature {
  icon: IconType;
  title: string;
  desc: string;
}

interface IBlock {
  feature: IFeature;
  className?: string;
}

function InfoBlock({ feature, className }: IBlock): JSX.Element {
  return (
    <div className={`${className ? className : ''} info-block`}>
      <feature.icon className="info-block__icon" />
      <h3 className="info-block__title h3">{feature.title}</h3>
      <p className="info-block__desc text">{feature.desc}</p>
    </div>
  );
}

export default InfoBlock;
export type { IFeature };
