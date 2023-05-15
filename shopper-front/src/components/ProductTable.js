import React, { useMemo } from "react";
import { useTable } from "react-table";

function Table({ data }) {
  const columns = useMemo(
    () => [      {        Header: "Product Code",        accessor: "product_code"      },      {        Header: "Product Name",        accessor: "product_name"      },      {        Header: "Current Price",        accessor: "current_price",        Cell: ({ value }) => `R$ ${value}`      },      {        Header: "New Price",        accessor: "new_price",        Cell: ({ value }) => `R$ ${value}`      },      {        Header: "Status",        accessor: "status"      }    ],
    []
  );

  const tableData = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data: tableData
  });

  return (
    <table {...getTableProps()} style={{ border: "solid 1px #52B591", background: "#F0FFF0", fontFamily: "Montserrat" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px #52B591",
                  background: "#FFFFFF",
                  color: "#52B591",
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                {column.render("Header")}
              </th>
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
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px #52B591",
                      background: "#FFFFFF",
                      color: "#52B591",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
