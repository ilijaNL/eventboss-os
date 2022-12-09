import { createAppPage, useAppContext } from '@/app/page';
import { authFetch } from '@/utils/graphqlClient';
import { GetActivityLogsDocument } from '@/__generated__/app/documents';
import { Container, Paper } from '@mantine/core';
import { useInfiniteQuery } from 'react-query';
import ActionLogs from '@/app/components/action-log';

const PAGE_SIZE = 50;

const page = createAppPage({
  pageComponent: function Page() {
    const { req: auth } = useAppContext();

    const { fetchNextPage, hasNextPage, data } = useInfiniteQuery({
      queryKey: ['actions', 'logs'],
      queryFn: ({ pageParam = new Date('2050-10-10').toISOString() }) =>
        authFetch(GetActivityLogsDocument, { after: pageParam, limit: PAGE_SIZE }, auth.app),
      getNextPageParam: (lastPage) => lastPage?.logs[PAGE_SIZE - 1]?.created_at ?? undefined,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });

    return (
      <Container size="xl" sx={{ height: '100%' }} py="md">
        <Paper withBorder sx={{ height: '100%' }}>
          <ActionLogs
            fetchMore={fetchNextPage}
            has_more={!!hasNextPage}
            items={data?.pages.flatMap((p) => p.logs) ?? []}
          />
        </Paper>
      </Container>
    );
  },
});

export default page;
