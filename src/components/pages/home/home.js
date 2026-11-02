import { useEffect, useState } from "react";

import HomeBanner from "../../../resources/art/background-project/gradients/orange-glob-marble.gif"
import Navbar from "../../layout/navbar.js"
import Footer from "../../layout/footer.jsx"
import MediaPreviews from "./media/media-previews.js"
import { ProjectsInactive, ProjectsActive } from "../projects.js";
import { GalleryInactive, GalleryActive } from "../gallery.js";

function HomeItem({ labelActive, labelInactive, iconActive, iconInactive, labelClass, iconClass, hovered }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", flexShrink: 0, pointerEvents: "none" }}>
      <img
        src={hovered ? labelActive : labelInactive}
        alt=""
        className={labelClass}
        style={{ display: "block", pointerEvents: "none" }}
      />
      <img
        src={hovered ? iconActive : iconInactive}
        alt=""
        className={iconClass}
        style={{ position: "absolute", pointerEvents: "none" }}
      />
    </span>
  );
}

const Home = () => {

  const [projectsHovered, setProjectsHovered] = useState(false);
  const [galleryHovered, setGalleryHovered] = useState(false);

  useEffect(() => {
  document.title = "Marqed's Homepage";
  }, []);

  return ( 
    <>
      <div className="home-container">
        {/* <Icon/> */}
        <Navbar/>
        <img src={HomeBanner} alt="" className="home-banner-bg" />
        <div className="home-banner-mirror-top" aria-hidden="true">
          <img src={HomeBanner} alt="" />
        </div>
        <div className="home-banner-mirror-right" aria-hidden="true">
          <img src={HomeBanner} alt="" />
        </div>
        <div className="home-banner-mirror-corner" aria-hidden="true">
          <img src={HomeBanner} alt="" />
        </div>

        <div className="home-content">
          <div className="home-card">
            <p>
            Hi, I’m Zach, though most people online know me as Marqed.<br /><br />
            I’m an aspiring professional developer who builds full-stack apps and desktop tools. This site is where I share that work, along with a few creative side projects.
            </p>
          </div>
          <div className="home-card">
            <p className="home-card-label">Featured project</p>
            <p>
            <strong>PopularVote</strong> is a live, anonymous Q&amp;A tool. Participants ask freely, AI clusters similar questions by meaning, and hosts answer themes instead of noise.
            </p>
            <p className="home-links">
              <a href="https://popularvote.marqed.it" target="_blank" rel="noopener noreferrer">Live site</a>
              {" · "}
              <a href="/PopularVote">Case study</a>
              {" · "}
              <a href="https://github.com/Marqed4/PopularVote" target="_blank" rel="noopener noreferrer">GitHub</a>
            </p>
          </div>
          <div className="home-card">
            <p className="home-card-label">Get in touch</p>
            <p className="home-links">
              <a href="mailto:zacherywfrancis@gmail.com">Email me</a>
              {" · "}
              <a href="https://www.linkedin.com/in/zachery-francis/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              {" · "}
              <a href="/Resume">Resume</a>
            </p>
          </div>
          <div className="home-card portfolio-card">
            <div className="portfolio-buttons">
              <a href="/Projects">
                <div className="portfolio-container-projects"
                  onMouseEnter={() => setProjectsHovered(true)}
                  onMouseLeave={() => setProjectsHovered(false)}
                 >
                 <HomeItem
                  labelActive={ProjectsActive}
                  labelInactive={ProjectsInactive}
                  labelClass="projects-button"
                  hovered={projectsHovered}
                 />
                </div>
              </a>
              <a href="/Gallery">
                <div className="portfolio-container-gallery"
                  onMouseEnter={() => setGalleryHovered(true)}
                  onMouseLeave={() => setGalleryHovered(false)}
                >
                  <HomeItem
                    labelActive={GalleryActive}
                    labelInactive={GalleryInactive}
                    labelClass="gallery-button"
                    hovered={galleryHovered}
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;