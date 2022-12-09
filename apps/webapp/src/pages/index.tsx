import { systemContract } from 'api-contracts';
import Loading from '@/app/loading';
import QueryRenderer from '@/common/components/query-comp';
import { useAuthQuery } from '@/common/hooks/useQuery';
import { useTranslation } from '@/common/hooks/useTranslation';
import { createAuthPage } from '@/common/page';
import { systemClient } from '@/common/systemRPC';
import { createFormResolver } from '@/utils/typebox-resolver';
import { GetAppsDocument } from '@/__generated__/admin/documents';
import { Box, Button, Card, Container, Text, SimpleGrid, Stack, Title, Modal, TextInput } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const CreateAppForm: React.FC = () => {
  const { mutate, isLoading } = useMutation(
    (props: { name: string }) => systemClient('create_app', { type: 'mutation', input: { name: props.name } }),
    {
      onSuccess: (d) => {
        Router.push(`/${d.id}`);
      },
    }
  );
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: createFormResolver(systemContract.create_app.input),
  });
  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit((d) => mutate(d))}>
      <Stack>
        <TextInput
          {...register('name')}
          size="lg"
          label="App name"
          placeholder="My new app"
          error={errors.name ? errors.name.message ?? 'invalid name' : undefined}
        />
        <Button loading={isLoading}>Create</Button>
      </Stack>
    </form>
  );
};

const page = createAuthPage({
  pageComponent: function AccountSettingsPage() {
    const queryResult = useAuthQuery({ role: 'admin' }, GetAppsDocument, {});
    const { t } = useTranslation();

    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
      <Container py="lg">
        <Modal
          centered
          size="md"
          opened={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Create new app"
        >
          <CreateAppForm />
        </Modal>
        <QueryRenderer
          queryResult={queryResult}
          errorRender={() => <></>}
          loadingRender={() => <Loading />}
          successRender={({ data }) => (
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 600, cols: 1, spacing: 'sm' }]}>
              <Card withBorder radius="md">
                <Stack align="center" sx={{ height: 220 }} justify="center">
                  <IconPlus size={48} />
                  <Button onClick={() => setShowCreateModal(true)} mt={20}>
                    Create New App
                  </Button>
                </Stack>
              </Card>
              {data.apps.map((app) => (
                <Card withBorder radius="md" key={app.id}>
                  <Stack sx={{ minHeight: 220 }}>
                    <Title size={38} order={2}>
                      {app.name}
                    </Title>
                    <Text color="dimmed">admin</Text>
                    <Box sx={{ flexGrow: 1 }} />
                    <Link href={`/${app.id}`} passHref>
                      <Button component="a">{t('View')}</Button>
                    </Link>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          )}
        />
      </Container>
    );
  },
});

export default page;
