import { useEffect } from "react";
import Navbar from "../layout/Navbar.js";
import Footer from "../layout/Footer.jsx";
import "./DivaFFMPEG.css";

import Diva from "../../resources/art/diva ffmpeg page graphics/Diva FFMPEG.gif";
import Frontpage from "../../resources/art/diva ffmpeg page graphics/frontpage.gif";
import VideoTools from "../../resources/art/diva ffmpeg page graphics/video_tools.gif";

import Overview     from "../../resources/art/Background Project/Gradients/Overview Inactive.gif";
import Features     from "../../resources/art/Background Project/Gradients/Features Inactive.gif";
import Architecture from "../../resources/art/Background Project/Gradients/Architecture Inactive.gif";

const sections = [
  {
    gif: VideoTools,
    alt: "Video Processing",
    label: "Video Processing",
    tag: "vp",
    items: [
      "Video conversion - swap formats without memorizing codec incantations",
      "Video compression - real compress slider, live progress bar, no guessing",
      "Trim and merge - cut what you don't need, stitch together what you do",
      "Resolution and FPS presets - 360p to 4k, and 24fps to 120fps",
    ],
  },
  {
    gif: null,
    alt: "Image Processing",
    label: "Image Processing",
    tag: "ip",
    inProgress: true,
    items: [
      "In progress - image conversion and processing tools are being built out",
    ],
  },
  {
    gif: null,
    alt: "Audio Processing",
    label: "Audio Processing",
    tag: "ap",
    flip: true,
    inProgress: true,
    items: [
      "In progress - audio conversion and processing tools are being built out",
    ],
  },
];

const DivaFFMPEG = () => {
  useEffect(() => {
    document.title = "DivaFFMPEG";
  }, []);

  return (
    <div className="diva-ffmpeg-container">
      <Navbar />

      <h1>
        <a
          href="https://github.com/Marqed4/DivaFFMPEG"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={Diva}
            className="diva-ffmpeg-icon"
            alt="DivaFFMPEG"
          />
        </a>
      </h1>
      
      <p className="diva-ffmpeg-description">A terminal UI wrapper around ffmpeg, because typing flags is beneath her.</p>
      <p className="diva-ffmpeg-description">Convert, compress, trim, and merge your video. Point, select, done.</p>

      <img src={Frontpage} className="diva-ffmpeg-hero" alt="DivaFFMPEG front page" />

      <div className="diva-ffmpeg-views">
        {sections.map(({ gif, alt, label, tag, flip, inProgress, items }) => (
          <div
            key={tag}
            className={`diva-ffmpeg-view-section${flip ? " diva-ffmpeg-view-section--flip" : ""}${!gif ? " diva-ffmpeg-view-section--textonly" : ""}`}
          >
            {gif && <img src={gif} className="diva-ffmpeg-screenshot" alt={alt} />}
            <div className="diva-ffmpeg-view-docs">
              <p className="diva-ffmpeg-view-label">
                {label}
                {inProgress && <span className="diva-ffmpeg-progress-badge">In Progress</span>}
              </p>
              <ul className="diva-ffmpeg-view-list">
                {items.map((item, i) => {
                  const [bold, ...rest] = item.split(" - ");
                  return (
                    <li key={i}>
                      <span className="diva-ffmpeg-tag">{tag}.{i + 1}</span>
                      {rest.length ? (
                        <><strong>{bold}</strong>{" - "}{rest.join(" - ")}</>
                      ) : (
                        bold
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="diva-ffmpeg-content">
        <div className="diva-ffmpeg-layout-overview">
          <h2 className="diva-ffmpeg-overview-header">
            <img src={Overview} className="overview-header" alt="Overview" />
          </h2>
          <p className="overview-body">
            <strong>DivaFFMPEG</strong> is a <strong>Rust</strong> terminal UI built on{" "}
            <strong>ratatui</strong> and <strong>crossterm</strong>, wrapping ffmpeg's CLI
            in a point-and-select interface.<br /><br />
            Pick a file, choose an operation, and DivaFFMPEG builds and runs the ffmpeg
            command for you, with live progress instead of raw log scroll.
          </p>
        </div>

        <div className="diva-ffmpeg-layout-features">
          <h2 className="diva-ffmpeg-features-header">
            <img src={Features} className="features-header" alt="Features" />
          </h2>
          <p className="features-body">
            • <strong>Video conversion</strong> - swap formats without memorizing codec flags<br /><br />
            • <strong>Video compression</strong> - real compress slider with live progress bar<br /><br />
            • <strong>Trim and merge</strong> - cut what you don't need, stitch what you do<br /><br />
            • <strong>Resolution and FPS presets</strong> - 360p to 4k, 24fps to 120fps<br /><br />
            • <strong>Image processing</strong> - in progress<br /><br />
            • <strong>Audio processing</strong> - in progress
          </p>
        </div>

        <div className="diva-ffmpeg-layout-architecture">
          <h2 className="diva-ffmpeg-architecture-header">
            <img src={Architecture} className="architecture-header" alt="Architecture" />
          </h2>
          <p className="architecture-body">
            ratatui / crossterm<br />
            (Terminal UI)<br />
            ↓<br /><br />
            ansi-to-tui / lipgloss<br />
            (Styling)<br />
            ↓<br /><br />
            ffmpeg<br />
            (Media processing)
          </p>
        </div>
      </div>

      <p className="diva-ffmpeg-ethics">
        DivaFFMPEG takes zero liability for whatever you point it at. Your files, your choices.
      </p>

      <Footer />
    </div>
  );
};

export default DivaFFMPEG;
