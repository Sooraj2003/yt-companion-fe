import { useEffect, useState } from "react";
import api from "../api";

const VideoDetails = ({ videoId }) => {
  const [video, setVideo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    api.get(`/video?videoId=${videoId}`).then((res) => {
      setVideo(res.data);
      setTitle(res.data.snippet.title);
      setDescription(res.data.snippet.description);
    });
  }, [videoId]);

  const handleUpdate = async () => {
    await api.put("/video", { videoId, title, description });
    setEditMode(false);
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div className="p-4 border rounded shadow-md">
      {editMode ? (
        <div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full mb-2" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full mb-2" />
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 mr-2">Save</button>
          <button onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2">Cancel</button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-2">{video.snippet.title}</h2>
          <p className="mb-2">{video.snippet.description}</p>
          <p className="text-sm text-gray-500 mb-4">Views: {video.statistics.viewCount}</p>
          <button onClick={() => setEditMode(true)} className="bg-yellow-500 text-white px-4 py-2">Edit</button>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;