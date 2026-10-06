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
    date: "2026-10-02",
    duration: 5.5,
    category: "Documentation",
    description: "Populated and organized the project's GitHub kanban board using the GitHub CLI: added 85 cards from the requirements reference (Done, In progress, Backlog), then audited the codebase for half-built features and added 10 Ready cards (E2E frontend crypto, encrypted-column migration, host check on the cluster route, rate-limit gaps, upvote enforcement," + 
    "FD1 release phase, deploy docs, backend tests). Set Priority (P0-P2) and Size (XS-XL) on all ~95 cards and wrote a legend into the board's README.",
    challenges: "Draft cards can't hold GitHub labels, so Priority/Size fields were used instead. The audit found the repo has no tests, the cluster route has no host check, and render.yaml points at the wrong frontend folder. Next: build frontend crypto.js and close the P0 security cards.",
    reflection: "Auditing the code against the requirements doc showed several features marked done (rate limiting, upvotes, FD1) are only partly implemented, so the board is more honest now than the doc. Priority and Size values are my own estimates and need revisiting as work lands.",
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
