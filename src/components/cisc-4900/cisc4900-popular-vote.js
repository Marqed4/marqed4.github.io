import { useEffect } from "react";
import Navbar from "../layout/navbar.js";
import "./cisc4900-popular-vote.css";

import PopularVote     from "../../resources/art/projects/popularvote/cisc-4900-popularvote.gif";
import MainPagePreview from "../../resources/art/projects/popularvote/main-page-theme-preview.gif";
import OpenSessionView from "../../resources/art/projects/popularvote/open-session.gif";
import HostsScrollDown from "../../resources/art/projects/popularvote/hosts-scroll-down.gif";

import Overview     from "../../resources/art/background-project/gradients/overview-inactive.gif";
import Features     from "../../resources/art/background-project/gradients/features-inactive.gif";
import Architecture from "../../resources/art/background-project/gradients/architecture-inactive.gif";

const deliverables = [
  { term: "Live, room-based Q&A", desc: "host opens a session and gets a 6-character room code participants join with" },
  { term: "Anonymous question intake", desc: "rate-limited to 10/minute per IP via Flask-Limiter" },
  { term: "AI clustering (Gemini)", desc: "groups semantically similar questions into 3-7 themed clusters" },
  { term: "Incremental re-clustering", desc: "new submissions slot into existing clusters without disturbing ones the host already answered" },
  { term: "RAG-style suggested answers", desc: "drafts a per-cluster answer grounded only in host-supplied notes or an uploaded PDF" },
  { term: "Expansion flow", desc: "host can request 3-5 deeper follow-up questions per answered cluster plus fresh contextual facts" },
  { term: "Live WebSocket sync", desc: "phase changes, headcounts, and clusters broadcast to every connected client via Flask-SocketIO" },
  { term: "Session phase state machine", desc: "OPEN, CLOSED, CLUSTERING, RESULTS, EXPANDING, ENDED, DELETED, with rollback-on-failure transitions" },
  { term: "Durable persistence", desc: "Postgres via Supabase as source of truth, rebuilt into an in-memory cache on boot via hydrate()" },
];

const routeGroups = [
  {
    file: "routes/sessions.py",
    label: "Core session & cluster lifecycle",
    routes: [
      "POST /api/sessions - create a session, get a room code",
      "POST /api/sessions/<code>/close - stop accepting new questions",
      "POST /api/sessions/<code>/cluster - run (or re-run) Gemini clustering",
      "POST /api/sessions/<code>/clusters/<id>/answer - host answers a cluster",
      "POST /api/sessions/<code>/upvote - upvote a specific question",
      "GET /api/sessions/<code>/summary - post-session summary (ENDED only)",
    ],
  },
  {
    file: "routes/submissions.py",
    label: "Rate-limited question intake",
    routes: [
      "POST /api/sessions/<code>/submit - submit a question (10/min per IP)",
      "DELETE /api/sessions/<code>/submit/<id> - delete a submission",
      "POST /api/sessions/<code>/submit/<id>/answer - attach a participant answer",
    ],
  },
  {
    file: "routes/expand.py",
    label: "Deeper-questions flow",
    routes: [
      "POST /api/sessions/<code>/expand - generate follow-ups + facts, RESULTS to EXPANDING to RESULTS",
    ],
  },
  {
    file: "routes/chat.py",
    label: "Ambient chat assistant",
    routes: [
      "POST /api/chat - multi-turn chat grounded in a session's cluster summaries",
    ],
  },
];

const notes = [
  "Write-through, not write-back - every mutation hits the in-memory SessionManager dict first, then Supabase, synchronously in the same call",
  "Single-process cache - self.sessions lives in one process's memory; no Redis, so it wouldn't stay consistent across multiple gunicorn workers or replicas without more work",
  "No real authentication - \"host\" is a client-declared role trusted at join:room time, not enforced on REST routes; fine for a spoken-room-code, low-stakes use case, worth flagging",
  "Migrated mid-project - backend was ported from Node/Express to Python/Flask; some camelCase keys and JS-voiced comments remain as leftovers",
];

const CISC4900PopularVote = () => {
  useEffect(() => {
    document.title = "CISC 4900 - PopularVote";
  }, []);

  return (
    <div className="cisc4900-container">
      <Navbar />
      <div className="cisc4900-PopularVote-external-links">
        <a href="/CISC-4900-PopularVote-TimeLog" className="cisc4900-timelog-link">
          View Time Log
        </a>

        <a href="/CISC-4900-PopularVote-PowerPointPresentation" className="cisc4900-power-point">
          Power Point
        </a>
      </div>

      <h1>
        <a
          href="https://github.com/Marqed4/CISC-4900-PopularVote"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={PopularVote}
            className="cisc4900-name"
            alt="PopularVote"
          />
        </a>
      </h1>

      <p className="cisc4900-description">CISC 4900 Capstone Project · Brooklyn College</p>
      <p className="cisc4900-description">
        A live, room-based Q&amp;A tool built and documented as a semester-long capstone:
        REST API, WebSocket layer, and AI clustering, backed by Postgres.
      </p>

      <div className="cisc4900-screens">
        <img src={MainPagePreview} className="cisc4900-screenshot" alt="Homepage - Day & Night Mode" />
        <img src={OpenSessionView} className="cisc4900-screenshot" alt="Open Session - Host View" />
        <img src={HostsScrollDown} className="cisc4900-screenshot" alt="Host Full View" />
      </div>

      <div className="cisc4900-content">
        <div className="cisc4900-layout-overview">
          <h2 className="cisc4900-header">
            <img src={Overview} className="cisc4900-header-img" alt="Overview" />
          </h2>
          <p className="cisc4900-body">
            <strong>PopularVote</strong> is a live, room-based Q&amp;A tool for group sessions -
            classrooms, town halls, meetings. A host opens a session and gets a 6-character
            room code; participants join with that code and submit anonymous questions.<br /><br />
            The backend is a single <strong>Flask</strong> application doing three jobs at once:
            a REST API, a <strong>Flask-SocketIO</strong> WebSocket server for real-time push, and a
            thin AI orchestration layer that talks to <strong>Gemini</strong> to cluster
            semantically similar questions into themes the host can answer at once.<br /><br />
            <strong>Supabase</strong> (Postgres) is the source of truth; an in-memory dictionary
            in <code>SessionManager</code> is a write-through cache in front of it, rebuilt on
            boot via <code>hydrate()</code> so a mid-flight session survives a redeploy.
          </p>
        </div>

        <div className="cisc4900-layout-features">
          <h2 className="cisc4900-header">
            <img src={Features} className="cisc4900-header-img" alt="Deliverables" />
          </h2>
          <ul className="cisc4900-list">
            {deliverables.map((item, i) => (
              <li key={i}><strong>{item.term}</strong> - {item.desc}</li>
            ))}
          </ul>
        </div>

        <div className="cisc4900-layout-architecture">
          <h2 className="cisc4900-header">
            <img src={Architecture} className="cisc4900-header-img" alt="Architecture" />
          </h2>
          <p className="cisc4900-body">
            React + Vite (built frontend, served as static files)<br />
            ↓<br /><br />
            Flask + Flask-SocketIO<br />
            (REST API &amp; WebSockets, under gunicorn + eventlet)<br />
            ↓<br /><br />
            SessionManager<br />
            (in-memory write-through cache)<br />
            ↓<br /><br />
            Supabase<br />
            (Postgres - source of truth)<br />
            ↓<br /><br />
            Gemini AI<br />
            (clustering, RAG-style answers, expansion)
          </p>
        </div>
      </div>

      <div className="cisc4900-routes">
        <h2 className="cisc4900-section-title">Route Reference</h2>
        {routeGroups.map((group) => (
          <div className="cisc4900-route-group" key={group.file}>
            <p className="cisc4900-route-file">{group.file}</p>
            <p className="cisc4900-route-label">{group.label}</p>
            <ul className="cisc4900-route-list">
              {group.routes.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="cisc4900-notes">
        <h2 className="cisc4900-section-title">Design Notes & Known Limitations</h2>
        <ul className="cisc4900-list">
          {notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CISC4900PopularVote;
