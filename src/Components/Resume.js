import { useEffect } from "react";
import Icon from "./Icon.js";
import Navbar from "./Navbar.js";

const RESUME_URL = `${process.env.PUBLIC_URL}/documents/ZacheryFrancis Resume 10-4-2026.pdf`;

const Resume = () => {
  useEffect(() => {
    document.title = "Zachery Francis - Resume";
  }, []);

  return (
    <div className="resume-container">
      <Icon />
      <Navbar />

      <a className="resume-download" href={RESUME_URL} download>
        Download .pdf
      </a>

      <iframe
        className="resume-pdf-viewer"
        src={`${RESUME_URL}#toolbar=0&navpanes=0`}
        title="Zachery Francis Resume"
      />
    </div>
  );
};

export default Resume;
