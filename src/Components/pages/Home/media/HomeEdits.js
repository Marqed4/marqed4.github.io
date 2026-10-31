import { useState } from "react"

import ShowEditsInactive from "../../../../resources/art/Background Project/Gradients/Show Edits Inactive.gif"
import HideEditsActive from "../../../../resources/art/Background Project/Gradients/Hide Edits Active.gif"

const HomeEdits = ({ isOpen, onToggle, onVideoActive }) => {
    const [activeVideo, setActiveVideo] = useState(null);

    const handleSetVideo = (video) => {
        setActiveVideo(video);
        onVideoActive?.(!!video);
    };

    const videos = [
        { label: "Demands", 
            src: "https://www.youtube.com/embed/wHkem_qWhiE?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/W3CCeSd-FCE/0.jpg" },
        { label: "Sunday", 
            src: "https://www.youtube.com/embed/DiEGh5E8gKQ?autoplay=1",
            thumbnail: "https://img.youtube.com/vi/DiEGh5E8gKQ/0.jpg" },
        { label: "Secular", 
            src: "https://www.youtube.com/embed/y64mTTbF0ZI?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/y64mTTbF0ZI/0.jpg" },
        { label: "Affirmations", 
            src: "https://www.youtube.com/embed/Dkod0mEfCJM?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/Dkod0mEfCJM/0.jpg" },
        { label: "Crashout", 
            src: "https://www.youtube.com/embed/rVRhJjQAvQc?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/rVRhJjQAvQc/0.jpg" },
        { label: "Bubble Slice", 
            src: "https://www.youtube.com/embed/gSVWBqhQS4w?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/gSVWBqhQS4w/0.jpg" },
        { label: "Two Sixty", 
            src: "https://www.youtube.com/embed/9mwm132viYc?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/9mwm132viYc/0.jpg" },
        { label: "Lonely LFG Gamer", 
            src: "https://www.youtube.com/embed/4iea-bE19Ck?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/4iea-bE19Ck/0.jpg" },
    ];

    const X = videos.length;
    const Y = Math.floor(2 + X / 10);

    return (
        <div className="EditsContainer">
            <div className="EditsDropdown">
                <button className="dropdown-toggle-edits" onClick={onToggle}>
                    {isOpen
                        ? <img src={HideEditsActive} alt="Hide Edits" />
                        : <img src={ShowEditsInactive} alt="Show Edits" />
                    }
                </button>

                {!activeVideo && (
                    <div
                        className={`dropdown-list-edits ${isOpen ? "open" : ""}`}
                        style={{ gridTemplateColumns: `repeat(${Y}, 1fr)` }}
                    >
                        {videos.map((video) => (
                            <div
                                key={video.label}
                                className="video-player-item-edits"
                                onClick={() => handleSetVideo(video)}
                            >
                                <img src={video.thumbnail} alt={video.label} className="video-thumbnail" />
                                <span className="play-button-edits">Preview {video.label} 🎥</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="EditsWindow">
                {activeVideo && (
                    <div className="video-container-edits">
                        <button className="play-button-edits" onClick={() => handleSetVideo(null)}>✕ Stop</button>
                        <iframe
                            width="560"
                            height="315"
                            src={activeVideo.src}
                            title={activeVideo.label}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeEdits;