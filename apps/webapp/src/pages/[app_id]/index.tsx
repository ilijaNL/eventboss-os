import { createAppPage, useAppContext } from '@/app/page';
import QueryRenderer from '@/common/components/query-comp';
import { useAuthQuery } from '@/common/hooks/useQuery';
import { useTranslation } from '@/common/hooks/useTranslation';
import { toDate } from '@/utils/time';
import { GetActionLogsDocument, GetEventLogsDocument } from '@/__generated__/app/documents';
import { Card, Container, Grid, Loader, ScrollArea, Table, Text, Stack, Title, Group, ActionIcon } from '@mantine/core';
import { IconCircleCheck, IconEye, IconRepeat, IconSend } from '@tabler/icons';

const farInFuture = new Date();
farInFuture.setFullYear(2050);

const LatestEventsTable: React.FC = () => {
  const { req: auth } = useAppContext();
  const { locale } = useTranslation();
  const queryResult = useAuthQuery(auth.app, GetEventLogsDocument, { after: farInFuture.toISOString(), limit: 8 });

  return (
    <QueryRenderer
      errorRender={() => <></>}
      loadingRender={() => <Loader />}
      queryResult={queryResult}
      successRender={({ data }) => (
        <ScrollArea>
          <Table verticalSpacing="xs" striped>
            <thead>
              <tr>
                <th>Event</th>
                <th>Created on</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.app_event_logs.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Stack spacing={0}>
                      <Text weight={500}>{item.event?.name}</Text>
                      <Text color="dimmed" weight={500}>
                        {item.event?.slug}
                      </Text>
                    </Stack>
                  </td>
                  <td>
                    <Text size="sm">{toDate(item.created_at, 'dd/MM/yyyy HH:mm:ss', locale)}</Text>
                  </td>
                  <td>
                    <IconCircleCheck color="green" />
                  </td>
                  <td>
                    <Group spacing="xs" position="center">
                      <ActionIcon title="clone" variant="outline">
                        <IconSend size={16} stroke={1.5} />
                      </ActionIcon>
                      <ActionIcon title="inspect" variant="outline">
                        <IconEye size={16} stroke={1.5} />
                      </ActionIcon>
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      )}
    />
  );
};

const LatestActionLogs: React.FC = () => {
  const { req: auth } = useAppContext();
  const { locale } = useTranslation();
  const queryResult = useAuthQuery(auth.app, GetActionLogsDocument, { after: farInFuture.toISOString(), limit: 8 });

  return (
    <QueryRenderer
      errorRender={() => <></>}
      loadingRender={() => <Loader />}
      queryResult={queryResult}
      successRender={({ data }) => (
        <ScrollArea>
          <Table verticalSpacing="xs" striped>
            <thead>
              <tr>
                <th>Action</th>
                <th>Type</th>
                <th>Created on</th>
                <th>Triggered by Event</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.app_action_logs.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Stack spacing={0}>
                      <Text weight={500}>{item.action?.name ?? 'Action is deleted'}</Text>
                      <Text color="dimmed" weight={500}>
                        {item.action?.slug ?? 'deleted'}
                      </Text>
                    </Stack>
                  </td>
                  <td>
                    <Text size="sm">{item.action?.type ?? '-'}</Text>
                  </td>
                  <td>
                    <Text size="sm">{toDate(item.created_at, 'dd/MM/yyyy HH:mm:ss', locale)}</Text>
                  </td>
                  <td>
                    <Stack spacing={0}>
                      <Text size="sm" weight={500}>
                        {item?.event?.name}
                      </Text>
                      <Text color="dimmed" weight={500}>
                        {item?.event?.slug}
                      </Text>
                    </Stack>
                  </td>
                  <td>{item.job?.state}</td>
                  <td>
                    <Group spacing="xs" position="center">
                      <ActionIcon title="retry" variant="outline">
                        <IconRepeat size={16} stroke={1.5} />
                      </ActionIcon>
                      <ActionIcon title="inspect" variant="outline">
                        <IconEye size={16} stroke={1.5} />
                      </ActionIcon>
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      )}
    />
  );
};

const page = createAppPage({
  pageComponent: function Page() {
    return (
      <Container fluid p="md">
        <Grid grow>
          <Grid.Col span={6}>
            <Card>
              <Title order={3} mb="md">
                Failed Actions
              </Title>
              {/* <Card.Section>
                <FailedActions />
              </Card.Section> */}
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card>
              <Title order={3} mb="md">
                Scheduled Actions
              </Title>
              {/* <Card.Section>
                <ActiveActions />
              </Card.Section> */}
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card>
              <Title order={3} mb="md">
                Latest Events
              </Title>
              <Card.Section>
                <LatestEventsTable />
              </Card.Section>
            </Card>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card>
              <Title order={3} mb="md">
                Latest Actions
              </Title>
              <Card.Section>
                <LatestActionLogs />
              </Card.Section>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    );
  },
});

export default page;
