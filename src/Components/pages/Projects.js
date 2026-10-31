import { useEffect } from "react";
import Navbar from "../layout/Navbar.js";
import Footer from "../layout/Footer.jsx"
import "./Projects.css";

import ProjectsInactive from "../../resources/art/projects page graphics/Projects Inactive.gif"
import ProjectsActive from "../../resources/art/projects page graphics/Projects Active.gif"

import ExternalLinkButton from "../../resources/art/projects page graphics/External Link Button.gif"
import ExternalRepoButton from "../../resources/art/projects page graphics/External Repo Button.gif"

import DivaFFMPEGLogo from "../../resources/art/diva ffmpeg page graphics/diva_icon.gif";
import CalisighLogo from "../../resources/art/calisigh page graphics/icon.png";
import PopularVoteLogo from "../../resources/art/popularvote page graphics/Favicon.png"
import SudokuLogo from "../../resources/art/sudoku page graphics/Favicon.png"
import TimeRabbitLogo from "../../resources/art/time rabbit page graphics/Time_Rabbit.png"

// Currently mentioned project list. 
const ProjectsArray = [
  // Calisigh
  {
    id: 1,
    logo: CalisighLogo,
    title: "Calisigh",
    repository: "https://github.com/Marqed4/Calisigh",
    description: "A feature‑rich Midwestern-emo calendar\n" +
    "Open it, add your events, choose your themes, and self-loath...",
  },
  // PopularVote
  {
    id: 2,
    logo: PopularVoteLogo,
    link: "https://popularvote.marqed.it",
    repository: "https://github.com/Marqed4/PopularVote",
    title: "PopularVote",
    description: "Private query session w/ AI forked clustering/condensing\n",
  },
  // CISC 4900 - PopularVote
  {
    id: 3,
    logo: PopularVoteLogo,
    repository: "https://github.com/Marqed4/CISC-4900-PopularVote",
    title: "CISC-4900-PopularVote",
    description: "CISC 4900 capstone build of PopularVote\n" +
    "Flask/SocketIO backend, Gemini clustering, and a full time log",
  },
  // Diva FFMPEG
  {
    id: 4,
    logo: DivaFFMPEGLogo,
    repository: "https://github.com/Marqed4/DivaFFMPEG",
    title: "Diva FFMPEG",
    description: "Beautiful multimedia control. \n Transforming ffmpeg's CLI into the Diva TUI experience.",
  },
  // Sudoku
  {
    id: 5,
    logo: SudokuLogo,
    link: "https://sudoku.marqed.it",
    repository: "https://github.com/Marqed4/Sudoku",
    title: "Sudoku",
    description: "A full‑stack Sudoku solver, scanner, and generator\n",
  },
  // Time Rabbit
  {
    id: 6,
    logo: TimeRabbitLogo,
    repository: "https://github.com/Marqed4/TimeRabbit",
    title: "TimeRabbit",
    description: "A simple stopwatch app\n",
  },
];

/*
Each project will contain it's own data. 
Redirecting the user to a page with more about that project.
*/
const Projects = () => {
  useEffect(() => {
    document.title = "Marqed's Projects";
  }, []);
  return (
    <>
      <Navbar />
      <div className="projects-page">
        <img src={ProjectsInactive}
        className="projects-header"
        alt="Projects"
        />
        <div className="projects-grid">
            {ProjectsArray.map((project) => (
              <div key={project.id} className="project-wrapper">
                {/* Link to project website or standalone download page */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="external-link-btn external-btn-slot-1"
                  >
                    <img
                      src={ExternalLinkButton}
                      alt={project.title + " live site"}
                      className="external-link-btn external-btn-slot-1"
                    />
                  </a>
                )}

                {/* Link to project repository */}
                {project.repository && (
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`external-repo-btn ${project.link ? "external-btn-slot-2" : "external-btn-slot-1"}`}
                  >
                    <img
                      src={ExternalRepoButton}
                      alt={project.title + " repository"}
                      className={`external-repo-btn ${project.link ? "external-btn-slot-2" : "external-btn-slot-1"}`}
                    />
                  </a>
                )}

                {/* Project title, logo, and description */}
                <a
                  href={"/" + project.title.replace(/\s+/g, "")}
                  className="project-card"
                >
                  <img
                    src={project.logo}
                    alt={project.title + "-logo"}
                    className="project-logo"
                  />
                  <h2 className="project-name">{project.title}</h2>
                  <p className="project-description">{project.description}</p>
                </a>
                
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Projects;
export { ProjectsInactive, ProjectsActive };