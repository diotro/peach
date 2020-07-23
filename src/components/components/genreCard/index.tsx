import { JSX, Fragment, FunctionalComponent, h, VNode } from 'preact';
import { Image } from '../image';
import logo from '../../static/logo.png';

export type GenreCardProps = {
  genre: GenreCardGenre;
  className?: string;
  url?: string;
  onClick?: OnEvent;
  onKeyup?: JSX.KeyboardEventHandler<HTMLElement>;
  buttonSlot?: VNode;
  focus?: boolean;
  shadow?: boolean;
  appearance?: 'small';
};

export type GenreCardGenre = {
  id: number;
  name: string;
  category?: string;
  picture?: string;
};

export const GenreCard: FunctionalComponent<GenreCardProps> = ({
  genre: { name, category, picture },
  className: classNameProp,
  onClick,
  onKeyup,
  url,
  buttonSlot,
  focus,
  shadow,
  appearance,
}) => {
  const className = `genre-card ${classNameProp || ''} ${focus ? 'genre-card--focus' : ''} ${
    appearance ? `genre-card--${appearance}` : ''
  } ${shadow ? 'genre-card--shadow' : ''}`.trim();

  const children = (
    <Fragment>
      <Image className="genre-card__image" src={picture || logo} alt={name} placeholder={logo} />
      <span className="genre-card__name">{name}</span>
      {category && <span className="genre-card__category">{category}</span>}
      {buttonSlot ? <div className="genre-card__button-slot">{buttonSlot}</div> : null}
    </Fragment>
  );

  return url ? (
    <a
      href={url}
      onClick={onClick || (() => {})}
      onKeyUp={onKeyup || (() => {})}
      className={className}
    >
      {children}
    </a>
  ) : (
    <div
      tabIndex={0}
      role="button"
      onClick={onClick || (() => {})}
      onKeyUp={onKeyup || (() => {})}
      className={className}
    >
      {children}
    </div>
  );
};

export const GenreCardGrid: FunctionalComponent = ({ children }) => (
  <div className="genre-card-grid">{children}</div>
);

export const GenreCardList: FunctionalComponent<{ className?: string }> = ({
  children,
  className,
}) => <div className={`genre-card-list ${className || ''}`}>{children}</div>;
