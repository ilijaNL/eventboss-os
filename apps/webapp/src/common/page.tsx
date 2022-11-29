import { createPageLayout } from './layout';
import { createWrapper, TPage, TPageProps } from './wrapper';

export const createPage = <TProps,>({ pageComponent, layout = createPageLayout }: TPageProps<TProps>): TPage => {
  const Comp = createWrapper({ pageComponent: pageComponent, layout: layout });
  return Comp;
};

export const createAuthPage = <TProps,>({ pageComponent, layout = createPageLayout }: TPageProps<TProps>): TPage => {
  const Comp = createWrapper({ pageComponent: pageComponent });
  const getWrapperFn = Comp.getWrapper;

  Comp.getWrapper = (children) => getWrapperFn(<>{layout({ children })}</>);

  return Comp;
};
