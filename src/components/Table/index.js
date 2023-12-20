import React, { useState } from "react";
import TableRows from "../TableRows";

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

const rows = [
  { id: 1, firstName: "Jon", lastName: "Snow", age: 35, isEdit: false },
  { id: 2, firstName: "Cersei", lastName: "Lannister", age: 42, isEdit: false },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45, isEdit: false },
  { id: 4, firstName: "Arya", lastName: "Stark", age: 16, isEdit: false },
  {
    id: 5,
    firstName: "Daenerys",
    lastName: "Targaryen",
    age: null,
    isEdit: false,
  },
  { id: 6, firstName: "", lastName: "Melisandre", age: 150, isEdit: false },
  { id: 7, firstName: "Ferrara", lastName: "Clifford", age: 44, isEdit: false },
  { id: 8, firstName: "Rossini", lastName: "Frances", age: 36, isEdit: false },
  { id: 9, firstName: "Harvey", lastName: "Roxie", age: 65, isEdit: false },
  { id: 10, firstName: "Jon", lastName: "Snow", age: 35, isEdit: false },
  {
    id: 11,
    firstName: "Cersei",
    lastName: "Lannister",
    age: 42,
    isEdit: false,
  },
  { id: 12, firstName: "Jaime", lastName: "Lannister", age: 45, isEdit: false },
  { id: 13, firstName: "Arya", lastName: "Stark", age: 16, isEdit: false },
  {
    id: 14,
    firstName: "Daenerys",
    lastName: "Targaryen",
    age: null,
    isEdit: false,
  },
  { id: 15, firstName: "", lastName: "Melisandre", age: 150, isEdit: false },
  {
    id: 16,
    firstName: "Ferrara",
    lastName: "Clifford",
    age: 44,
    isEdit: false,
  },
  { id: 17, firstName: "Rossini", lastName: "Frances", age: 36, isEdit: false },
  { id: 18, firstName: "Harvey", lastName: "Roxie", age: 65, isEdit: false },
];

const Table = () => {
  const [tableData, setTableData] = useState([...rows]);
  const [modifiedTableData, setModifiedTableData] = useState([...rows]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkboxList, setCheckBoxList] = useState([]);
  const [serachInput, setSearchInput] = useState("");
  const [addObj, setAddObj] = useState({
    id: "",
    lastName: "",
    firstName: "",
    age: "",
    isEdit: false,
  });

  let endIndex = currentPage * rowsPerPage;
  let startIndex = endIndex - rowsPerPage;

  const handleAscendingOrder = (orderFiled) => {
    // console.log(orderFiled);
    if (!["id", "age"].includes(orderFiled)) {
      setTableData((prev) =>
        [...prev].sort((a, b) => a[orderFiled].localeCompare(b[orderFiled]))
      );
    } else {
      setTableData((prev) =>
        [...prev].sort((a, b) => a[orderFiled] - b[orderFiled])
      );
    }
  };

  const handleDescendingOrder = (orderFiled) => {
    // console.log(orderFiled);
    if (!["id", "age"].includes(orderFiled)) {
      setTableData((prev) =>
        [...prev].sort((a, b) => b[orderFiled].localeCompare(a[orderFiled]))
      );
    } else {
      setTableData((prev) =>
        [...prev].sort((a, b) => b[orderFiled] - a[orderFiled])
      );
    }
  };

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
    // console.log(id);
    if (checkboxList.includes(id)) {
      console.log(id);
      setCheckBoxList((prev) => [...prev].filter((each) => each !== id));
    } else {
      setCheckBoxList((prev) => [...prev, id]);
    }
  };

  const handleSearchButton = (event) => {
    event.preventDefault();
    if (serachInput) {
      setTableData((prev) =>
        [...prev].filter(
          (e) =>
            e.firstName.toLowerCase().includes(serachInput) ||
            e.lastName.toLowerCase().includes(serachInput) ||
            e.age === parseInt(serachInput)
        )
      );
      setCurrentPage(1);
    } else {
      setTableData(modifiedTableData);
    }
  };

  const handleAddButton = () => {
    if (addObj.firstName || addObj.lastName || addObj.age) {
      setTableData((prev) => [
        ...prev,
        { ...addObj, id: tableData.length + 1 },
      ]);
      setModifiedTableData((prev) => [
        ...prev,
        { ...addObj, id: tableData.length + 1 },
      ]);
      setAddObj({
        id: "",
        lastName: "",
        firstName: "",
        age: "",
        isEdit: false,
      });
    }
  };

  //   console.log(rowsPerPage, startIndex, endIndex);
  //   console.log(checkboxList);
  // console.log(tableData);
  //   console.log(serachInput);
  //   console.log(addObj);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-10 pb-20">
      <form
        onSubmit={handleSearchButton}
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
          onClick={handleAddButton}
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
                        onClick={() => handleAscendingOrder(e.field)}
                      >
                        ⬆
                      </button>
                      <button
                        type="button"
                        className=""
                        onClick={() => handleDescendingOrder(e.field)}
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
            <TableRows
              key={e.id}
              rowData={e}
              handleCheckBox={handleCheckBox}
              isCheck={checkboxList.includes(e.id)}
              setTableData={setTableData}
              setModifiedTableData={setModifiedTableData}
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

export default Table;
