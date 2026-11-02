import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import NotFound from "./components/pages/not-found.jsx";

import './app.css';

// <---- Landing Page ---->
import './components/layout/icon.css';
import './components/layout/navbar.css';
import './components/layout/footer.css'
import './components/pages/home/home-body.css';
import './components/pages/home/home-portfolio.css'
import './components/pages/home/home-text.css';
import './components/pages/home/media/home-edits.css';
import './components/pages/home/media/home-shorts.css';
import './components/pages/home/media/media-previews.css';

// <---- Landing Page ---->
import Home from "./components/pages/home/home.js";

// <---- Details Page ---->
import './components/pages/details.css';
import Details from "./components/pages/details.js";

// <---- Projects Page ---->
import './components/pages/projects.css';
import Projects from "./components/pages/projects.js";

// <---- Gallery Page ---->
import './components/pages/gallery.css';
import Gallery from "./components/pages/gallery.js";

// <---- Resume Page ---->
import './components/pages/resume.css';
import Resume from "./components/pages/resume.js";

// <---- Diva FFMPEG Page ---->
import './components/projects/diva-ffmpeg.css';
import DivaFFMPEG from "./components/projects/diva-ffmpeg.js";

// <---- Sudoku Proj Page ---->
import './components/projects/solve-sudoku.css';
import Sudoku from "./components/projects/solve-sudoku.js";

// <---- Custom Calendar Proj Page ---->
import './components/projects/calisigh.css';
import Calisigh from "./components/projects/calisigh.js";

// <---- PopularVote Proj Page ---->
import './components/projects/popular-vote.css';
import PopularVote from "./components/projects/popular-vote.js";

// <---- Time Rabbit Proj Page ---->
import './components/projects/time-rabbit.css';
import TimeRabbit from "./components/projects/time-rabbit.js";

// <---- CodePath Page (url-only, no nav link) ---->
import './components/pages/code-path.css';
import CodePath from "./components/pages/code-path.js";

// <---- PopularVote Time Log Page (url-only, no nav link) ---->
import './components/cisc-4900/cisc4900-popular-vote-time-log.css';
import PopularVoteTimeLog from "./components/cisc-4900/cisc4900-popular-vote-time-log.js";

// <---- CISC 4900 PopularVote Page ---->
import './components/cisc-4900/cisc4900-popular-vote.css';
import CISC4900PopularVote from "./components/cisc-4900/cisc4900-popular-vote.js";

// <---- CISC 4900 PopularVote PowerPoint Page (url-only, no nav link) ---->
import './components/cisc-4900/cisc4900-power-point.css';
import CISC4900PowerPoint from "./components/cisc-4900/cisc4900-power-point.js";

import DefaultBackground from "./resources/art/background-project/gradients/site.gif";

const App = () => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 40, damping: 20, mass: 0.5 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const bgX = useTransform(x, (v) => v * -14);
  const bgY = useTransform(y, (v) => v * -14);
  const contentX = useTransform(x, (v) => v * -50);
  const contentY = useTransform(y, (v) => v * -50);

  useEffect(() => {
    const handleMouseMove = (e) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawX, rawY]);

  return (
    <>
      <motion.img
        src={DefaultBackground}
        alt=""
        className="home-bg"
        style={{ x: bgX, y: bgY }}
      />
      <motion.div style={{ x: contentX, y: contentY }}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Details" element={<Details/>} />
          <Route path="/Resume" element={<Resume/>} />
          <Route path="/Projects" element={<Projects/>} />
          <Route path="/Gallery" element={<Gallery/>} />
          <Route path="/TimeRabbit" element={<TimeRabbit/>} />
          <Route path="/Calisigh" element={<Calisigh/>} />
          <Route path="/PopularVote" element={<PopularVote/>} />
          <Route path="/Sudoku" element={<Sudoku/>} />
          <Route path="/DivaFFMPEG" element={<DivaFFMPEG/>} />
          <Route path="/CodePath" element={<CodePath/>} />
          <Route path="/CISC-4900-PopularVote-TimeLog" element={<PopularVoteTimeLog/>} />
          <Route path="/CISC-4900-PopularVote-PowerPointPresentation" element={<CISC4900PowerPoint/>} />
          <Route path="/CISC-4900-PopularVote" element={<CISC4900PopularVote/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </motion.div>
    </>
  );
};

export default App;