import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  tableData: [
    { id: 1, firstName: "Jon", lastName: "Snow", age: 35, isEdit: false },
    {
      id: 2,
      firstName: "Cersei",
      lastName: "Lannister",
      age: 42,
      isEdit: false,
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      age: 45,
      isEdit: false,
    },
    { id: 4, firstName: "Arya", lastName: "Stark", age: 16, isEdit: false },
    {
      id: 5,
      firstName: "Daenerys",
      lastName: "Targaryen",
      age: null,
      isEdit: false,
    },
    { id: 6, firstName: "", lastName: "Melisandre", age: 150, isEdit: false },
    {
      id: 7,
      firstName: "Ferrara",
      lastName: "Clifford",
      age: 44,
      isEdit: false,
    },
    {
      id: 8,
      firstName: "Rossini",
      lastName: "Frances",
      age: 36,
      isEdit: false,
    },
    { id: 9, firstName: "Harvey", lastName: "Roxie", age: 65, isEdit: false },
    { id: 10, firstName: "Jon", lastName: "Snow", age: 35, isEdit: false },
    {
      id: 11,
      firstName: "Cersei",
      lastName: "Lannister",
      age: 42,
      isEdit: false,
    },
    {
      id: 12,
      firstName: "Jaime",
      lastName: "Lannister",
      age: 45,
      isEdit: false,
    },
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
    {
      id: 17,
      firstName: "Rossini",
      lastName: "Frances",
      age: 36,
      isEdit: false,
    },
    { id: 18, firstName: "Harvey", lastName: "Roxie", age: 65, isEdit: false },
  ],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    handleAscendingOrder: (state, actions) => {
      //   console.log("handleAscendingOrder", actions);
      if (!["id", "age"].includes(actions.payload)) {
        state.tableData.sort((a, b) =>
          a[actions.payload].localeCompare(b[actions.payload])
        );
      } else {
        state.tableData.sort((a, b) => a[actions.payload] - b[actions.payload]);
      }
    },
    handleDescendingOrder: (state, actions) => {
      //   console.log("handleDescendingOrder");
      if (!["id", "age"].includes(actions.payload)) {
        state.tableData.sort((a, b) =>
          b[actions.payload].localeCompare(a[actions.payload])
        );
      } else {
        state.tableData.sort((a, b) => b[actions.payload] - a[actions.payload]);
      }
    },
    handleEdit: (state, actions) => {
      // console.log(actions);
      state.tableData = state.tableData.map((each) => {
        if (each.id === actions.payload.id) {
          return { ...each, ...actions.payload };
        }
        return { ...each };
      });
    },
    handleDoubleClick: (state, actions) => {
      console.log("handleDoubleClick", actions);
      state.tableData = state.tableData.map((e) => {
        if (e.id === actions.payload.id) {
          console.log(e.id, actions.payload, {
            ...actions.payload,
            isEdit: true,
          });
          return { ...e, isEdit: true };
        }
        return { ...e };
      });
    },
    handleBlurEvent: (state, actions) => {
      console.log(actions);
      state.tableData = state.tableData.map((e) => {
        if (e.id === actions.payload.id) {
          return { ...e, isEdit: false };
        }
        return { ...e };
      });
    },
    handleSearchButton: (state, actions) => {
      if (actions.payload) {
        state.tableData = state.tableData.filter(
          (e) =>
            e.firstName.toLowerCase().includes(actions.payload) ||
            e.lastName.toLowerCase().includes(actions.payload) ||
            e.age === parseInt(actions.payload)
        );
      }
    },
    handleAddButton: (state, actions) => {
      // console.log("--------------", actions);
      if (
        actions.payload.firstName ||
        actions.payload.lastName ||
        actions.payload.age
      ) {
        state.tableData = [
          ...state.tableData,
          { ...actions.payload, id: state.tableData.length + 1 },
        ];
      }
    },
  },
});

export const {
  handleAscendingOrder,
  handleDescendingOrder,
  handleEdit,
  handleDoubleClick,
  handleBlurEvent,
  handleSearchButton,
  handleAddButton,
} = tableSlice.actions;

export default tableSlice.reducer;
