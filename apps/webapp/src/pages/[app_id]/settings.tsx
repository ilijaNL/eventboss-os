import { createAppPage, useAppContext } from '@/app/page';
import QueryRenderer from '@/common/components/query-comp';
import { useAuthMutation } from '@/common/hooks/useMutation';
import { useAuthQuery } from '@/common/hooks/useQuery';
import { GetEnvironmentsDocument, DeleteEnvDocument } from '@/__generated__/app/documents';
import {
  ActionIcon,
  Button,
  Card,
  Container,
  Group,
  Loader,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { appSettings } from 'api-contracts';
import { createFormResolver } from '@/utils/typebox-resolver';
import { appHooks } from '@/app/data/appRPC';

const NewEnvForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: createFormResolver(appSettings.add_env.input),
    defaultValues: {
      key: '',
      value: '',
    },
  });
  const { req: auth } = useAppContext();

  const { mutate, isLoading } = appHooks.useMutation(auth.app, 'add_env', {
    onSuccess: () => {
      onSuccess();
    },
  });

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit((d) => mutate(d))}>
      <Stack>
        <TextInput
          error={errors.key?.message}
          description={'If the key already exists, the value will be overwritten'}
          required
          {...register('key')}
          label="Key"
          placeholder="x-header-secret"
        />
        <TextInput error={errors.value?.message} required {...register('value')} label="Value" placeholder="secret" />

        <Button loading={isLoading} type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

const EnvSettings: React.FC<{}> = () => {
  const { req: auth } = useAppContext();
  const queryResult = useAuthQuery(
    auth.app,
    GetEnvironmentsDocument,
    {},
    {
      select(data) {
        return data.envs;
      },
    }
  );
  const [newEnvModal, setNewEnvModal] = useState(false);
  const { mutate, isLoading: isDeleting } = useAuthMutation(auth.app, DeleteEnvDocument, {
    onSuccess: () => {
      queryResult.refetch();
      showNotification({
        title: 'Success',
        color: 'green',
        message: '',
      });
    },
  });

  const onDelete = (props: { env_key: string; env_id: string }) => {
    openConfirmModal({
      title: 'Please confirm your action',
      children: (
        <Text size="sm">
          Are you sure you want to delete <b>{props.env_key}</b>? This action cannot not be reverted.
        </Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => mutate({ env_id: props.env_id }),
    });
  };

  return (
    <>
      <Modal
        size="lg"
        title={
          <Title order={3} size="h2">
            Add new environment
          </Title>
        }
        centered
        opened={newEnvModal}
        onClose={() => setNewEnvModal(false)}
      >
        <NewEnvForm
          onSuccess={() => {
            queryResult.refetch();
            setNewEnvModal(false);
            showNotification({
              title: 'Success',
              color: 'green',
              message: '',
            });
          }}
        />
        <Button size="sm" fullWidth mt="sm" onClick={() => setNewEnvModal(false)} variant="outline">
          Cancel
        </Button>
      </Modal>
      <QueryRenderer
        queryResult={queryResult}
        loadingRender={() => <Loader />}
        errorRender={() => <></>}
        successRender={({ data }) => (
          <>
            <Group position="apart" mb="md">
              <Title order={2}>Environment Variables</Title>
              <Button onClick={() => setNewEnvModal(true)}>Add</Button>
            </Group>
            {data.map((env) => (
              <Paper key={env.id} withBorder p="lg" mb={4}>
                <Group position="apart">
                  <Text weight="bold">{env.key}</Text>
                  <Group>
                    <Text>{env.preview}********</Text>
                    <ActionIcon
                      loading={isDeleting}
                      onClick={() => onDelete({ env_id: env.id, env_key: env.key })}
                      variant="outline"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Group>
              </Paper>
            ))}
          </>
        )}
      />
    </>
  );
};

const page = createAppPage({
  pageComponent: function Page() {
    return (
      <Container size="md" py="lg">
        <Card withBorder>
          <EnvSettings />
        </Card>
      </Container>
    );
  },
});

export default page;
