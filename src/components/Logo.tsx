import { Icon } from './Icon';

export function Logo() {
  return (
    <a className="logo" href="#home" aria-label="PureSolar home">
      <span className="logo__leaf" aria-hidden>
        <Icon name="leaf" size={24} />
      </span>
      <span>
        Pure<b>Solar</b>
      </span>
    </a>
  );
}
