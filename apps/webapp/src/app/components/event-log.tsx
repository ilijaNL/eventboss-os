import { useTranslation } from '@/common/hooks/useTranslation';
import { ActionIcon, createStyles, Group, Stack, Table, Text } from '@mantine/core';
import { TableVirtuoso } from 'react-virtuoso';
import { IconCircleCheck, IconEye, IconSend } from '@tabler/icons';
import { EventLogItemFragment } from '@/__generated__/app/documents';
import { toDate } from '@/utils/time';

const useStyles = createStyles((theme) => ({
  headerRow: {
    background: theme.colorScheme === 'dark' ? theme.colors.gray[8] : 'white',
  },
}));
const EventLogs: React.FC<{ items: Array<EventLogItemFragment>; has_more: boolean; fetchMore: () => void }> = ({
  items,
  fetchMore,
  has_more,
}) => {
  const { locale } = useTranslation();
  const { classes } = useStyles();
  return (
    <TableVirtuoso
      style={{ height: '100%' }}
      data={items}
      components={{
        Table: (props) => <Table verticalSpacing="xs" striped {...props} />,
      }}
      fixedHeaderContent={() => (
        <tr className={classes.headerRow}>
          <th>Event</th>
          <th style={{ textAlign: 'center' }}>Created on</th>
          <th style={{ textAlign: 'center' }}>Status</th>
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
                <Text weight={500}>{item.event?.name}</Text>
                <Text color="dimmed" weight={500}>
                  {item.event?.slug}
                </Text>
              </Stack>
            </td>
            <td>
              <Text align="center" size="sm">
                {toDate(item.created_at, 'dd/MM/yyyy HH:mm:ss', locale)}
              </Text>
            </td>
            <td style={{ textAlign: 'center' }}>
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
          </>
        );
      }}
    />
  );
};

export default EventLogs;
