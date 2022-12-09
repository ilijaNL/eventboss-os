import { useTranslation } from '@/common/hooks/useTranslation';
import { ActionIcon, createStyles, Group, Stack, Table, Text } from '@mantine/core';
import { TableVirtuoso } from 'react-virtuoso';
import { IconEye, IconRepeat } from '@tabler/icons';
import { toDate } from '@/utils/time';
import { ActivityLogItemFragment } from '@/__generated__/app/documents';

const useStyles = createStyles((theme) => ({
  headerRow: {
    background: theme.colorScheme === 'dark' ? theme.colors.gray[8] : 'white',
  },
}));

const ActionLogs: React.FC<{ items: Array<ActivityLogItemFragment>; has_more: boolean; fetchMore: () => void }> = ({
  items,
  fetchMore,
  has_more,
}) => {
  const { classes } = useStyles();
  const { locale } = useTranslation();
  return (
    <TableVirtuoso
      style={{ height: '100%' }}
      data={items}
      components={{
        Table: (props) => <Table verticalSpacing="xs" striped {...props} />,
      }}
      fixedHeaderContent={() => (
        <tr className={classes.headerRow}>
          <th>Action</th>
          <th>Type</th>
          <th style={{ textAlign: 'center' }}>Created on</th>
          <th>Triggered by Event</th>
          <th>Status</th>
          <th style={{ textAlign: 'center' }}>Actions</th>
        </tr>
      )}
      endReached={() => {
        if (has_more) {
          fetchMore();
        }
      }}
      itemContent={(_, item) => {
        return (
          <>
            <td>
              <Stack spacing={0}>
                <Text weight={500}>{item.activity?.name}</Text>
                <Text color="dimmed" weight={500}>
                  {item.activity?.slug}
                </Text>
              </Stack>
            </td>
            <td>
              <Text size="sm">{item.activity?.type}</Text>
            </td>
            <td>
              <Text size="sm" align="center">
                {toDate(item.created_at, 'dd/MM/yyyy HH:mm:ss', locale)}
              </Text>
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
            <td>{item.event_name}</td>
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
          </>
        );
      }}
    />
  );
};

export default ActionLogs;
