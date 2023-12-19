import React, { useState } from "react";
import CopyTableRows from "../CopyTableRows";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddButton,
  handleAscendingOrder,
  handleDescendingOrder,
  handleSearchButton,
} from "../../reduxToolKit/reducers/tableSlice";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "firstName", headerName: "First name" },
  { field: "lastName", headerName: "Last name" },
  {
    field: "age",
    headerName: "Age",
    type: "number",
  },
  { field: "fullName", headerName: "Full name" },
];

const CopyTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkboxList, setCheckBoxList] = useState([]);
  const [serachInput, setSearchInput] = useState("");
  const [addObj, setAddObj] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    isEdit: false,
  });

  let dispatch = useDispatch();
  let { tableData } = useSelector((state) => {
    // console.log("state---------------", state.table);
    return state.table;
  });

  let endIndex = currentPage * rowsPerPage;
  let startIndex = endIndex - rowsPerPage;

  const handleBackWardButton = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage((prev) => prev);
    }
  };

  const handleForWardButton = () => {
    if (tableData.length >= currentPage * rowsPerPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleMultipleCheckBoxs = (e) => {
    if (e.target.checked) {
      let updatedCheckList = tableData.map((each) => each.id);
      setCheckBoxList(updatedCheckList);
    } else {
      setCheckBoxList([]);
    }
  };

  const handleCheckBox = (id) => {
    if (checkboxList.includes(id)) {
      console.log(id);
      setCheckBoxList((prev) => [...prev].filter((each) => each !== id));
    } else {
      setCheckBoxList((prev) => [...prev, id]);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-10 pb-20">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(handleSearchButton(serachInput));
        }}
        className=" h-[50px] text-xl w-[500px] mb-4 flex items-center border"
      >
        <input
          type="search"
          className="h-full w-[85%] rounded pl-3 pr-1"
          placeholder="Search"
          value={serachInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className="bg-green-400 px-3 h-full flex-grow">
          Search
        </button>
      </form>
      <div className="text-xl  w-[75%] h-[50px] flex justify-between mb-4">
        <input
          type="text"
          className=" w-[300px] pl-3 h-full mb-4 border-2 rounded"
          placeholder="FirstName"
          value={addObj.firstName}
          onChange={(e) =>
            setAddObj((prev) => ({ ...prev, firstName: e.target.value }))
          }
        />
        <input
          type="text"
          className="w-[300px] pl-3 h-full mb-4 border-2 rounded"
          placeholder="LastName"
          value={addObj.lastName}
          onChange={(e) =>
            setAddObj((prev) => ({ ...prev, lastName: e.target.value }))
          }
        />
        <input
          type="text"
          className="w-[300px] pl-3 h-full mb-4 border-2 rounded"
          placeholder="Age"
          value={addObj.age}
          onChange={(e) =>
            setAddObj((prev) => ({ ...prev, age: e.target.value }))
          }
        />
        <button
          type="button"
          className="bg-green-400 px-8 rounded"
          onClick={() => {
            dispatch(handleAddButton(addObj));
          }}
        >
          Add
        </button>
      </div>
      <table className="w-[75%] table-auto">
        <thead className="border">
          <tr className="">
            <td className="p-3 ">
              <input
                checked={checkboxList.length === tableData.length}
                type="checkbox"
                name=""
                id=""
                className="pl-10 h-[18px] w-[18px]"
                onChange={handleMultipleCheckBoxs}
              />
            </td>
            {columns.map((e) => (
              <th key={e.field} className="p-3 w-[300px]">
                <div className="flex items-center">
                  <div>{e.headerName}</div>
                  {e.field !== "fullName" && (
                    <div className="text-2xl ml-2 flex flex-col">
                      <button
                        type="button"
                        className=""
                        onClick={() => dispatch(handleAscendingOrder(e.field))}
                      >
                        ⬆
                      </button>
                      <button
                        type="button"
                        className=""
                        onClick={() => dispatch(handleDescendingOrder(e.field))}
                      >
                        ⬇
                      </button>
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {tableData.slice(startIndex, endIndex).map((e) => (
            <CopyTableRows
              key={e.id}
              rowData={e}
              handleCheckBox={handleCheckBox}
              isCheck={checkboxList.includes(e.id)}
              dispatch={dispatch}
            />
          ))}
        </tbody>
      </table>
      <div className="border flex justify-around items-center w-[75%] p-5">
        <div className="flex">
          <p>Rows per page:</p>
          <select
            id=""
            onChange={(e) => {
              setRowsPerPage(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="5">5</option>
            <option className="10">10</option>
          </select>
        </div>
        <div>
          {startIndex}-{endIndex} of {tableData.length}
        </div>
        <div className="w-[50px] text-xl flex justify-between ">
          <button
            className="px-4 py-1 rounded bg-green-300 mr-2"
            onClick={handleBackWardButton}
          >{`<`}</button>
          <button
            className="px-4 py-1 rounded bg-green-300"
            onClick={handleForWardButton}
          >{`>`}</button>
        </div>
      </div>
    </div>
  );
};

export default CopyTable;
