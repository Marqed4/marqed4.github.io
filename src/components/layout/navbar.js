import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import GospelAudio from "../../resources/sound/gospel.mp3";
import SpellAudio from "../../resources/sound/spell.mp3";
import LeniAudio from "../../resources/sound/leni.mp3";
import OnlinePersonaAudio from "../../resources/sound/online-persona.mp3"

import MusicToggleOn from "../../resources/art/navbar/emoji/music-on.gif";
import MusicToggleOff from "../../resources/art/navbar/emoji/music-off.gif"; 

import HomeNavbarActive from "../../resources/art/navbar/graffiti/home-navbar-active.gif";
import HomeNavbarInactive from "../../resources/art/navbar/graffiti/home-navbar-inactive.gif";
import DetailsNavbarActive from "../../resources/art/navbar/graffiti/details-navbar-active.gif";
import DetailsNavbarInactive from "../../resources/art/navbar/graffiti/details-navbar-inactive.gif";
import YoutubeNavbarActive from "../../resources/art/navbar/graffiti/youtube-navbar-active.gif";
import YoutubeNavbarInactive from "../../resources/art/navbar/graffiti/youtube-navbar-inactive.gif";
import GithubNavbarActive from "../../resources/art/navbar/graffiti/github-navbar-active.gif";
import GithubNavbarInactive from "../../resources/art/navbar/graffiti/github-navbar-inactive.gif";
import EditsNavbarActive from "../../resources/art/navbar/graffiti/edits-navbar-active.gif";
import EditsNavbarInactive from "../../resources/art/navbar/graffiti/edits-navbar-inactive.gif";
import ShortsNavbarActive from "../../resources/art/navbar/graffiti/shorts-navbar-active.gif";
import ShortsNavbarInactive from "../../resources/art/navbar/graffiti/shorts-navbar-inactive.gif";

import HomeIconActive from "../../resources/art/navbar/emoji/home-active.gif";
import HomeIconInactive from "../../resources/art/navbar/emoji/home-inactive.gif";
import DetailsIconActive from "../../resources/art/navbar/emoji/details-active.gif";
import DetailsIconInactive from "../../resources/art/navbar/emoji/details-inactive.gif";
import YoutubeIconActive from "../../resources/art/navbar/emoji/youtube-active.gif";
import YoutubeIconInactive from "../../resources/art/navbar/emoji/youtube-inactive.gif";
import GithubIconActive from "../../resources/art/navbar/emoji/github-active.gif";
import GithubIconInactive from "../../resources/art/navbar/emoji/github-inactive.gif";

function NavItem({ labelActive, labelInactive, iconActive, iconInactive, labelClass, iconClass, hovered }) {
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

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeHovered, setHomeHovered] = useState(false);
  const [detailsHovered, setDetailsHovered] = useState(false);
  const [youtubeHovered, setYoutubeHovered] = useState(false);
  const [githubHovered, setGithubHovered] = useState(false);
  const [editsHovered, setEditsHovered] = useState(false);
  const [shortsHovered, setShortsHovered] = useState(false);

  const [musicEnabled, setMusicEnabled] = useState(() => {
  const stored = localStorage.getItem("musicEnabled");
  return stored === null ? true : stored === "true";
  });

  const SpellRef = useRef(null);
  const GospelRef = useRef(null);
  const LeniRef = useRef(null);
  const OnlinePersonaRef = useRef(null);

  const stopHoverAudio = () => {
    [SpellRef, GospelRef, LeniRef, OnlinePersonaRef].forEach(ref => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });
  };

  const playGospel = () => {
    if (!musicEnabled) return;
    stopHoverAudio();
    GospelRef.current = new Audio(GospelAudio);
    GospelRef.current.volume = 0.05;
    GospelRef.current.play().catch((err) => console.log("Audio play failed:", err));
  };

  const playOnlinePersona = () => {
    if (!musicEnabled) return;
    stopHoverAudio();
    OnlinePersonaRef.current = new Audio(OnlinePersonaAudio);
    OnlinePersonaRef.current.volume = 0.05;
    OnlinePersonaRef.current.play().catch((err) => console.log("Audio play failed:", err));
  };

  const playSpell = () => {
    if (!musicEnabled) return;
    stopHoverAudio();
    SpellRef.current = new Audio(SpellAudio);
    SpellRef.current.volume = 0.03;
    SpellRef.current.play().catch((err) => console.log("Audio play failed:", err));
  };

  const playLeni = () => {
    if (!musicEnabled) return;
    stopHoverAudio();
    LeniRef.current = new Audio(LeniAudio);
    LeniRef.current.volume = 0.03;
    LeniRef.current.play().catch((err) => console.log("Audio play failed:", err));
  };

  const toggleMusic = () => {
    const next = !musicEnabled;
    setMusicEnabled(next);
    localStorage.setItem("musicEnabled", String(next));
    if (!next) stopHoverAudio();
  };

  return (
    <nav>
      <div className="Navbar-links-container">
        <a href="/" className="nav-btn"
          onMouseEnter={() => { setHomeHovered(true); playGospel(); }}
          onMouseLeave={() => { setHomeHovered(false); stopHoverAudio(); }}
        >
          <NavItem
            labelActive={HomeNavbarActive}
            labelInactive={HomeNavbarInactive}
            labelClass="home-button"
            iconActive={HomeIconActive}
            iconInactive={HomeIconInactive}
            iconClass="home-link-icon"
            hovered={homeHovered}
          />
        </a>

        <Link to="/Details" className="nav-btn"
          onMouseEnter={() => { setDetailsHovered(true); playOnlinePersona(); }}
          onMouseLeave={() => { setDetailsHovered(false); stopHoverAudio(); }}
          onClick={stopHoverAudio}
        >
          <NavItem
            labelActive={DetailsNavbarActive}
            labelInactive={DetailsNavbarInactive}
            labelClass="details-button"
            iconActive={DetailsIconActive}
            iconInactive={DetailsIconInactive}
            iconClass="details-link-icon"
            hovered={detailsHovered}
          />
        </Link>

        {/* <div className="dropdown-container"
          onMouseEnter={() => { setYoutubeHovered(true); playSpell(); }}
          onMouseLeave={() => { setYoutubeHovered(false); stopHoverAudio(); }}
        >
          <a href="https://www.youtube.com/Marqed" className="nav-btn">
            <NavItem
              labelActive={YoutubeNavbarActive}
              labelInactive={YoutubeNavbarInactive}
              labelClass="youtube-button"
              iconActive={YoutubeIconActive}
              iconInactive={YoutubeIconInactive}
              iconClass="youtube-link-icon"
              hovered={youtubeHovered}
            />
          </a>
          <div className="dropdown-menu">
            <a href="https://www.youtube.com/Marqed/videos"
              onMouseEnter={() => setEditsHovered(true)}
              onMouseLeave={() => setEditsHovered(false)}
            >
              <NavItem
                labelActive={EditsNavbarActive}
                labelInactive={EditsNavbarInactive}
                labelClass="edits-button"
                iconActive={EditsNavbarActive}
                iconInactive={EditsNavbarInactive}
                iconClass="edits-button"
                hovered={editsHovered}
              />
            </a>
            <a href="https://www.youtube.com/Marqed/shorts"
              onMouseEnter={() => setShortsHovered(true)}
              onMouseLeave={() => setShortsHovered(false)}
            >
              <NavItem
                labelActive={ShortsNavbarActive}
                labelInactive={ShortsNavbarInactive}
                labelClass="shorts-button"
                iconActive={ShortsNavbarActive}
                iconInactive={ShortsNavbarInactive}
                iconClass="shorts-button"
                hovered={shortsHovered}
              />
            </a>
          </div>
        </div> */}

        <a href="https://github.com/Marqed4" className="nav-btn"
          onMouseEnter={() => { setGithubHovered(true); playLeni(); }}
          onMouseLeave={() => { setGithubHovered(false); stopHoverAudio(); }}
        >
          <NavItem
            labelActive={GithubNavbarActive}
            labelInactive={GithubNavbarInactive}
            labelClass="github-button"
            iconActive={GithubIconActive}
            iconInactive={GithubIconInactive}
            iconClass="github-link-icon"
            hovered={githubHovered}
          />
        </a>
      </div>

      <div className="music-toggle" onClick={toggleMusic}>
        <img 
        src={musicEnabled ? MusicToggleOn : MusicToggleOff}
        alt="Toggle music"
        />
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <a href="/" className="nav-btn" onClick={() => setMenuOpen(false)}>
            <NavItem
              labelActive={HomeNavbarActive}
              labelInactive={HomeNavbarInactive}
              labelClass="home-button"
              iconActive={HomeIconActive}
              iconInactive={HomeIconInactive}
              iconClass="home-link-icon"
              hovered={homeHovered}
            />
          </a>
          <Link to="/details" className="nav-btn" onClick={() => setMenuOpen(false)}>
            <NavItem
              labelActive={DetailsNavbarActive}
              labelInactive={DetailsNavbarInactive}
              labelClass="details-button"
              iconActive={DetailsIconActive}
              iconInactive={DetailsIconInactive}
              iconClass="details-link-icon"
              hovered={detailsHovered}
            />
          </Link>
          {/* <a href="https://www.youtube.com/Marqed" className="nav-btn" onClick={() => setMenuOpen(false)}>
            <NavItem
              labelActive={YoutubeNavbarActive}
              labelInactive={YoutubeNavbarInactive}
              labelClass="youtube-button"
              iconActive={YoutubeIconActive}
              iconInactive={YoutubeIconInactive}
              iconClass="youtube-link-icon"
              hovered={youtubeHovered}
            />
          </a> */}
          <a href="https://github.com/Marqed4" className="nav-btn" onClick={() => setMenuOpen(false)}>
            <NavItem
              labelActive={GithubNavbarActive}
              labelInactive={GithubNavbarInactive}
              labelClass="github-button"
              iconActive={GithubIconActive}
              iconInactive={GithubIconInactive}
              iconClass="github-link-icon"
              hovered={githubHovered}
            />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;