import { createAppPage, useAppContext } from '@/app/page';
import { useAuthQuery } from '@/common/hooks/useQuery';
import {
  Card,
  Container,
  Grid,
  Group,
  Loader,
  Title,
  Text,
  Stack,
  ActionIcon,
  createStyles,
  UnstyledButton,
  Box,
  Tabs,
  Button,
  Divider,
  Paper,
  ScrollArea,
  Modal,
  Checkbox,
  TextInput,
  Avatar,
} from '@mantine/core';
import {
  GetEventsDocument,
  GetEventByIdDocument,
  GetActivitiesDocument,
  RemoveActionFromEventDocument,
  DeleteEventDocument,
  GetLogsForEventDocument,
} from '@/__generated__/app/documents';
import QueryRenderer from '@/common/components/query-comp';
import { IconBoxMultiple, IconPlus, IconSend, IconSettings, IconX } from '@tabler/icons';
import React, { useState } from 'react';
import { useTranslation } from '@/common/hooks/useTranslation';
import { toDate } from '@/utils/time';
import { closeAllModals, openConfirmModal, openModal } from '@mantine/modals';
import { eventClient, eventHooks } from '@/app/data/eventsRPC';
import { useInfiniteQuery, useMutation } from 'react-query';
import { useAuthMutation } from '@/common/hooks/useMutation';
import { useForm } from 'react-hook-form';
import { createFormResolver } from '@/utils/typebox-resolver';
import { eventsContract } from 'api-contracts';
import { Static } from '@sinclair/typebox';
import { showNotification } from '@mantine/notifications';
import EventLogs from '@/app/components/event-log';
import { authFetch } from '@/utils/graphqlClient';
import { RequestContext } from '@/utils/context';

const useStyles = createStyles((theme) => ({
  event_item: {
    ...theme.fn.focusStyles(),
    cursor: 'pointer',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
  eventActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

const ActionsList: React.FC<{ reqContext: RequestContext; event_id: string; onChange: () => void }> = ({
  reqContext,
  event_id,
  onChange,
}) => {
  const queryResult = useAuthQuery(reqContext, GetActivitiesDocument, {});
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const { mutate, isLoading } = useMutation(
    async (activities: Array<string>) => {
      return Promise.all(
        activities.map((activity_id) =>
          eventClient(reqContext, 'assign_activity', { type: 'mutation', input: { event_id: event_id, activity_id } })
        )
      );
    },
    {
      onSuccess: () => {
        closeAllModals();
        showNotification({
          title: 'Success',
          color: 'green',
          message: '',
        });
        onChange();
      },
    }
  );

  const onCTAClick = () => {
    if (selectedActions.length > 0) {
      mutate(selectedActions);
      return;
    }

    closeAllModals();
  };

  return (
    <QueryRenderer
      queryResult={queryResult}
      errorRender={() => <></>}
      loadingRender={() => <Loader />}
      successRender={({ data }) => (
        <>
          <ScrollArea sx={{ height: '60vh' }}>
            {data.activities.map((activity) => {
              const checked = selectedActions.some((i) => i === activity.id);
              return (
                <UnstyledButton
                  sx={{ width: '100%' }}
                  onClick={() => {
                    console.log('buttn clicked');
                    setSelectedActions((p) => (!checked ? [...p, activity.id] : p.filter((w) => w !== activity.id)));
                  }}
                  key={activity.id}
                >
                  <Paper withBorder sx={{ display: 'flex', alignItems: 'center' }} px="md" py="sm">
                    <Stack spacing={0}>
                      <Text size="lg" weight={600}>
                        {activity.name}
                      </Text>
                      <Text size="sm" color="dimmed">
                        {activity.slug}
                      </Text>
                    </Stack>
                    <Box sx={{ flex: 1 }} />
                    <Stack spacing={0} mr="xl" align="flex-end">
                      <Text>Created On</Text>
                      <Text color="dimmed">{toDate(activity.created_at, 'dd/MM/yyyy HH:mm:ss')}</Text>
                    </Stack>
                    <div>
                      <Checkbox checked={checked} onChange={() => {}} />
                    </div>
                  </Paper>
                </UnstyledButton>
              );
            })}
          </ScrollArea>
          <Button
            loading={isLoading}
            variant={selectedActions.length === 0 ? 'outline' : 'filled'}
            fullWidth
            onClick={onCTAClick}
            mt="md"
          >
            {selectedActions.length === 0 ? 'Close' : 'Attach'}
          </Button>
        </>
      )}
    />
  );
};

const PAGE_SIZE = 50;

const LogsTab: React.FC<{ event_id: string }> = ({ event_id }) => {
  const { req: auth } = useAppContext();
  const { fetchNextPage, hasNextPage, data } = useInfiniteQuery({
    queryKey: ['actions', 'logs', event_id],
    queryFn: ({ pageParam = new Date('2050-10-10').toISOString() }) =>
      authFetch(GetLogsForEventDocument, { after: pageParam, limit: PAGE_SIZE, event_id }, auth.app),
    getNextPageParam: (lastPage) => lastPage?.executions[PAGE_SIZE - 1]?.created_at ?? undefined,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <Box sx={{ height: '50vh' }}>
      <EventLogs
        fetchMore={fetchNextPage}
        has_more={!!hasNextPage}
        items={data?.pages.flatMap((m) => m.executions) ?? []}
      />
    </Box>
  );
};

const EventView: React.FC<{ event_id: string; onChanged: () => void }> = ({ event_id, onChanged }) => {
  const { req: auth } = useAppContext();
  const queryResult = useAuthQuery(auth.app, GetEventByIdDocument, { event_id: event_id });
  const { locale, t } = useTranslation();
  const { mutate: removeAction } = useAuthMutation(auth.app, RemoveActionFromEventDocument, {
    onSuccess: () => {
      queryResult.refetch();
      showNotification({
        title: 'Success',
        color: 'green',
        message: '',
      });
    },
  });

  const { mutate: editEvent, isLoading: isEdittingEvent } = eventHooks.useMutation(auth.app, 'edit', {
    onSuccess: () => {
      queryResult.refetch();
      onChanged();
      showNotification({
        title: 'Success',
        color: 'green',
        message: '',
      });
    },
  });

  const onAttachActionClick = () => {
    openModal({
      centered: true,
      title: 'Attach Action',
      children: <ActionsList reqContext={auth.app} event_id={event_id} onChange={() => queryResult.refetch()} />,
    });
  };

  const onDeleteActionClick = (props: { id: string; name: string }) => {
    openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Are you sure you want to remove <b>{props.name}</b> from this event
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => removeAction({ id: props.id }),
    });
  };

  const { mutate: deleteEvent, isLoading: isDeleting } = useAuthMutation(auth.app, DeleteEventDocument, {
    onSuccess: () => {
      onChanged();
    },
  });

  const onDelete = () => {
    openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Are you sure you want to delete <b>{queryResult.data?.event?.name}</b>. This action cannot be reverted
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteEvent({ event_id }),
    });
  };

  return (
    <Tabs defaultValue="actions">
      <Tabs.List grow>
        <Tabs.Tab p="md" value="actions" icon={<IconSend size={22} />}>
          Actions
        </Tabs.Tab>
        <Tabs.Tab p="md" value="settings" icon={<IconSettings size={22} />}>
          Settings
        </Tabs.Tab>
        <Tabs.Tab p="md" value="logs" icon={<IconBoxMultiple size={22} />}>
          Logs
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="actions" p="md">
        <QueryRenderer
          queryResult={queryResult}
          errorRender={() => <></>}
          loadingRender={() => <Loader />}
          successRender={(result) => {
            const actions = result.data.event?.event_activities ?? [];

            if (actions.length === 0) {
              return (
                <Box my="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Button onClick={onAttachActionClick}>Attach first action</Button>
                </Box>
              );
            }

            return (
              <div>
                <Group position="right" mb="lg">
                  <Button onClick={onAttachActionClick}>Attach Action</Button>
                </Group>
                <ScrollArea.Autosize mx="-xs" px="xs" maxHeight="60vh">
                  {actions.map(({ activity, id, created_at }) => (
                    <Paper px="md" withBorder key={id} mb={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }} py="sm">
                        <Stack spacing={0}>
                          <Text size="lg" weight={600}>
                            {activity.name}
                          </Text>
                          <Text size="sm" color="dimmed">
                            {activity.slug}
                          </Text>
                        </Stack>
                        <Box sx={{ flex: 1 }} />
                        <Stack spacing={0} mr="xl" align="flex-end">
                          <Text>Attached on</Text>
                          <Text color="dimmed">{toDate(created_at, 'dd/MM/yyyy HH:mm:ss', locale)}</Text>
                        </Stack>
                        <div>
                          <ActionIcon
                            onClick={() => onDeleteActionClick({ id: id, name: activity.name })}
                            color="red"
                            variant="filled"
                          >
                            <IconX />
                          </ActionIcon>
                        </div>
                      </Box>
                    </Paper>
                  ))}
                </ScrollArea.Autosize>
              </div>
            );
          }}
        />
      </Tabs.Panel>

      <Tabs.Panel value="settings" p="md">
        <QueryRenderer
          queryResult={queryResult}
          errorRender={() => <></>}
          loadingRender={() => <Loader />}
          successRender={({ data }) => (
            <>
              <EventForm
                key={event_id}
                isLoading={isEdittingEvent}
                defaultValues={{
                  name: data.event?.name ?? '',
                  slug: data.event?.slug ?? '',
                }}
                onCancel={() => {}}
                onSubmit={(data) => {
                  editEvent({ event_id, info: data });
                }}
                submitSection={
                  <Button loading={isEdittingEvent || isDeleting} type="submit" fullWidth>
                    {t('Save')}
                  </Button>
                }
              />
              <Button variant="outline" onClick={onDelete} loading={isDeleting} fullWidth color="red" mt="md">
                Delete
              </Button>
            </>
          )}
        />
      </Tabs.Panel>
      <Tabs.Panel value="logs" p="md">
        <LogsTab event_id={event_id} />
      </Tabs.Panel>
    </Tabs>
  );
};

type FormType = Static<typeof eventsContract.create.input>;

const EventForm: React.FC<{
  defaultValues: FormType;
  onCancel: () => void;
  onSubmit: (data: FormType) => void;
  isLoading: boolean;
  submitSection: React.ReactElement;
}> = ({ defaultValues, onSubmit, submitSection }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: createFormResolver(eventsContract.create.input),
  });

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <TextInput
          placeholder="User Created"
          required
          data-autofocus
          label="Name"
          {...register('name')}
          error={errors.name ? errors.name.message ?? 'Not valid' : undefined}
        />
        <TextInput
          description="Is used to identify the event and must be unique"
          placeholder="user-created"
          label="Slug"
          required
          error={errors.slug ? errors.slug.message ?? 'Not valid' : undefined}
          {...register('slug')}
        />
        {submitSection}
      </Stack>
    </form>
  );
};

const page = createAppPage({
  pageComponent: function Page() {
    const { classes, cx } = useStyles();
    const { req: auth } = useAppContext();
    const queryResult = useAuthQuery(auth.app, GetEventsDocument, {});
    const [_selectedEvent, setSelectedEvent] = useState<string>();
    const [newEventModal, setNewEventModal] = useState(false);
    const { mutate: createEvent, isLoading: isCreatingEvent } = eventHooks.useMutation(auth.app, 'create', {
      onSuccess: ({ id }) => {
        queryResult.refetch();
        setSelectedEvent(id);
        setNewEventModal(false);
      },
    });

    const { t } = useTranslation();

    const selectedEvent = queryResult.data?.events.find((e) => e.id === _selectedEvent)?.id;

    return (
      <Container fluid my="sm">
        <Modal
          size="lg"
          title={
            <Title order={3} size="h2">
              Create new event
            </Title>
          }
          centered
          opened={newEventModal}
          onClose={() => setNewEventModal(false)}
        >
          <EventForm
            isLoading={isCreatingEvent}
            onSubmit={createEvent}
            onCancel={() => setNewEventModal(false)}
            defaultValues={{ name: '', slug: '' }}
            submitSection={
              <Group position="apart" mt="xl">
                <Button loading={isCreatingEvent} onClick={() => setNewEventModal(false)} variant="outline">
                  {t('Cancel')}
                </Button>
                <Button loading={isCreatingEvent} px={50} type="submit">
                  {t('Add')}
                </Button>
              </Group>
            }
          />
        </Modal>
        <Grid>
          <Grid.Col sm={5} md={4} lg={4}>
            <Card withBorder>
              <Group position="apart" mb="lg">
                <Title order={3}>Events</Title>
                <ActionIcon onClick={() => setNewEventModal(true)} color="blue" variant="filled">
                  <IconPlus />
                </ActionIcon>
              </Group>

              <QueryRenderer
                queryResult={queryResult}
                errorRender={() => <></>}
                loadingRender={() => <Loader />}
                successRender={({ data }) => (
                  <Card.Section>
                    {data.events.map((event) => (
                      <UnstyledButton
                        key={event.id}
                        component={'div'}
                        onClick={() => setSelectedEvent(event.id)}
                        className={cx(classes.event_item, { [classes.eventActive]: event.id === selectedEvent })}
                      >
                        <Group py="sm" position="apart">
                          <Stack spacing={0}>
                            <Text size="lg" weight={600}>
                              {event.name}
                            </Text>
                            <Text size="sm" color="dimmed">
                              {event.slug}
                            </Text>
                          </Stack>
                          <Avatar size="md" radius="xl">
                            {event.event_activities.length || '0'}
                          </Avatar>
                        </Group>
                      </UnstyledButton>
                    ))}
                  </Card.Section>
                )}
              />
            </Card>
          </Grid.Col>
          <Grid.Col sm={7} md={8} lg={8}>
            <Card withBorder>
              <Card.Section>
                {selectedEvent ? (
                  <EventView event_id={selectedEvent} onChanged={() => queryResult.refetch()} />
                ) : (
                  <Box py={30}>
                    <Text align="center" weight={600} size="xl">
                      Select an event
                    </Text>
                    <Divider my="lg" labelPosition="center" label="Or" />
                    <Text align="center" weight={600} size="xl">
                      <Button onClick={() => setNewEventModal(true)}>Create Event</Button>
                    </Text>
                  </Box>
                )}
              </Card.Section>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    );
  },
});

export default page;
