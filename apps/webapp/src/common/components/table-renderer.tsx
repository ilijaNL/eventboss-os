import { useCallback, useMemo, useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  Paper,
  Space,
  Pagination,
  LoadingOverlay,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons';
import { Order_By } from '@/__generated__/admin/documents';

export type SortState<K> = { key: K; order: Order_By.AscNullsLast | Order_By.DescNullsLast } | null;
export type TableState<K> = { page: number; pageSize: number; sort: SortState<K> };

export const DEFAULT_PAGE_SIZE = 25;

type TableControl<K extends string = string> = {
  setPage: (page: number) => void;
  limit: number;
  setPageSize: (pageSize: number) => void;
  onSort: (field: K) => void;
  state: TableState<K>;
  offset: number;
  order_by: null | Partial<{ [k in K]: Order_By }>;
};

export const useTableControl = <K extends string>(initialState?: Partial<TableState<K>>): TableControl<K> => {
  const [state, setState] = useState<TableState<K>>({
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    sort: null,
    ...initialState,
  });

  const setPage = useCallback((page: number) => {
    return setState((v) => ({
      ...v,
      page: page,
    }));
  }, []);

  const onSort = useCallback((field: K) => {
    return setState((v) => ({
      ...v,
      sort: {
        key: field,
        order:
          v.sort?.key === field && v.sort?.order === Order_By.AscNullsLast
            ? Order_By.DescNullsLast
            : Order_By.AscNullsLast,
      },
    }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    return setState((v) => ({
      ...v,
      pageSize: pageSize,
    }));
  }, []);

  return useMemo(() => {
    // need some casting
    const order_by: TableControl<K>['order_by'] = state.sort
      ? ({
          [state.sort.key]: state.sort.order,
        } as Partial<{ [k in K]: Order_By }>)
      : null;

    return {
      setPage,
      limit: state.pageSize,
      setPageSize,
      onSort,
      offset: (state.page - 1) * state.pageSize,
      state,
      order_by,
    };
  }, [onSort, setPage, setPageSize, state]);
};

interface Column<T, K> {
  label: string;
  renderItem: (item: T) => React.ReactNode;
  sort_key?: K;
}

type TableRendererProps<T, K extends string> = {
  control: TableControl<K>;
  items: T[];
  totalItems: number;
  cellRenderers: Record<string, Column<T, K>>;
  isLoading: boolean;
};

const useStyles = createStyles((theme) => ({
  control: {
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark![6] : theme.colors.gray![0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

function TableRenderer<T extends { id: string | number }, K extends string>(props: TableRendererProps<T, K>) {
  const { classes } = useStyles();
  const { pageSize, page, sort } = props.control.state;

  const rows = props.items;
  const totalPages = Math.ceil(props.totalItems / pageSize);

  return (
    <>
      <Paper sx={{ position: 'relative' }}>
        <LoadingOverlay visible={props.isLoading} overlayBlur={2} />
        <ScrollArea>
          <Table verticalSpacing="xs" horizontalSpacing="md">
            <thead>
              <tr>
                {Object.keys(props.cellRenderers).map((key) => {
                  const column = props.cellRenderers[key as K]!;
                  const sortKey = column.sort_key;
                  const Icon =
                    sort?.key === sortKey
                      ? sort?.order === Order_By.AscNullsLast
                        ? IconChevronUp
                        : IconChevronDown
                      : IconSelector;
                  return (
                    <th key={key}>
                      {!!sortKey && (
                        <UnstyledButton onClick={() => props.control.onSort(sortKey)} className={classes.control}>
                          <Group>
                            <Text weight={500} size="sm">
                              {column.label}
                            </Text>
                            <Center className={classes.icon}>
                              <Icon size={14} stroke={1.5} />
                            </Center>
                          </Group>
                        </UnstyledButton>
                      )}
                      {!sortKey && (
                        <Text weight={500} size="sm">
                          {column.label}
                        </Text>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                // only show page size
                props.items.map((row) => (
                  <tr key={row.id}>
                    {Object.keys(props.cellRenderers).map((key) => {
                      const column = props.cellRenderers[key]!;
                      return <td key={key}>{column.renderItem(row)}</td>;
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td>
                    <Text weight={500} align="center">
                      Nothing found
                    </Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </ScrollArea>
      </Paper>
      <Space h="md" />
      {totalPages > 1 && (
        <Group>
          <div style={{ flexGrow: '1' }} />
          <Pagination page={page} onChange={props.control.setPage} total={totalPages} />
        </Group>
      )}
    </>
  );
}

export default TableRenderer;
