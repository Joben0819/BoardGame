import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTable } from 'react-table';
import NoData from 'src/app/components/NoData';

export const WashCodeTable = ({ headerData, tableData, expandlang, pbot }) => {
  const columns = useMemo(() => headerData, [headerData]);
  const data = useMemo(() => (tableData || []), [tableData]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  const { currTheme } = useSelector((state) => state.gameSettings);

  return (
    <>

        <table {...getTableProps()} data-theme={currTheme}>
          <thead>
            {headerGroups?.map((headerGroup) => (
              <tr
                style={{
                  height: expandlang ? '0.5rem' : '',
                }}
                {...headerGroup.getHeaderGroupProps()}
              >
                {headerGroup?.headers?.map((column) => (
                  <th {...column.getHeaderProps()} style={{ paddingBottom: pbot && pbot }}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
            <tbody {...getTableBodyProps()}>
              {data?.length > 0 ? (
                rows?.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells?.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell?.length === null ? (
                              <NoData />
                            ) : (
                              <span className='hello'>
                                {cell.render('Cell') || <NoData />}
                            </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (
                <div>
                    <NoData pos='absolute' martop={0}/>
                </div>
              )}
            </tbody>
        </table>
    </>
  );
};
