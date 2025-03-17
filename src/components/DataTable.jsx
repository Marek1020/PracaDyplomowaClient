import React from "react";
import { useNavigate } from "react-router-dom";

const DataTable = ({ value, children }) => {
  const navigate = useNavigate();

  const columns = React.Children.toArray(children);

  return (
    <table className="min-w-full divide-y divide-slate-200 shadow-md">
      <thead className="bg-[#023047] text-white">
        <tr>
          {columns.map((column) => (
            <th
              key={column.props.field}
              className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider text-center"
            >
              {column.props.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-slate-200">
        {value.map((item, rowIndex) => (
          <tr
            key={rowIndex}
            className="hover:bg-slate-50 transition-colors duration-200"
          >
            {columns.map((column) => (
              <td
                key={column.props.field}
                className="px-4 py-2 text-sm h-[50px]"
                onClick={() => {
                  navigate(
                    `/home/products/edit/${item?.["wh_product.w_id"] || -1}`
                  );
                }}
              >
                {item[column.props.field]
                  ? String(item[column.props.field]).split(",").join("\n")
                  : "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
