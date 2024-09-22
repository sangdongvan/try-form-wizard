import { GetPropDefTypes, PropDef } from '@radix-ui/themes/props';

const contentSizes = ['1', '2', '3', '4'] as const;

const drawerContentPropDefs = {
  size: {
    type: 'enum',
    className: 'rt-r-size',
    values: contentSizes,
    default: '3',
  },
} satisfies {
  size: PropDef<(typeof contentSizes)[number]>;
};

type DrawerContentOwnProps = GetPropDefTypes<typeof drawerContentPropDefs>;

export { drawerContentPropDefs };
export type { DrawerContentOwnProps };
