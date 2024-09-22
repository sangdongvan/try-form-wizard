import { GetPropDefTypes, PropDef } from '@radix-ui/themes/props';

const contentSizes = ['1', '2', '3'] as const;

const drawerContentPropDefs = {
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: contentSizes,
    default: '2',
  },
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
};

type DrawerContentOwnProps = GetPropDefTypes<typeof drawerContentPropDefs>;

export { drawerContentPropDefs };
export type { DrawerContentOwnProps };
