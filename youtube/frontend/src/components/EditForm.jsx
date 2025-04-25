import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [video, setVideo] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
  });

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/videos/${id}`);
        setVideo(res.data);
      } catch (err) {
        console.error("Error loading video:", err);
        alert("Failed to load video details.");
      }
    };

    fetchVideo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo((prevVideo) => ({
      ...prevVideo,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating video with data:", video); 

    try {
      const res = await axios.put(`http://localhost:5000/api/videos/${id}`, video);
      console.log("Update successful:", res.data);
      alert("Video updated successfully!");
      navigate("/"); 
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Failed to update video. Please check console for details.");
    }
  };

  return (
    <div className="upload-form">
      <h2>Edit Video</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          value={video.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={video.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="videoUrl"
          value={video.videoUrl}
          onChange={handleChange}
          placeholder="Video URL"
          required
        />
        <input
          type="text"
          name="thumbnailUrl"
          value={video.thumbnailUrl}
          onChange={handleChange}
          placeholder="Thumbnail URL"
        />
        <button type="submit">Update Video</button>
      </form>
    </div>
  );
};

export default EditForm;
