import Loading from '@/app/loading';
import QueryRenderer from '@/common/components/query-comp';
import { useAuthQuery } from '@/common/hooks/useQuery';
import { useTranslation } from '@/common/hooks/useTranslation';
import { createAuthPage } from '@/common/page';
import { GetAppsDocument } from '@/__generated__/admin/documents';
import { Box, Button, Card, Container, Text, SimpleGrid, Stack, Title } from '@mantine/core';
import Link from 'next/link';

const page = createAuthPage({
  pageComponent: function AccountSettingsPage() {
    const queryResult = useAuthQuery({ role: 'admin' }, GetAppsDocument, {});
    const { t } = useTranslation();

    return (
      <Container py="lg">
        <QueryRenderer
          queryResult={queryResult}
          errorRender={() => <></>}
          loadingRender={() => <Loading />}
          successRender={({ data }) => (
            <SimpleGrid cols={2}>
              {data.app_apps.map((app) => (
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
