import React from 'react';
import * as Vaul from 'vaul';
import classNames from 'classnames';
import './drawer.css';
import { Dialog, ScrollArea, Theme } from '@radix-ui/themes';
import * as RtHelpers from '@radix-ui/themes/helpers';
import {
  DrawerContentOwnProps,
  drawerContentPropDefs,
} from './drawer.props.ts';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const DrawerTrigger = Vaul.Drawer.Trigger;
DrawerTrigger.displayName = 'Drawer.Trigger';

type DrawerContentElement = React.ElementRef<typeof Vaul.Drawer.Content>;

interface DrawerContentProps
  extends RtHelpers.ComponentPropsWithout<
      typeof Vaul.Drawer.Content,
      RtHelpers.RemovedProps
    >,
    DrawerContentOwnProps {
  container?: React.ComponentPropsWithoutRef<
    typeof Vaul.Drawer.Portal
  >['container'];
}

const DrawerContent = React.forwardRef<
  DrawerContentElement,
  DrawerContentProps
>((props, forwardedRef) => {
  const { className, children, ...contentProps } = RtHelpers.extractProps(
    props,
    drawerContentPropDefs,
  );

  return (
    <Vaul.Drawer.Portal>
      <Vaul.Drawer.Overlay className="DrawerOverlay" />
      <Theme asChild>
        <Vaul.Drawer.Content
          ref={forwardedRef}
          className={classNames('DrawerContent', className)}
          {...contentProps}
        >
          <ScrollArea>
            <div className="DrawerContentInner">{children}</div>
          </ScrollArea>
        </Vaul.Drawer.Content>
      </Theme>
    </Vaul.Drawer.Portal>
  );
});
DrawerContent.displayName = 'Drawer.Content';

const DrawerRoot = (
  props: React.ComponentPropsWithoutRef<typeof Vaul.Drawer.Root>,
) => {
  const defaultProps: Vaul.DialogProps = {
    shouldScaleBackground: false,
    noBodyStyles: true,
  };
  const mergeProps = { ...defaultProps, ...props };
  return <Vaul.Drawer.Root {...mergeProps} />;
};
DrawerRoot.displayName = 'Drawer.Root';

type DrawerTitleElement = React.ElementRef<typeof DialogPrimitive.Title>;
type DrawerTitleProps = RtHelpers.ComponentPropsWithout<
  typeof DialogPrimitive.Title,
  'asChild'
>;
const DrawerTitle = React.forwardRef<DrawerTitleElement, DrawerTitleProps>(
  (props, forwardedRef) => (
    <DialogPrimitive.Title {...props} asChild ref={forwardedRef} />
  ),
);
DrawerTitle.displayName = 'Drawer.Title';

export {
  DrawerRoot as Root,
  DrawerTrigger as Trigger,
  DrawerContent as Content,
  DrawerTitle as Title,
};
