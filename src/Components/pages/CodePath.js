import { useEffect } from "react";
import Navbar from "../layout/Navbar.js"
import Footer from "../layout/Footer.jsx"
import HomeIcon from "../layout/Icon.js";
import "./CodePath.css"

const videos = [
  {
    label: "Why do you want to be a TF, and what will you bring to a breakout room?",
    description: "Answering why I want to be a Technical Facilitator and what I'd bring to a breakout room.",
    src: "https://www.youtube.com/embed/38mkMB1iVo4",
  },
  {
    label: "Tell us about a time you helped a peer understand something hard...?",
    description: "Sharing a time I helped a peer work through a concept they were stuck on.",
    src: "https://www.youtube.com/embed/LVTRWfyCxQk",
  },
];

const CodePath = () => {

    useEffect(() => {
        document.title = "CodePath";
    }, []);

    return (
    <>
        <div className="codepath-container">
            <HomeIcon />
            <Navbar />

            {/* Tha video embeds */}
            <div className="codepath-video-row">
            {videos.map((video) => (
                <div key={video.label} className="codepath-video-item">
                <div className="codepath-video-frame">
                    <iframe
                    src={video.src}
                    title={video.label}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    />
                </div>
                <h2 className="codepath-video-title">{video.label}</h2>
                <p className="codepath-video-description">{video.description}</p>
                </div>
            ))}
            </div>
        </div>
        <Footer />
    </>
  );
};

export default CodePath;
