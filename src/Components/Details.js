import { useEffect } from "react";
import Navbar from "./Navbar.js"
import Footer from "./Footer.jsx"
import DetailsNavbarInactive from "../resources/art/details page graphic header/Details Navbar Inactive.gif"
import ContactDetailsInactive from "../resources/art/details page graphic header/Contacts Details Inactive.gif"
import EducationDetailsInactive from "../resources/art/details page graphic header/Education Details Inactive.gif"
import InterestsDetailsInactive from "../resources/art/details page graphic header/Interests Details Inactive.gif"
import EditingSoftwareDetailsInactive from "../resources/art/details page graphic header/Editing Software Details Inactive.gif"
import CodingLangFrameworkDetailsInactive from "../resources/art/details page graphic header/Tech Stack.gif"
import ResumeDetailsInactive from "../resources/art/details page graphic header/Resume Details Inactive.gif"

function copy(text) {
  navigator.clipboard.writeText(text).then(() => {
  alert("Copied: " + text);
  });
}

let profEmail   = "zacherywfrancis@gmail.com"
let freelEemail = "marqers7@gmail.com";

const Details = () => {

  useEffect(() => {
    document.title = "Marqed's Details";
  }, []);

  // Hyperlink the email/mailto:

  return (
    <>
      <div className="details-container">
        <Navbar/>
        <h1><img src={DetailsNavbarInactive} className="details-header" alt="Details" /></h1>

        <div className="details-content">

          <div className="details-left-column">
            <div className="details-layout-emails">
              <h2 className="details-emails-header">
                <img src={ContactDetailsInactive} className="contacts-header" alt="Contacts" />
              </h2>
              <p className="contacts-body">
                <button onClick={() => copy(profEmail)} className="copy-button">📋 <u>Professional Email</u></button><br/>
                <button onClick={() => copy(freelEemail)} className="copy-button">📋 <u>Freelance Email</u></button><br/>
                <a href="https://www.linkedin.com/in/zachery-francis/">Visit Linkedin</a>
              </p>
            </div>

            <div className="details-layout-resume">
              <h2 className="details-resume-header">
                <img src={ResumeDetailsInactive} className="details-resume-img" alt="Resume" />
              </h2>
              <p className="resume-body">
                <a href="/Resume" target="_blank" rel="noopener noreferrer">
                  <u>View Resume</u>
                </a>
                <br/>
                <a href="../documents/Zachery_Francis-June_2026.pdf" download>
                  <u>Download Resume</u>
                </a>
              </p>
            </div>
          </div>

          <div className="education-and-skills">
            <div className="details-layout-edu">
              <h2 className="details-education-header">
                <img src={EducationDetailsInactive} className="education-header" alt="Education" />
              </h2>
              <p className="education-body">
                Brooklyn College<br/>
                • M.S. in Computer Science, Concentration: Information Systems<br/><br/>
                Brooklyn College<br/>
                • B.S. in Information Systems, Minor: Computer Science<br/>
                • B.S. in Business Management<br/><br/>
                Kingsborough Community College<br/>
                • A.A. in Liberal Arts
              </p>
            </div>

            <div className="details-layout-coding-lang-framework">
              <h2 className="details-skills-lang-framework">
                <img src={CodingLangFrameworkDetailsInactive} className="coding-lang-framworks-header" alt="CodingLangFrameworks" />
              </h2>
              <p className="coding-lang-framworks-body">
                <span className="skill-line">• Java / Oracle JDK 23/25</span><br/>
                <span className="skill-line">• Python / Python 3.13 <span className="studying-tag">Studying</span></span><br/>
                <span className="skill-line">• React / React 11.9 (HTML, JS, CSS) <span className="studying-tag">Studying</span></span><br/>
                <span className="skill-line">• Rust <span className="studying-tag">Studying</span></span><br/>
                <span className="skill-line">• SQL / PostgreSQL <span className="studying-tag">Studying</span></span><br/>
              </p>
            </div>

            <div className="details-layout-editing-software">
              <h2 className="details-skills-edit-software">
                <img src={EditingSoftwareDetailsInactive} className="editing-software-header" alt="EditingSoftware" />
              </h2>
              <p className="editing-software-body">
                • Adobe After Effects<br/>
                • Adobe Premiere Pro<br/>
                • Adobe Media Encoder<br/>
                • Sony Vegas Pro<br/>
              </p>
            </div>
          </div>

          <div className="details-layout-int">
            <h2 className="details-interests-header">
              <img src={InterestsDetailsInactive} className="interests-header" alt="interests" />
            </h2>
            <p className="interests-body">
            To me, programming and technology serve as excellent tools through which I can express myself and be creative.<br/>
            In particular, when it comes to coding, I see it not only as a tool but also as an opportunity to resolve challenging issues and create something using my personal style in programming.<br/>
            Technology suits me well because I have all the necessary instruments that I need for creating.
            </p>
          </div>

        </div>
      </div>
    <Footer />
  </>
  );
};

export default Details;