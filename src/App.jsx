import VideoDetails from "./components/VideoDetails";
import Notes from "./components/Notes";
import CommentSection from "./components/CommentSection";

function App() {
  const videoId = "MNkF3DbIUWE";

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <VideoDetails videoId={videoId} />
      <Notes />
      <CommentSection videoId={videoId} />
    </div>
  );
}

export default App;
