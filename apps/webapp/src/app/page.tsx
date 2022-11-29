import Loading from '@/app/loading';
import { routes } from '@/routes';
import Router, { useRouter } from 'next/router';
import { createContext, PropsWithChildren, useContext } from 'react';
import { TPage, TPageProps } from '@/common/wrapper';
import { useAuthQuery } from '@/common/hooks/useQuery';
import { createAuthPage } from '@/common/page';
import QueryRenderer from '@/common/components/query-comp';
import { useMemo } from 'react';
import { NextSeo } from 'next-seo';
import { createAppPageLayout } from './layout';
import { AppReqContext } from '@/utils/context';
import { GetAppDocument, GetAppQuery } from '@/__generated__/admin/documents';

type AppContext = {
  app_id: string;
  req: {
    app: AppReqContext;
  };
};

const _AppContext = createContext<AppContext | null>(null);

export const useAppContext = () => {
  const context = useContext(_AppContext);
  if (!context) {
    throw new Error('not inside AppContext');
  }

  return context;
};

const InternalAppPage: React.FC<PropsWithChildren<{ data: NonNullable<GetAppQuery['app_apps_by_pk']> }>> = ({
  data,
  children,
}) => {
  return (
    <>
      <NextSeo title={data.name} />
      <_AppContext.Provider
        value={useMemo<AppContext>(
          () => ({
            req: {
              app: {
                role: 'app',
                app_id: data.id,
              },
            },
            app_id: data.id,
          }),
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [data]
        )}
      >
        {children}
      </_AppContext.Provider>
    </>
  );
};

const AppPage: React.FC<PropsWithChildren> = (props) => {
  const { query } = useRouter();
  const app_id = query.app_id as string;

  const queryResult = useAuthQuery(
    { role: 'admin' },
    GetAppDocument,
    { app_id },
    {
      enabled: !!app_id,
      select: (data) => data.app_apps_by_pk,
      onError: () => {
        Router.replace(routes.home);
      },
      onSuccess(data) {
        if (!data) {
          return Router.replace('/404');
        }
      },
    }
  );

  return (
    <QueryRenderer
      queryResult={queryResult}
      errorRender={() => <></>}
      loadingRender={() => <Loading />}
      successRender={({ data }) => (!data ? <></> : <InternalAppPage data={data}>{props.children}</InternalAppPage>)}
    />
  );
};

export const createAppPage = <TProps,>({ pageComponent, layout = createAppPageLayout }: TPageProps<TProps>): TPage => {
  const Comp = createAuthPage({
    pageComponent: pageComponent,
    layout: (props) => props.children,
  });
  const getWrapperFn = Comp.getWrapper;

  Comp.getWrapper = (children) => getWrapperFn(<AppPage>{layout({ children })}</AppPage>);

  return Comp;
};
