import React from "react";
import {
  handleBlurEvent,
  handleDoubleClick,
  handleEdit,
} from "../../reduxToolKit/reducers/tableSlice";

const CopyTableRows = ({ rowData, handleCheckBox, isCheck, dispatch }) => {
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
      {Object.keys(rowData).map((each, index) => {
        if (!["id", "fullName", "isEdit"].includes(each)) {
          return rowData.isEdit ? (
            <td key={index}>
              <input
                type="text"
                className="p-3 w-full"
                value={rowData[each]}
                onChange={(e) =>
                  dispatch(
                    handleEdit({ id: rowData.id, [each]: e.target.value })
                  )
                }
                onBlur={() => dispatch(handleBlurEvent(rowData))}
              />
            </td>
          ) : (
            <td
              key={index}
              className="p-3"
              onDoubleClick={() => dispatch(handleDoubleClick(rowData))}
            >
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

export default CopyTableRows;
