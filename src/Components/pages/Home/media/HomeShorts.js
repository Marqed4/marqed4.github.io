import { useState } from "react"

import ShowShortsInactive from "../../../../resources/art/Background Project/Gradients/Show Shorts Inactive.gif"
import HideShortsActive from "../../../../resources/art/Background Project/Gradients/Hide Shorts Active.gif"

const HomeShorts = ({ isOpen, onToggle }) => {
    const [activeVideo, setActiveVideo] = useState(null);

    const shorts = [
        { label: "Reminder to Play Arena", 
            src: "https://www.youtube.com/embed/mNvd5N3SSRU?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/mNvd5N3SSRU/0.jpg" },
        { label: "Sound of Satisfaction", 
            src: "https://www.youtube.com/embed/QbQ-N624Gto?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/QbQ-N624Gto/0.jpg" },
        { label: "Fight to Complete", 
            src: "https://www.youtube.com/embed/c-t6Ib9lZUE?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/c-t6Ib9lZUE/0.jpg" },
        { label: "Shooter Born IS FINISHED", 
            src: "https://www.youtube.com/embed/JmvEbpEz-mU?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/JmvEbpEz-mU/0.jpg" },
        { label: "That's Fudged", 
            src: "https://www.youtube.com/embed/NR4r5sYzOn8?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/NR4r5sYzOn8/0.jpg" },
            { label: "Tagilla & His Scav Legion", 
            src: "https://www.youtube.com/embed/cG7T08rHpTg?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/cG7T08rHpTg/0.jpg" },
        { label: "SheefGG: Girl", 
            src: "https://www.youtube.com/embed/lEXU3O-rGRk?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/lEXU3O-rGRk/0.jpg" },
        { label: "He is CHEATING!", 
            src: "https://www.youtube.com/embed/1E5PjWjz4mE?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/1E5PjWjz4mE/0.jpg" }, 
        { label: "Tarkov Vibes...", 
            src: "https://www.youtube.com/embed/xSHgu3qcpZs?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/xSHgu3qcpZs/0.jpg" },
        { label: "Star Called Sun Achievement", 
            src: "https://www.youtube.com/embed/KHp9810L2kY?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/KHp9810L2kY/0.jpg" },
        { label: "RShG-2 Rocket Launcher", 
            src: "https://www.youtube.com/embed/vBLQ_IDgVjQ?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/vBLQ_IDgVjQ/0.jpg" },
        { label: "Rocket Launcher 2", 
            src: "https://www.youtube.com/embed/0aLMXMUz2Ak?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/0aLMXMUz2Ak/0.jpg" },
        { label: "Streets Gunslinger", 
            src: "https://www.youtube.com/embed/wxweVKMYvfA?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/wxweVKMYvfA/0.jpg" },
        { label: "Don't Interupt Killa Farming", 
            src: "https://www.youtube.com/embed/8co2NI21YsU?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/8co2NI21YsU/0.jpg" },
        { label: "Happy Mistakes", 
            src: "https://www.youtube.com/embed/trhYaVgBnf4?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/trhYaVgBnf4/0.jpg" },
        { label: "Rat Pack", 
            src: "https://www.youtube.com/embed/qsobaG9bi2Q?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/qsobaG9bi2Q/0.jpg" },
        { label: "Flashlight Abuser?", 
            src: "https://www.youtube.com/embed/OjTmRUKTeME?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/OjTmRUKTeME/0.jpg" },
        { label: "Beware of Lasers", 
            src: "https://www.youtube.com/embed/GxBLqCUPZtQ?autoplay=1", 
            thumbnail: "https://img.youtube.com/vi/GxBLqCUPZtQ/0.jpg" },
    ];

    const X = shorts.length;
    const Y = Math.floor(5 + X / 10);

    return (
        <div className="ShortsContainer">
            <div className="ShortsDropdown">
                <button className="dropdown-toggle-shorts" onClick={onToggle}>
                    {isOpen
                        ? <img src={HideShortsActive} alt="Hide Shorts" />
                        : <img src={ShowShortsInactive} alt="Show Shorts" />
                    }
                </button>

                {!activeVideo && (
                    <div
                        className={`dropdown-list-shorts ${isOpen ? "open" : ""}`}
                        style={{ gridTemplateColumns: `repeat(${Y}, 1fr)` }}
                    >
                        {shorts.map((video) => (
                            <div
                                key={video.label}
                                className="video-player-item-shorts"
                                onClick={() => setActiveVideo(video)}
                            >
                                <img src={video.thumbnail} alt={video.label} className="shorts-thumbnail" />
                                <span className="play-button-shorts">Preview {video.label} 🎥</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="ShortsWindow">
                {activeVideo && (
                    <div className="video-container-shorts">
                        <button className="play-button-shorts" onClick={() => setActiveVideo(null)}>✕ Stop</button>
                        <iframe
                            width="315"
                            height="560"
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

export default HomeShorts;