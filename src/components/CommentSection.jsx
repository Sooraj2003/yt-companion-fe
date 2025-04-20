
import { useState } from "react";
import api from "../api";

const CommentSection = ({ videoId }) => {
  const [text, setText] = useState("");
  const [commentIdToReply, setCommentIdToReply] = useState("");
  const [replyText, setReplyText] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const comment = async () => {
    await api.post("/video/comment", { videoId, text });
    setText("");
  };

  const reply = async () => {
    await api.post("/video/reply", { parentId: commentIdToReply, text: replyText });
    setCommentIdToReply("");
    setReplyText("");
  };

  const deleteComment = async () => {
    await api.delete(`/video/comment/${deleteId}`);
    setDeleteId("");
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h3 className="font-bold text-lg mb-2">Comments</h3>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add comment" className="border p-2 w-full mb-2" />
      <button onClick={comment} className="bg-blue-500 text-white px-4 py-2 mb-4">Post Comment</button>

      <input value={commentIdToReply} onChange={(e) => setCommentIdToReply(e.target.value)} placeholder="Comment ID to reply" className="border p-2 w-full mb-2" />
      <input value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Reply text" className="border p-2 w-full mb-2" />
      <button onClick={reply} className="bg-purple-500 text-white px-4 py-2 mb-4">Reply</button>

      <input value={deleteId} onChange={(e) => setDeleteId(e.target.value)} placeholder="Comment ID to delete" className="border p-2 w-full mb-2" />
      <button onClick={deleteComment} className="bg-red-500 text-white px-4 py-2">Delete Comment</button>
    </div>
  );
};

export default CommentSection;
