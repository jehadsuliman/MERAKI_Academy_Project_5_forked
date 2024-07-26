import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUserById: (state, action) => {
      state.users = state.users.map((user, i) => {
        if (user.id == action.payload.id) {
          user = action.payload;
        }
        return user;
      });
    },
    deleteUserById: (state, action) => {
      state.users = state.users.filter((user) => {
        return user.id !== action.payload;
      });
    },
  },
});

export const { setUsers, addUser, updateUserById, deleteUserById } =
  usersSlice.actions;
export default usersSlice.reducer;
