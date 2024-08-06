import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setComments,
  updateCommentInList,
} from "../../Service/api/redux/reducers/user/commentsSlice";
import {
  message,
  Input,
  Button,
  List,
  Typography,
  Space,
  Modal,
  Avatar,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;
const { Title } = Typography;

const Comments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);
  const [newCommentText, setNewCommentText] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchComments = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/comments/${id}`
          );
          dispatch(setComments(response.data.comments));
        } catch (error) {
          console.error("Failed to fetch comments", error);
          message.error("Failed to fetch comments.");
        }
      };

      fetchComments();
    } else {
      message.error("Product ID is not defined.");
    }
  }, [dispatch, id]);

  const handleAddComment = async () => {
    if (!id) {
      message.error("Product ID is not defined.");
      return;
    }

    const newComment = {
      product_id: id,
      comment: newCommentText,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/comments/${id}`, newComment, {
        headers: { Authorization: token },
      });

      const response = await axios.get(`http://localhost:5000/comments/${id}`);
      dispatch(setComments(response.data.comments));

      setNewCommentText("");
      message.success("Comment added successfully!");
    } catch (error) {
      console.error("Failed to add comment:", error);
      message.error("Failed to add comment.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/comments/${commentId}`);
      const response = await axios.get(`http://localhost:5000/comments/${id}`);
      dispatch(setComments(response.data.comments));
      message.success("Comment deleted successfully!");
    } catch {
      message.error("Failed to delete comment.");
    }
  };

  const handleEditComment = async () => {
    if (!id || editCommentId === null) {
      message.error("Product ID or Comment ID is not defined.");
      return;
    }

    const updatedComment = {
      comment: editedCommentText,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/comments/${editCommentId}`,
        updatedComment
      );

      console.log("Update comment response:", response.data);

      if (response.status === 200) {
        dispatch(updateCommentInList(response.data.comment));
        setEditCommentId(null);
        setEditedCommentText("");
        message.success("Comment updated successfully!");

        const commentsResponse = await axios.get(
          `http://localhost:5000/comments/${id}`
        );
        dispatch(setComments(commentsResponse.data.comments));
      } else {
        message.error("Failed to update comment.");
      }
    } catch (error) {
      console.error("Failed to update comment:", error.response || error);
      message.error(
        `Failed to update comment. ${error.response?.data?.message || ""}`
      );
    }
  };

  const showEditModal = (comment) => {
    setEditCommentId(comment.id);
    setEditedCommentText(comment.comment);
    setIsEditModalVisible(true);
  };

  const handleModalOk = () => {
    handleEditComment();
  };

  const handleModalCancel = () => {
    setIsEditModalVisible(false);
    setEditCommentId(null);
    setEditedCommentText("");
  };

  return (
    <div style={{ margin: "40px", background: "#fff", borderRadius: "8px" }}>
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
          (comment) =>
            Number(comment.product_id) === Number(id) && !comment.is_deleted
        )}
        renderItem={(comment) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => showEditModal(comment)}>
                Edit
              </Button>,
              <Button
                type="link"
                danger
                onClick={() => handleDeleteComment(comment.id)}
              >
                Delete
              </Button>,
            ]}
            style={{
              marginTop: "15px",
              borderRadius: "none",
              background: "#fff",
            }}
          >
            <Space direction="vertical">
              <Typography.Text strong>
                {" "}
                <Avatar icon={<UserOutlined />} /> {comment.username}
              </Typography.Text>
              <br />
              <Typography.Text>{comment.comment}</Typography.Text>
            </Space>
          </List.Item>
        )}
      />
      <Modal
        title="Edit Comment"
        visible={isEditModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <TextArea
          rows={4}
          value={editedCommentText}
          onChange={(e) => setEditedCommentText(e.target.value)}
          placeholder="Enter your comment"
        />
      </Modal>
    </div>
  );
};

export default Comments;
