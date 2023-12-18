import React from "react";

const TableRows = ({
  rowData,
  handleCheckBox,
  isCheck,
  setTableData,
  setModifiedTableData,
}) => {
  const handleDoubleClick = () => {
    console.log("Radhe Radhe");
    setTableData((prev) =>
      [...prev].map((e) => {
        if (e.id === rowData.id) {
          return { ...rowData, isEdit: true };
        }
        return e;
      })
    );
  };

  const handleBlurEvent = () => {
    setTableData((prev) =>
      [...prev].map((e) => {
        if (e.id === rowData.id) {
          return { ...rowData, isEdit: false };
        }
        return e;
      })
    );
  };

  const handleEdit = (e, colName) => {
    setTableData((prev) =>
      [...prev].map((each) => {
        if (each.id === rowData.id) {
          return { ...each, [colName]: e.target.value };
        }
        return each;
      })
    );
    setModifiedTableData((prev) =>
      [...prev].map((each) => {
        if (each.id === rowData.id) {
          return { ...each, [colName]: e.target.value };
        }
        return each;
      })
    );
  };

  return (
    <tr className="border">
      <td className="p-3">
        <input
          checked={isCheck}
          type="checkbox"
          id={rowData.id}
          className="h-[18px] w-[18px]"
          onChange={() => handleCheckBox(rowData.id)}
        />
      </td>
      <td className="p-3">{rowData.id}</td>
      {Object.keys(rowData).map((each) => {
        if (!["id", "fullName", "isEdit"].includes(each)) {
          return rowData.isEdit ? (
            <td>
              <input
                type="text"
                className="p-3 w-full"
                value={rowData[each]}
                onChange={(e) => handleEdit(e, each)}
                onBlur={handleBlurEvent}
              />
            </td>
          ) : (
            <td className="p-3" onDoubleClick={handleDoubleClick}>
              {rowData[each]}
            </td>
          );
        }
        return "";
      })}

      <td className="p-3">
        {rowData.firstName} {rowData.lastName}
      </td>
    </tr>
  );

  // return (
  //   <tr className="border">
  //     <td className="p-3">
  //       <input
  //         checked={isCheck}
  //         type="checkbox"
  //         id={rowData.id}
  //         className="h-[18px] w-[18px]"
  //         onChange={() => handleCheckBox(rowData.id)}
  //       />
  //     </td>
  //     <td className="p-3">{rowData.id}</td>
  //     {rowData.isEdit ? (
  //       <td>
  //         <input
  //           type="text"
  //           className="p-3 w-full"
  //           value={rowData.firstName}
  //           onChange={(e) => handleEdit(e, "firstName")}
  //           onBlur={handleBlurEvent}
  //         />
  //       </td>
  //     ) : (
  //       <td className="p-3" onDoubleClick={handleDoubleClick}>
  //         {rowData.firstName}
  //       </td>
  //     )}
  //     {rowData.isEdit ? (
  //       <td>
  //         <input
  //           className="p-3 w-full"
  //           type="text"
  //           value={rowData.lastName}
  //           onChange={(e) => handleEdit(e, "lastName")}
  //           onBlur={handleBlurEvent}
  //         />
  //       </td>
  //     ) : (
  //       <td className="p-3" onDoubleClick={handleDoubleClick}>
  //         {rowData.lastName}
  //       </td>
  //     )}
  //     {rowData.isEdit ? (
  //       <td>
  //         <input
  //           type="number"
  //           className="p-3 w-full"
  //           value={rowData.age}
  //           onChange={(e) => handleEdit(e, "age")}
  //           onBlur={handleBlurEvent}
  //         />
  //       </td>
  //     ) : (
  //       <td className="p-3" onDoubleClick={handleDoubleClick}>
  //         {rowData.age}
  //       </td>
  //     )}
  //     <td className="p-3">
  //       {rowData.firstName} {rowData.lastName}
  //     </td>
  //   </tr>
  // );
};

export default TableRows;
