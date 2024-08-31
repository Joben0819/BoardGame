import { useMemo } from 'react';
import { useTable } from 'react-table';
// import { useAuth } from "../../Authorization/util/LoginAuth";
// import { cleanWashCode, SectionGames } from "../../../api/game/gamelist";
import { useSelector } from 'react-redux';
import NoData from '../NoData/index';
import './index.scss';

export const BasicTable = ({
  maxH,
  theight,
  pbot,
  rowfonts,
  basicData,
  headerData,
  borderRight,
  dataColor,
  noHeader,
  fontSize,
  fcolor,
  Display,
}) => {
  const { currTheme } = useSelector((state) => state.gameSettings);

  const result = useMemo(() => Display);
  const columns = useMemo(() => headerData, [headerData]);
  const data = useMemo(() => basicData, [basicData]);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <>
      {/* {!rows ? */}
      <table {...getTableProps()} data-theme={currTheme} style={{ maxHeight: maxH && maxH }}>
        <thead
          style={{
            display: noHeader ? 'none' : `${result}`,
            height: theight && theight,
          }}
        >
          {headerGroups?.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers?.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderRight: borderRight,
                    fontSize: fontSize,
                    display: noHeader ? 'none' : '',
                    color: fcolor && fcolor,
                    width: column.render('Header') === 'ID' && '1rem',
                    paddingBottom: column.render('Header') === 'ID' ? '0PX' : '2px',
                  }}
                >
                  {' '}
                  {column.render('Header')}{' '}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows?.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()} style={{ height: '0.2rem' }}>
                {
                  // row.original == null ? (<td><NoData/></td>) :
                  row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          borderRight: borderRight,
                          fontSize: '0.1rem',
                          width: '0.6rem',
                          minWidth: '0.6rem',
                          letterSpacing: '-0.0005rem',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          maxWidth: '1.324rem',
                        }}
                      >
                        {cell.length === null ? (
                          <div style={{ marginTop: '0.1rem' }}>
                            <NoData></NoData>
                          </div>
                        ) : (
                          <span
                            style={{ fontSize: rowfonts && rowfonts }}
                            className={
                              dataColor === 'white'
                                ? 'prioWhite'
                                : dataColor === 'green'
                                ? 'prioGreen'
                                : ''
                            }
                          >
                            {!cell.render('Cell').length === 0 ? <>hi</> : cell.render('Cell')}
                          </span>
                        )}{' '}
                      </td>
                    );
                  })
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
