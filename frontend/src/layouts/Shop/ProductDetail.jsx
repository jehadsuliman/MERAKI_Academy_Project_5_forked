import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addComment,
  deleteCommentById,
  setComments,
} from "../../Service/api/redux/reducers/user/commentsSlice";
import { setProductId } from "../../Service/api/redux/reducers/shop/product";
import { message, Input, Button, List, Typography, Space } from "antd";
import axios from "axios";

const { TextArea } = Input;
const { Title } = Typography;

const Comments = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    if (productId) {
      dispatch(setProductId(productId));
      const fetchComments = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/products/${productId}/comments`
          );
          if (response.data && response.data.comments) {
            dispatch(setComments(response.data.comments));
          } else {
            message.error("Failed to fetch comments.");
          }
        } catch (error) {
          console.error("Failed to fetch comments", error);
          message.error("Failed to fetch comments.");
        }
      };

      fetchComments();
    } else {
      message.error("Product ID is not defined.");
    }
  }, [dispatch, productId]);

  const handleAddComment = async () => {
    if (!productId) {
      message.error("Product ID is not defined.");
      return;
    }

    const newComment = {
      id: Date.now(),
      text: newCommentText,
      productId,
      is_deleted: false,
    };

    try {
      await dispatch(addComment(newComment));
      setNewCommentText("");
      message.success("Comment added successfully!");
    } catch {
      message.error("Failed to add comment.");
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await dispatch(deleteCommentById(id));
      message.success("Comment deleted successfully!");
    } catch {
      message.error("Failed to delete comment.");
    }
  };

  return (
    <div
      style={{
        margin: "25px",
        background: "#fff",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <Title level={3}>Comments</Title>
      <TextArea
        rows={4}
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
        placeholder="Enter your comment"
        style={{ marginBottom: "10px" }}
      />
      <Button
        type="primary"
        onClick={handleAddComment}
        style={{ marginBottom: "20px" }}
      >
        Add Comment
      </Button>
      <List
        bordered
        dataSource={comments.filter(
          (comment) => comment.productId === productId && !comment.is_deleted
        )}
        renderItem={(comment) => (
          <List.Item
            actions={[
              <Button
                type="link"
                danger
                onClick={() => handleDeleteComment(comment.id)}
              >
                Delete
              </Button>,
            ]}
            style={{
              marginBottom: "10px",
              borderRadius: "4px",
              background: "#fff",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Space direction="vertical">
              <Typography.Text>{comment.text}</Typography.Text>
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Comments;
