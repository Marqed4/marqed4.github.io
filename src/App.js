import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import NotFound from "./Components/pages/NotFound.jsx";

import './App.css';

// <---- Landing Page ---->
import './Components/layout/Icon.css';
import './Components/layout/Navbar.css';
import './Components/layout/Footer.css'
import './Components/pages/Home/HomeBody.css';
import './Components/pages/Home/HomePortfolio.css'
import './Components/pages/Home/HomeText.css';
import './Components/pages/Home/media/HomeEdits.css';
import './Components/pages/Home/media/HomeShorts.css';
import './Components/pages/Home/media/MediaPreviews.css';

// <---- Landing Page ---->
import Home from "./Components/pages/Home/Home";

// <---- Details Page ---->
import './Components/pages/Details.css';
import Details from "./Components/pages/Details";

// <---- Projects Page ---->
import './Components/pages/Projects.css';
import Projects from "./Components/pages/Projects";

// <---- Gallery Page ---->
import './Components/pages/Gallery.css';
import Gallery from "./Components/pages/Gallery";

// <---- Resume Page ---->
import './Components/pages/Resume.css';
import Resume from "./Components/pages/Resume";

// <---- Diva FFMPEG Page ---->
import './Components/projects/DivaFFMPEG.css';
import DivaFFMPEG from "./Components/projects/DivaFFMPEG.js";

// <---- Sudoku Proj Page ---->
import './Components/projects/SolveSudoku.css';
import Sudoku from "./Components/projects/SolveSudoku.js";

// <---- Custom Calendar Proj Page ---->
import './Components/projects/Calisigh.css';
import Calisigh from "./Components/projects/Calisigh.js";

// <---- PopularVote Proj Page ---->
import './Components/projects/PopularVote.css';
import PopularVote from "./Components/projects/PopularVote.js";

// <---- Time Rabbit Proj Page ---->
import './Components/projects/TimeRabbit.css';
import TimeRabbit from "./Components/projects/TimeRabbit.js";

// <---- CodePath Page (url-only, no nav link) ---->
import './Components/pages/CodePath.css';
import CodePath from "./Components/pages/CodePath.js";

// <---- PopularVote Time Log Page (url-only, no nav link) ---->
import './Components/CISC_4900/CISC4900PopularVoteTimeLog.css';
import PopularVoteTimeLog from "./Components/CISC_4900/CISC4900PopularVoteTimeLog.js";

// <---- CISC 4900 PopularVote Page ---->
import './Components/CISC_4900/CISC4900PopularVote.css';
import CISC4900PopularVote from "./Components/CISC_4900/CISC4900PopularVote.js";

// <---- CISC 4900 PopularVote PowerPoint Page (url-only, no nav link) ---->
import './Components/CISC_4900/CISC4900PowerPoint.css';
import CISC4900PowerPoint from "./Components/CISC_4900/CISC4900PowerPoint.js";

import DefaultBackground from "./resources/art/Background Project/Gradients/Site.gif";

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