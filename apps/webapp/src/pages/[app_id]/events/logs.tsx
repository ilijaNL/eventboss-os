import { createAppPage, useAppContext } from '@/app/page';
import { authFetch } from '@/utils/graphqlClient';
import { GetEventLogsDocument } from '@/__generated__/app/documents';
import { Container, Paper } from '@mantine/core';
import { useInfiniteQuery } from 'react-query';

import EventLogs from '@/app/components/event-log';
const PAGE_SIZE = 50;

const page = createAppPage({
  pageComponent: function Page() {
    const { req: auth } = useAppContext();

    const { fetchNextPage, hasNextPage, data } = useInfiniteQuery({
      queryKey: ['event', 'logs'],
      queryFn: ({ pageParam = new Date('2050-10-10').toISOString() }) =>
        authFetch(GetEventLogsDocument, { after: pageParam, limit: PAGE_SIZE }, auth.app),
      getNextPageParam: (lastPage) => lastPage?.app_event_logs[PAGE_SIZE - 1]?.created_at ?? undefined,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    });

    return (
      <Container size="xl" sx={{ height: '100%' }} py="md">
        <Paper withBorder sx={{ height: '100%' }}>
          <EventLogs
            items={data?.pages.flatMap((p) => p.app_event_logs) ?? []}
            fetchMore={fetchNextPage}
            has_more={!!hasNextPage}
          />
        </Paper>
      </Container>
    );
  },
});

export default page;
