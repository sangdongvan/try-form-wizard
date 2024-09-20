import React from 'react';
import * as Vaul from 'vaul';
import classNames from 'classnames';
import './drawer.css';

const DrawerTrigger = Vaul.Drawer.Trigger;
DrawerTrigger.displayName = 'Drawer.Trigger';

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof Vaul.Drawer.Content>,
  React.ComponentPropsWithoutRef<typeof Vaul.Drawer.Content>
>(({ className, children, ...props }, ref) => (
  <Vaul.Drawer.Portal>
    <Vaul.Drawer.Overlay className="rt-BaseDialogOverlay rt-DialogOverlay" />
    <Vaul.Drawer.Content
      ref={ref}
      className={classNames('DrawerContent', className)}
      {...props}
    >
      <div className="absolute left-1/2 top-3 h-2 w-[100px] translate-x-[-50%] rounded-full bg-muted" />
      {children}
    </Vaul.Drawer.Content>
  </Vaul.Drawer.Portal>
));
DrawerContent.displayName = 'Drawer.Content';

const DrawerRoot = Vaul.Drawer.Root;

export {
  DrawerRoot as Root,
  DrawerTrigger as Trigger,
  DrawerContent as Content,
};
