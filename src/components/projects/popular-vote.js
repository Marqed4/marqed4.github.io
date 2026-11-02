import { useEffect } from "react";
import Navbar from "../layout/navbar.js";
import "./popular-vote.css";

import PopularVoteName   from "../../resources/art/projects/popularvote/popular-vote.gif";
import MainPagePreview   from "../../resources/art/projects/popularvote/main-page-theme-preview.gif";
import LandingView       from "../../resources/art/projects/popularvote/landing-page.gif";
import OpenSessionView   from "../../resources/art/projects/popularvote/open-session.gif";
import HostsScrollDown   from "../../resources/art/projects/popularvote/hosts-scroll-down.gif";
import ParticipantsView  from "../../resources/art/projects/popularvote/participants-view.gif";
import ParticipantScroll from "../../resources/art/projects/popularvote/participant-scroll-down.gif";
import HostsEndSession   from "../../resources/art/projects/popularvote/hosts-end-session-and-summary-pdf-download.gif";

import Overview     from "../../resources/art/background-project/gradients/overview-inactive.gif";
import Features     from "../../resources/art/background-project/gradients/features-inactive.gif";
import Architecture from "../../resources/art/background-project/gradients/architecture-inactive.gif";

const sections = [
  {
    gif: MainPagePreview,
    alt: "Homepage - Day & Night Mode",
    label: "Homepage",
    tag: "hp",
    items: [
      "Day & night mode - toggle between light and dark themes from the top nav",
      "Background selector - choose from a set of custom backgrounds to personalize your view",
      "Fully responsive layout across desktop and mobile",
    ],
  },
  {
    gif: LandingView,
    alt: "Landing Page",
    label: "Start a Session or Jump Into One",
    tag: "lp",
    flip: true,
    items: [
      "Your Sessions panel - lists past sessions with their status (Open, Results, Ended) and tags",
      "Create New Session button - starts a fresh session and enters the host dashboard",
      "Join a Session panel - enter a code, paste a link, or scan a QR code to join as a participant",
      "How it works - link to documentation in the top nav",
    ],
  },
  {
    gif: OpenSessionView,
    alt: "Open Session - Host View",
    label: "Watch the Room Fill Up, in Real Time",
    tag: "os",
    items: [
      "Session code - large display of the unique code to share with your audience",
      "Copy code / Copy link - quick share buttons for the session",
      "QR code - scannable code participants can use to join instantly",
      "Close Submissions button - locks the session and stops new questions from coming in",
      "Trigger Clustering button - runs AI grouping on all submitted questions",
      "Participants / Submissions counters - live count shown in the top right",
    ],
  },
  {
    gif: HostsScrollDown,
    alt: "Host Full View",
    label: "The Host's Full View",
    tag: "hf",
    flip: true,
    items: [
      "Cluster cards - AI-grouped questions sorted by shared meaning, numbered by volume",
      "Show questions toggle - expands to reveal the individual submissions inside a cluster",
      "Response field - click to write a reply that addresses the entire cluster at once",
      "Re-cluster button - re-runs AI grouping if needed",
      "Preview Expansion - preview how results will look to participants before publishing",
      "Trigger Expansion - publishes clusters and responses to all participants",
      "End Session button - permanently closes the session",
    ],
  },
  {
    gif: ParticipantsView,
    alt: "Participants View",
    label: "What Participants See",
    tag: "pv",
    items: [
      "Submit a question field - anonymously ask a question at any time during the session",
      "Character counter - shows remaining characters (500 max) below the input",
      "Your submissions - lists the questions you've personally submitted",
      "Cluster card - shows the AI-generated theme grouping your question landed in",
      "Host response - displayed in green inside the cluster once the host publishes",
      "Upvote buttons - vote on individual questions inside a cluster to surface what matters",
    ],
  },
  {
    gif: ParticipantScroll,
    alt: "Participant Full Scroll",
    label: "The Participant's Full View",
    tag: "ps",
    flip: true,
    items: [
      "Clusters form live - watch your question get grouped as the host triggers clustering",
      "Host responses revealed - read replies per cluster once the host publishes expansion",
      "Upvote round two - dig deeper by upvoting individual questions inside each cluster",
      "Your question indicator - highlights which submission in the cluster is yours",
    ],
  },
  {
    gif: HostsEndSession,
    alt: "End Session & PDF Export",
    label: "Close Out & Take the Results With You",
    tag: "es",
    items: [
      "End Session button - permanently closes the session for all participants",
      "Session summary - full breakdown of every cluster and its host response",
      "PDF export - download a clean summary document to share or archive",
    ],
  },
];

const PopularVote = () => {
  useEffect(() => {
    document.title = "PopularVote";
  }, []);

  return (
    <div className="popular-vote-container">
      <Navbar />

      <h1>
        <a
          href="https://github.com/Marqed4/PopularVote"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={PopularVoteName}
            className="popularvote-calendar-name"
            alt="𝑃𝑜𝑝𝑢𝑙𝑎𝑟𝑉𝑜𝑡𝑒"
          />
        </a>
      </h1>

      <p className="popular-vote-description">Anonymous questions, collectively surfaced.</p>
      <p className="popular-vote-description">
        Open a session, let the room ask anything, cluster the noise into signal,
        and respond to what actually matters.
      </p>

      <div className="popular-vote-views">
        {sections.map(({ gif, alt, label, tag, flip, items }) => (
          <div
            key={tag}
            className={`popular-vote-view-section${flip ? " popular-vote-view-section--flip" : ""}`}
          >
            <img src={gif} className="popular-vote-screenshot" alt={alt} />
            <div className="popular-vote-view-docs">
              <p className="popular-vote-view-label">{label}</p>
              <ul className="popular-vote-view-list">
                {items.map((item, i) => {
                  const [bold, ...rest] = item.split(" - ");
                  return (
                    <li key={i}>
                      <span className="popular-vote-tag">{tag}.{i + 1}</span>
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

      <div className="popular-vote-content">
        <div className="popular-vote-layout-overview">
          <h2 className="popular-vote-overview-header">
            <img src={Overview} className="overview-header" alt="Overview" />
          </h2>
          <p className="overview-body">
            <strong>PopularVote</strong> is a live anonymous Q&amp;A tool built with{" "}
            <strong>React</strong> and <strong>Vite</strong> on the frontend, backed by a{" "}
            <strong>Node.js</strong> / <strong>Express</strong> server.<br /><br />
            Sessions are stored and synced in real time via <strong>Supabase</strong>, giving
            hosts and participants a live view of submissions as they come in.<br /><br />
            Once submissions are closed, an integrated <strong>Gemini AI</strong> engine clusters
            similar questions together by meaning, so hosts respond to themes rather than noise.
          </p>
        </div>

        <div className="popular-vote-layout-features">
          <h2 className="popular-vote-features-header">
            <img src={Features} className="features-header" alt="Features" />
          </h2>
          <p className="features-body">
            • <strong>Anonymous submissions</strong> - participants ask freely with no names or judgment<br /><br />
            • <strong>AI-powered clustering</strong> - Gemini groups similar questions into themes automatically<br /><br />
            • <strong>Host responses</strong> - write one reply per cluster, answering everyone who asked the same thing<br /><br />
            • <strong>Live session management</strong> - share via code, link, or QR and track participants in real time<br /><br />
            • <strong>Participant upvoting</strong> - once results are live, upvote questions to surface what matters most<br /><br />
            • <strong>Session summary &amp; PDF export</strong> - download a full summary of clusters and responses at the end
          </p>
        </div>

        <div className="popular-vote-layout-architecture">
          <h2 className="popular-vote-architecture-header">
            <img src={Architecture} className="architecture-header" alt="Architecture" />
          </h2>
          <p className="architecture-body">
            React + Vite (UI)<br />
            ↓<br /><br />
            Node.js / Express (API)<br />
            ↓<br /><br />
            Supabase<br />
            (Database &amp; Realtime)<br />
            ↓<br /><br />
            Gemini AI (Clustering)
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularVote;