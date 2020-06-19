import { FunctionalComponent, h } from 'preact';

export type Icon =
  | 'close'
  | 'search'
  | 'more_vert'
  | 'movie'
  | 'person_pin'
  | 'cloud'
  | 'local_offer'
  | 'settings'
  | 'edit'
  | 'arrow_forward';

export type IconProps = {
  icon: Icon;
  className?: string;
  onClick?: (e: Event) => void;
};

export const Icon: FunctionalComponent<IconProps> = ({ className, icon, onClick }) => (
  <i tabIndex={0} role="button" className={`material-icons ${className}`} onClick={onClick}>
    {icon}
  </i>
);
