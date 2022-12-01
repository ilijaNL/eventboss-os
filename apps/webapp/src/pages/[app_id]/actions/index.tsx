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
  TextInput,
  Select,
  NumberInput,
  Checkbox,
  Autocomplete,
  AutocompleteProps,
} from '@mantine/core';
import {
  GetActionsDocument,
  RemoveActionFromEventDocument,
  GetActionByIdDocument,
  GetLogsForActionDocument,
  DeleteActionDocument,
  GetEnvironmentsDocument,
} from '@/__generated__/app/documents';
import QueryRenderer from '@/common/components/query-comp';
import { IconBoxMultiple, IconPlus, IconSend, IconSettings, IconTrash, IconX } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/common/hooks/useTranslation';
import { toDate } from '@/utils/time';
import { openConfirmModal } from '@mantine/modals';
import { useAuthMutation } from '@/common/hooks/useMutation';
import { showNotification } from '@mantine/notifications';
import { Controller, useForm } from 'react-hook-form';
import { Static } from '@sinclair/typebox';
import { ActionInfo } from 'api-contracts';
import { createFormResolver } from '@/utils/typebox-resolver';
import { match } from 'ts-pattern';
import { actionHooks } from '@/app/data/actionsRPC';
import { useInfiniteQuery } from 'react-query';
import { authFetch } from '@/utils/graphqlClient';
import ActionLogs from '@/app/components/action-log';

type FormType = Static<typeof ActionInfo>;

const InputWithEnvs: React.FC<Omit<AutocompleteProps, 'data'> & React.RefAttributes<HTMLInputElement>> = (props) => {
  const { req: auth } = useAppContext();
  const { data, isLoading: isLoadingEnvs } = useAuthQuery(
    auth.app,
    GetEnvironmentsDocument,
    {},
    {
      select: (d) => d.envs,
      staleTime: 10000, // in seconds
    }
  );

  return (
    <Autocomplete
      data={(data ?? []).map((d) => `{{${d.key}}}`)}
      rightSection={isLoadingEnvs ? <Loader size={16} /> : null}
      {...props}
    />
  );
};

const HeadersField: React.FC<{
  initialValue: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
}> = ({ initialValue, onChange: _onChange }) => {
  const [headerState, onChange] = useState<Array<[string, string]>>(Object.entries(initialValue ?? {}));

  useEffect(() => {
    // sync state
    _onChange(
      headerState.reduce((agg, curr) => {
        // only when key & value is specified
        if (curr[0] && curr[1]) {
          agg[curr[0]] = curr[1];
        }
        return agg;
      }, {} as Record<string, string>)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerState]);

  return (
    <Stack spacing={3} mx="md">
      {headerState.map((item, index) => {
        return (
          <Group key={index}>
            <TextInput
              sx={{ flex: 1 }}
              size="sm"
              value={item[0]}
              label={index === 0 ? 'Header Key' : undefined}
              maxLength={128}
              onChange={(event) => {
                const value = event.currentTarget.value;
                onChange((currentState) => {
                  const clone = [...currentState];
                  clone[index]![0]! = value;

                  return clone;
                });
              }}
            />
            <InputWithEnvs
              sx={{ flex: 1 }}
              size="sm"
              maxLength={256}
              label={index === 0 ? 'Header Value' : undefined}
              value={item[1]}
              onChange={(value) => {
                onChange((currentState) => {
                  const clone = [...currentState];
                  clone[index]![1]! = value;
                  return clone;
                });
              }}
            />
            <ActionIcon
              sx={{ alignSelf: 'flex-end' }}
              mb={4}
              onClick={() => {
                onChange(headerState.filter((_, idx) => idx !== index));
              }}
              variant="default"
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        );
      })}
      <Button mt="xs" size="sm" variant="outline" onClick={() => onChange([...headerState, ['', '']])}>
        Add header
      </Button>
    </Stack>
  );
};

const ActionForm: React.FC<{
  defaultValues: FormType;
  onSubmit: (data: FormType) => void;
  submitSection: React.ReactElement;
}> = ({ defaultValues, onSubmit, submitSection }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: createFormResolver(ActionInfo),
  });

  const actionType = watch('config.type');

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit(onSubmit, (errors) => {
        console.log({ errors });
      })}
    >
      <Stack>
        <TextInput
          placeholder="Send Welcome Email"
          required
          data-autofocus
          label="Name"
          {...register('name')}
          error={errors.name ? errors.name.message ?? 'Not valid' : undefined}
        />
        <TextInput
          description="Is used to identify the action and must be unique"
          placeholder="send-welcome-email"
          label="Slug"
          required
          error={errors.slug ? errors.slug.message ?? 'Not valid' : undefined}
          {...register('slug')}
        />
        <Controller
          control={control}
          name="config.type"
          render={({ field }) => (
            <Select
              label="Action Type"
              placeholder="Pick one"
              value={field.value}
              onBlur={field.onBlur}
              onChange={(v) => field.onChange(v)}
              ref={field.ref}
              data={[
                { value: 'webhook', label: 'Webhook' },
                { value: 'test', label: 'Dummy' },
              ]}
            />
          )}
        />
        {match(actionType)
          .with('webhook', () => (
            <>
              <Controller
                control={control}
                shouldUnregister
                name="config.config.endpoint"
                render={({ field: { onChange, ...field }, fieldState }) => (
                  <InputWithEnvs
                    {...field}
                    placeholder="https://myserver.com/webhook"
                    required
                    label="Webhook Endpoint"
                    onChange={(value) => {
                      onChange(value);
                    }}
                    error={fieldState.error ? 'Not valid' : undefined}
                  />
                )}
              />

              <Controller
                control={control}
                name="config.config.headers"
                shouldUnregister
                render={({ field: { onChange, value } }) => <HeadersField initialValue={value} onChange={onChange} />}
              />
            </>
          ))
          .with('test', () => <input hidden {...register('config.config', { shouldUnregister: true })}></input>)
          .exhaustive()}
        <Grid grow align="center">
          <Grid.Col span={4}>
            <Controller
              control={control}
              name="retry_limit"
              render={({ field: { onChange, ...rest } }) => (
                <NumberInput
                  defaultValue={18}
                  {...rest}
                  onChange={(v) => onChange(v)}
                  label="Retry Limit (sec)"
                  withAsterisk
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Controller
              control={control}
              name="retry_delay"
              render={({ field: { onChange, ...rest } }) => (
                <NumberInput
                  defaultValue={18}
                  {...rest}
                  onChange={(v) => onChange(v)}
                  label="Retry Delay (sec)"
                  withAsterisk
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={4} sx={{ alignSelf: 'flex-end' }}>
            <Controller
              control={control}
              name="retry_backoff"
              render={({ field: { onChange, value, ...rest } }) => (
                <Checkbox
                  {...rest}
                  checked={value}
                  px="lg"
                  onChange={(event) => onChange(event.currentTarget.checked)}
                  label="Retry Backoff"
                />
              )}
            />
          </Grid.Col>
        </Grid>
        {submitSection}
      </Stack>
    </form>
  );
};

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

const PAGE_SIZE = 50;

const LogsTab: React.FC<{ action_id: string }> = ({ action_id }) => {
  const { req: auth } = useAppContext();
  const { fetchNextPage, hasNextPage, data } = useInfiniteQuery({
    queryKey: ['actions', 'logs', action_id],
    queryFn: ({ pageParam = new Date('2050-10-10').toISOString() }) =>
      authFetch(GetLogsForActionDocument, { after: pageParam, limit: PAGE_SIZE, action_id }, auth.app),
    getNextPageParam: (lastPage) => lastPage?.app_action_logs[PAGE_SIZE - 1]?.created_at ?? undefined,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <Box sx={{ height: '50vh' }}>
      <ActionLogs
        fetchMore={fetchNextPage}
        has_more={!!hasNextPage}
        items={data?.pages.flatMap((m) => m.app_action_logs) ?? []}
      />
    </Box>
  );
};

const ActionView: React.FC<{ action_id: string; onChange: () => void }> = ({ action_id, onChange }) => {
  const { req: auth } = useAppContext();
  const queryResult = useAuthQuery(auth.app, GetActionByIdDocument, { action_id });
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

  const { mutate: editAction, isLoading: isEditing } = actionHooks.useMutation(auth.app, 'edit', {
    onSuccess: () => {
      queryResult.refetch();
      onChange();
      showNotification({
        title: 'Success',
        color: 'green',
        message: '',
      });
    },
  });

  const { mutate: deleteAction, isLoading: isDeleting } = useAuthMutation(auth.app, DeleteActionDocument, {
    onSuccess: () => {
      onChange();
    },
  });

  const onDetachFromEvent = (props: { event_id: string; event_name: string }) => {
    openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Are you sure you want to remove <b>{queryResult.data?.app_actions_by_pk?.name}</b> from{' '}
          <b>{props.event_name}</b> event?
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => removeAction({ id: props.event_id }),
    });
  };

  const onDelete = () => {
    openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Are you sure you want to delete <b>{queryResult.data?.app_actions_by_pk?.name}</b>. This will remove the
          action from all events. This cannot not be reverted.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteAction({ action_id }),
    });
  };

  return (
    <Tabs defaultValue="settings">
      <Tabs.List grow>
        <Tabs.Tab p="md" value="settings" icon={<IconSettings size={22} />}>
          Settings
        </Tabs.Tab>
        <Tabs.Tab p="md" value="events" icon={<IconSend size={22} />}>
          Events
        </Tabs.Tab>
        <Tabs.Tab p="md" value="logs" icon={<IconBoxMultiple size={22} />}>
          Logs
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="events" p="md">
        <QueryRenderer
          queryResult={queryResult}
          errorRender={() => <></>}
          loadingRender={() => <Loader />}
          successRender={(result) => {
            const events = result.data.app_actions_by_pk?.event_actions ?? [];

            if (events.length === 0) {
              return (
                <Box my="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Text>This action is not attached to any events</Text>
                </Box>
              );
            }

            return (
              <div>
                <ScrollArea.Autosize mx="-xs" px="xs" maxHeight="60vh">
                  {events.map(({ event, id, created_at }) => (
                    <Paper px="md" withBorder key={id} mb={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }} py="sm">
                        <Stack spacing={0}>
                          <Text size="lg" weight={600}>
                            {event.name}
                          </Text>
                          <Text size="sm" color="dimmed">
                            {event.slug}
                          </Text>
                        </Stack>
                        <Box sx={{ flex: 1 }} />
                        <Stack spacing={0} mr="xl" align="flex-end">
                          <Text>Attached on</Text>
                          <Text color="dimmed">{toDate(created_at, 'dd/MM/yyyy HH:mm:ss', locale)}</Text>
                        </Stack>
                        <div>
                          <ActionIcon
                            onClick={() => onDetachFromEvent({ event_id: id, event_name: event.name })}
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
          successRender={({ data: { app_actions_by_pk: action } }) => (
            <>
              {!action ? null : (
                <Stack px="md" spacing="sm">
                  <ActionForm
                    // remount from on action change
                    key={action.id}
                    defaultValues={{
                      name: action.name,
                      slug: action.slug,
                      config: {
                        type: action.type as any,
                        config: action.type_configuration,
                      },
                      retry_backoff: action.retry_backoff,
                      retry_delay: action.retry_delay,
                      retry_limit: action.retry_limit,
                      run_after: action.run_after,
                    }}
                    onSubmit={(d) => editAction({ action_id: action.id, info: d })}
                    submitSection={
                      <Button loading={isEditing || isDeleting} type="submit" fullWidth>
                        {t('Save')}
                      </Button>
                    }
                  />
                  <Button loading={isDeleting} color="red" fullWidth size="sm" variant="outline" onClick={onDelete}>
                    Delete
                  </Button>
                </Stack>
              )}
            </>
          )}
        />
      </Tabs.Panel>
      <Tabs.Panel value="logs" p="md">
        <LogsTab action_id={action_id} />
      </Tabs.Panel>
    </Tabs>
  );
};

const page = createAppPage({
  pageComponent: function Page() {
    const { classes, cx } = useStyles();
    const { req: auth } = useAppContext();
    const queryResult = useAuthQuery(auth.app, GetActionsDocument, {});
    const [_selectedAction, setSelectedAction] = useState<string>();
    const [newActionModal, setNewActionModal] = useState(false);
    const { t } = useTranslation();
    const { mutate, isLoading: isCreatingAction } = actionHooks.useMutation(auth.app, 'create', {
      onSuccess: (data) => {
        queryResult.refetch();
        showNotification({
          title: 'Success',
          color: 'green',
          message: '',
        });
        setSelectedAction(data.id);
        setNewActionModal(false);
      },
    });

    // only show when the action exists
    const selectedAction = queryResult.data?.actions.find((i) => i.id === _selectedAction)?.id;

    return (
      <Container fluid my="sm">
        <Modal
          size="xl"
          title={
            <Title order={3} size="h2">
              Create New Action
            </Title>
          }
          centered
          opened={newActionModal}
          onClose={() => setNewActionModal(false)}
        >
          <ActionForm
            onSubmit={mutate}
            defaultValues={{
              name: '',
              slug: '',
              config: { type: 'webhook', config: { endpoint: '', headers: {} } },
              retry_backoff: false,
              retry_delay: 10,
              retry_limit: 3,
              run_after: 0,
            }}
            submitSection={
              <Group position="apart" mt="xl">
                <Button loading={isCreatingAction} onClick={() => setNewActionModal(false)} variant="outline">
                  {t('Cancel')}
                </Button>
                <Button loading={isCreatingAction} px={50} type="submit">
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
                <Title order={3}>Actions</Title>
                <ActionIcon onClick={() => setNewActionModal(true)} color="blue" variant="filled">
                  <IconPlus />
                </ActionIcon>
              </Group>

              <QueryRenderer
                queryResult={queryResult}
                errorRender={() => <></>}
                loadingRender={() => <Loader />}
                successRender={({ data }) => (
                  <Card.Section>
                    {data.actions.map((action) => (
                      <UnstyledButton
                        key={action.id}
                        component={'div'}
                        onClick={() => setSelectedAction(action.id)}
                        className={cx(classes.event_item, { [classes.eventActive]: action.id === selectedAction })}
                      >
                        <Group py="sm" position="apart">
                          <Stack spacing={0}>
                            <Text size="lg" weight={600}>
                              {action.name}
                            </Text>
                            <Text size="sm" color="dimmed">
                              {action.slug}
                            </Text>
                          </Stack>
                          <Box sx={{ flex: 1 }} />
                          <Text>{action.type}</Text>
                        </Group>
                      </UnstyledButton>
                    ))}
                  </Card.Section>
                )}
              />
            </Card>
          </Grid.Col>
          <Grid.Col sm={7} md={7} lg={8}>
            <Card withBorder>
              <Card.Section>
                {selectedAction ? (
                  <ActionView action_id={selectedAction} onChange={() => queryResult.refetch()} />
                ) : (
                  <Box py={30}>
                    <Text align="center" weight={600} size="xl">
                      Select an action
                    </Text>
                    <Divider my="lg" labelPosition="center" label="Or" />
                    <Text align="center" weight={600} size="xl">
                      <Button onClick={() => setNewActionModal(true)}>Create Action</Button>
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
