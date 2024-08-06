import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
  },
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    deleteCommentById: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    updateCommentInList(state, action) {
      const updatedComment = action.payload;
      if (!updatedComment || !updatedComment.id) {
        console.error("Invalid comment data:", updatedComment);
        return;
      }
      const index = state.comments.findIndex(
        (comment) => comment.id === updatedComment.id
      );
      if (index !== -1) {
        state.comments[index] = updatedComment;
      } else {
        console.error("Comment not found:", updatedComment.id);
      }
    },
  },
});

export const {
  setComments,
  addComment,
  deleteCommentById,
  updateCommentInList,
} = commentsSlice.actions;
export default commentsSlice.reducer;
