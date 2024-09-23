import classNames from 'classnames';
import React from 'react';

interface StepTransitionProps {
  direction: 'forward' | 'backward' | undefined;
  isActive: boolean;
}

function StepTransition({
  direction,
  isActive,
  children,
}: React.PropsWithChildren<StepTransitionProps>) {
  const baseClasses =
    'transition-all motion-reduce:transition-none duration-300 ease-in-out flex-shrink-0';

  const activeClasses = isActive
    ? 'opacity-100 translate-x-0 h-full'
    : 'opacity-0 pointer-events-none absolute';

  const directionClasses = isActive
    ? ''
    : direction === 'forward'
      ? '-translate-x-full'
      : 'translate-x-full';

  const className = classNames(baseClasses, activeClasses, directionClasses);

  return <div className={className}>{children}</div>;
}

export { StepTransition };
