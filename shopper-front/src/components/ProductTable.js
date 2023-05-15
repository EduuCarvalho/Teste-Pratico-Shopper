import React, { useMemo } from "react";
import { useTable } from "react-table";
import styled from "styled-components";



function Table({ data }) {
  const columns = useMemo(
    () => [      {        Header: "Product Code",        accessor: "product_code",      },      {        Header: "Product Name",        accessor: "product_name",      },      {        Header: "Current Price",        accessor: "current_price",      },      {        Header: "New Price",        accessor: "new_price",      },      {        Header: "Status",        accessor: "status",      },    ],
    []
  );

  const tableData = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: tableData,
  });

  return (
    <TableWrapper {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </TableWrapper>
  );
}

export default Table;

const TableWrapper = styled.table`
  font-family: "Montserrat", sans-serif;
  border-collapse: collapse;
  margin: 1rem 0;
  width: 100%;

  th,
  td {
    border: 1px solid #52b591;
    padding: 0.5rem;
    text-align: center;
  }

  th {
    background-color: #e8f9f3;
    font-weight: bold;
    text-transform: uppercase;
  }

  tbody tr {
    background-color: #f0f8f7;
    font-size: 1.1rem;
    font-weight: normal;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #d9edea;
    }
  }
`;