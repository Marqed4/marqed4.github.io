import { useEffect, useState } from "react";
import Navbar from "../Navbar.js";
import "./CISC4900PopularVoteTimeLog.css";

import PopularVoteTimeLogTitle from "../../resources/art/popularvote page graphics/CISC-4900_PopularVote_Time_Log.gif";

// Fall 2026 semester (Brooklyn College): classes run Aug. 28 - Dec. 21, 2026.
// Logging window starts 3 days in, on Aug. 31, 2026.
const LOG_START = "2026-08-31";
const SEMESTER_START = "2026-08-28";
const SEMESTER_END = "2026-12-21";

// How to add a new entry:
// 1. Copy one of the objects below.
// 2. date is "YYYY-MM-DD". duration is hours as a number (supports .5 time/decimal arithmetic)
// 3. category should match one of: "Supervisor discussion", "Team discussion",
//    "Design", "Coding", "Documentation", "Testing & Debugging",
//    "Research, Training, Learning", "Other"
// 4. Keep newest entries at the top of the array.
// 5. Only log days that have actually happened - don't log ahead of today.
const entries = [
  {
    date: "2026-10-08",
    duration: 2.5,
    category: "Design",
    description: "Moved the project to a fresh Supabase database (v4900) and wrote its PostgreSQL schema script. Changed curators to jsonb and turned on row level security so the browser's anon key can only read a few public session columns and its own user rows. Documented it in a schema doc, put the Supabase schema screenshot into the README, design document and the PowerPoint's schema slide. In progress, transfering example sessions.",
    challenges: "Both .env files still point at the old database, swap the keys, run the check script, and fix any policy that blocks sign-in or session history.",
    reflection: "The old schema gave the anon key full access to every table, and that key ships in the frontend. Locking it down before the encrypted sessions go live was worth the extra time.",
  },
  {
    date: "2026-10-07",
    duration: 3.5,
    category: "Coding",
    description: "Wrote the client-side crypto module (ECDH key exchange, HKDF key wrapping, AES-GCM). Limited the server's room-key relay to the sender's own session and committed the Docker setup. Then wired the crypto into Home, Host and Participant: an encrypted checkbox on session creation, host key distribution, participant encrypt on submit, and host decrypt for the feed. The relay now also forwards the host's public key so joiners can unwrap the room key.",
    challenges: "The host role is client-supplied, so any client can join as host and delete a session; added a P0 card. The wiring builds but I haven't run the live socket flow yet. Encrypted sessions can't cluster until client-side clustering (E2E-4) exists, and a refresh loses the room key (E2E-6).",
    reflection: "Writing the known limits into the module header made the remaining E2E cards concrete.",
  },
  {
    date: "2026-10-07",
    duration: 0.5,
    category: "Documentation",
    description: "Added a Running with Docker section to the README and shortened the 10-02 entry.",
    challenges: "Docker isn't installed locally, so the documented steps are untested.",
    reflection: "Two or three sentences per field is enough for a log entry.",
  },
  {
    date: "2026-10-06",
    duration: 1,
    category: "Coding",
    description: "Containerized the app with a multi-stage Dockerfile (Node builds the Vite frontend, Python 3.12 runs gunicorn with one eventlet worker), a docker-compose.yml, and a .dockerignore. Chose Docker over Kubernetes, Rust and Snowflake.",
    challenges: "Docker isn't installed here, so the build is untested. Compose maps port 6967 to 2167 because the CORS allowlist only permits localhost:6967, and the backend must stay at one worker since session state is in memory.",
    reflection: "Kubernetes and Snowflake add overhead for a single Flask service on Supabase, and Rust adds nothing over WebCrypto.",
  },
  {
    date: "2026-10-06",
    duration: 1,
    category: "Testing & Debugging",
    description: "Audited the codebase against the kanban board and moved six unstarted cards from In progress back to Ready.",
    challenges: "The backend only relays key-exchange events and stores ciphertext; the frontend has no crypto yet. Issue #1 (backend decrypts by key) contradicts the E2E design and should be rewritten.",
    reflection: "The board overstated progress. Checking the code before trusting card status keeps it honest.",
  },
  {
    date: "2026-10-02",
    duration: 5.5,
    category: "Documentation",
    description: "Built out the GitHub kanban board with the GitHub CLI. Added 85 cards from the requirements doc, audited the code for half-built features, and added 10 Ready cards for the gaps. Set Priority (P0-P2) and Size (XS-XL) on every card and wrote a legend in the board README.",
    challenges: "Draft cards can't hold labels, so I used Priority and Size fields. The audit found no tests, no host check on the cluster route, and a wrong frontend folder in render.yaml. Next: frontend crypto and the P0 security cards.",
    reflection: "Several features marked done in the requirements doc (rate limiting, upvotes, FD1) are only partly built, so the board is now more accurate than the doc. Priority and Size are my own estimates.",
  },
  {
    "date": "2026-09-25",
    duration: 0.5,
    category: "Creating kanban",
    description: "Creating the project's kanban- adding issues and work in past/present/future stages of the project.",
    challenges: "Remembering issues that were fixed without documentation.",
    reflection: "This is a component that needed to be started at the time of the project's initializtion. Some work was documented inline and outside of the repsitory.",
  },
  {
    date: "2026-09-19",
    duration: 1,
    category: "Research",
    description: "Deepening my understanding of end-to-end encryption by watching a series of YouTube videos and reviewing real-world implementations to better grasp both the technology and its legal considerations.",
    challenges: "Integrating AI still requires users to rely on an open model provider such as `@huggingface/`, which makes the setup process more tedious and expensive than ideal.",
  },
  {
    date: "2026-09-19",
    duration: 2,
    category: "Coding",
    description: "Used a typescript API to show a .pptx revelant to \"CISC-4900 Popular Vote\" Presentation on HTML",
    challenges: "Black screen in frame, Frame duplication bug, clean no scroll-bar approach. Fixed: `fetch(PPTX_URL).then((res) => res.arrayBuffer()).then((buffer) => {if (!cancelled) previewer.preview(buffer);});` duplicated buffer.",
  },
  {
    date: "2026-09-18",
    duration: 6,
    category: "Coding",
    description: "Implemented backend support for encrypted sessions: key-exchange socket events, an encrypted session flag, ciphertext passthrough on submissions, and a client-side cluster branch.",
    challenges: "Frontend lives in a separate repo, and with no migration file the encrypted column write had to be best-effort.",
    reflection: "Should have checked where the frontend lived before scoping, but backend-only work still locks in the wire contract it must match.",
  },
  {
    date: "2026-09-17",
    duration: 2,
    category: "Documentation & Refactor",
    description: "Wrote a design document update with Mermaid diagrams (architecture, ER, state machine, encrypted-session sequence) reconciling the outdated v4.0 PDF with the current Flask/Supabase stack, then split the repo into backend/ and frontend/ folders, sourcing the missing frontend from a sibling project copy.",
    challenges: "The old render.yaml and frontend package.json scripts still referenced a Node server/ folder from before the Flask port, had to fix those instead of just relocating them as-is.",
    reflection: "Splitting the repo surfaced how much stale config (render.yaml, package.json scripts) had silently drifted from what's actually deployed; worth auditing configs like that whenever a major port happens, not just the code.",
  },
  {
    date: "2026-09-16",
    duration: 2,
    category: "Thinking/Deciding",
    description: "Drafted an E2E encryption and client-side clustering plan for PopularVote per Prof. Chuang's advice, so the server and Supabase never see plaintext.",
    challenges: "Gemini can't cluster ciphertext, so local embeddings must replace it for encrypted sessions, with a catch-up pass on moderator reconnect.",
    reflection: "Still undecided on opt-in vs. global encryption, TF-IDF vs. embeddings, and self-hosted vs. CDN model files; no schema changes needed.",
  },
  {
    date: "2026-09-14",
    duration: 3,
    category: "Coding",
    description: "Ported the backend from Node/Express to Python/Flask.",
    challenges: "Rebuilding session middleware and CORS setup without Express's request helpers.",
    reflection: "Flask's smaller footprint made the route handlers easier to reason about line by line.",
  },
  {
    date: "2026-09-12",
    duration: 1.5,
    category: "Testing & Debugging",
    description: "Verified hydrate() correctly rebuilds in-memory sessions from Supabase after a simulated restart.",
    challenges: "Had to fake a mid-flight session (OPEN phase with unanswered clusters) to actually exercise the rebuild path.",
    reflection: "Confirmed the write-through cache survives a redeploy without losing session state.",
  },
  {
    date: "2026-09-10",
    duration: 2.5,
    category: "Coding",
    description: "Implemented SessionManager's in-memory dict and the write-through pattern to Supabase.",
    challenges: "Deciding where the single source of truth lives when both memory and Postgres can be read from.",
    reflection: "Write-through kept things simple for a single-process deployment; documented the tradeoff for later.",
  },
  {
    date: "2026-09-08",
    duration: 2,
    category: "Coding",
    description: "Scaffolded the Flask app structure: routes/, managers/, database/ packages and blueprint registration.",
    challenges: "Wiring four blueprints under one /api prefix without circular imports.",
    reflection: "Stashing session_manager and socketio on the Flask app object solved the import cycle cleanly.",
  },
  {
    date: "2026-09-06",
    duration: 1.5,
    category: "Documentation",
    description: "Started BACKEND_OVERVIEW.docx, drafted the data model section covering sessions/submissions/clusters.",
    challenges: "Keeping the snake_case (DB) vs camelCase (JSON/Gemini) naming straight while writing it up.",
    reflection: "Writing the doc surfaced a few inconsistent field names worth fixing later.",
  },
  {
    date: "2026-09-04",
    duration: 1,
    category: "Supervisor discussion",
    description: "Met with course instructor to review project scope and confirm the semester deliverables.",
    challenges: "Narrowing scope so the AI clustering feature is achievable within the semester.",
    reflection: "Got confirmation that incremental clustering is a reasonable stretch goal, not a required one.",
  },
  {
    date: "2026-09-02",
    duration: 1,
    category: "Research, Training, Learning",
    description: "Read through the CISC 4900 project proposal guidelines and drafted a rough deliverables timeline.",
    challenges: "Estimating how much time the AI/clustering layer would take without having built one before.",
    reflection: "Blocked out the semester into definition, backend core, AI layer, and polish/testing phases.",
  },
  {
    date: "2026-08-31",
    duration: 1,
    category: "Design",
    description: "Reviewed the capstone rubric and sketched an initial system architecture for the PopularVote build (from over the summer).",
    challenges: "Deciding how much of the existing PopularVote product to reuse vs. rebuild for the course version.",
    reflection: "Settled on reusing the product's frontend and product-proven feature set, rebuilding the backend for the course.",
  },
];

const totalHours = entries.reduce((sum, e) => sum + (Number(e.duration) || 0), 0);

const INITIAL_VISIBLE = 5;

const formatDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const PopularVoteTimeLog = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    document.title = "Popular Vote: Time Log";
  }, []);

  const visibleEntries = entries.slice(0, visibleCount);
  const hasMore = visibleCount < entries.length;

  return (
    <div className="timelog-container">
      <Navbar />

      <div className="timelog-card">
        <div className="timelog-header">
          <img src={PopularVoteTimeLogTitle} className="timelog-title-img" alt="Popular Vote: Time Log" />
          <p className="timelog-tagline">CISC 4900 Capstone · Zachery Francis</p>
          <p className="timelog-tagline">
            <a
              href="https://github.com/Marqed4/CISC-4900-PopularVote"
              target="_blank"
              rel="noopener noreferrer"
            >
              CISC-4900-PopularVote
            </a>
          </p>
          <p className="timelog-tagline">
            Fall 2026 semester: {formatDate(SEMESTER_START)} - {formatDate(SEMESTER_END)}
          </p>
          <p className="timelog-tagline">
            Logging window: {formatDate(LOG_START)} onward
          </p>
        </div>

        <div className="timelog-summary">
          <div className="timelog-summary-stat">
            <p className="timelog-summary-label">Sessions Logged</p>
            <p className="timelog-summary-value">{entries.length}</p>
          </div>
          <div className="timelog-summary-stat">
            <p className="timelog-summary-label">Total Hours</p>
            <p className="timelog-summary-value">{totalHours}</p>
          </div>
        </div>

        <section className="timelog-section">
          <h2 className="timelog-section-title">Sessions</h2>

          {entries.length === 0 ? (
            <p className="timelog-empty">No entries logged yet.</p>
          ) : (
            <>
              <div className="timelog-entries">
                {visibleEntries.map((entry, i) => (
                  <div className="timelog-entry" key={`${entry.date}-${i}`}>
                    <div className="timelog-entry-header">
                      <span className="timelog-entry-date">{formatDate(entry.date)}</span>
                      <span className="timelog-entry-duration">{entry.duration}h</span>
                      <span className="timelog-entry-category">{entry.category}</span>
                    </div>

                    <p className="timelog-entry-description">{entry.description}</p>

                    {entry.challenges && (
                      <p className="timelog-entry-field">
                        <span className="timelog-entry-field-label">Challenges / next steps: </span>
                        {entry.challenges}
                      </p>
                    )}

                    {entry.reflection && (
                      <p className="timelog-entry-field">
                        <span className="timelog-entry-field-label">Reflection: </span>
                        {entry.reflection}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {hasMore && (
                <button
                  type="button"
                  className="timelog-view-more"
                  onClick={() => setVisibleCount((c) => c + 5)}
                >
                  View more ({entries.length - visibleCount} left)
                </button>
              )}

              {!hasMore && entries.length > INITIAL_VISIBLE && (
                <button
                  type="button"
                  className="timelog-view-more"
                  onClick={() => setVisibleCount(INITIAL_VISIBLE)}
                >
                  Show less
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default PopularVoteTimeLog;
