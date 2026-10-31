import { useEffect } from "react";
import Navbar from "../layout/Navbar.js";
import "./SolveSudoku.css";

import Sudoku from "../../resources/art/sudoku page graphics/Sudoku.gif";
import AppScreenshot from "../../resources/art/sudoku page graphics/Screenshot_2026-06-21_092112.png";
import UMLDiagram    from "../../resources/art/sudoku page graphics/Screenshot_2026-06-21_034200.png";

import Overview     from "../../resources/art/Background Project/Gradients/Overview Inactive.gif";
import Features     from "../../resources/art/Background Project/Gradients/Features Inactive.gif";
import Architecture from "../../resources/art/Background Project/Gradients/Architecture Inactive.gif";

const sections = [
  {
    img: AppScreenshot,
    alt: "SolveSudoku board UI",
    label: "One Board, Every Tool",
    tag: "ui",
    items: [
      "Upload Puzzle Image * drag in or select a photo of any printed or digital sudoku",
      "Take Photo of Puzzle * use your device camera to capture a puzzle on the spot",
      "GET HINT * choose 1-5 hints from the dropdown; fills randomly chosen empty cells with the correct digit",
      "Blue digits * your entries are visually separated from the original clues",
      "Red digits * cells conflicting with the current board state are flagged live",
      "CAN BE SOLVED? * check whether the puzzle has a valid solution before committing",
      "TEST MY SOLUTION * verify your filled board against the solved state instantly",
      "GENERATE NEW PUZZLE * creates a sudoku whose solution is verified to be unique",
      "SOLVE FOR ME * runs the constraint solver and fills the entire board",
    ],
  },
  {
    img: UMLDiagram,
    alt: "SolveSudoku UML class diagram",
    label: "How It Is Built",
    tag: "ar",
    flip: true,
    items: [
      "App * root React component; owns board, originalBoard, clues, and hintCells state",
      "SudokuBoard * renders the 9x9 grid; receives board, clues, and hintCells as props",
      "SudokuScanner * handles image upload and passes the extracted array back to App",
      "ScanReview * shows the scan next to the photo so misread digits can be fixed before loading",
      "StatusBadge * displays result1 and result2 from validation and solve checks",
      "SudokuSolutions * thin layer over the engine; validates, solves, and tests board correctness",
      "sudoku_engine * bitmask search that branches on the most constrained cell; counts solutions, grades difficulty, and generates unique-solution puzzles",
      "ImageToArray * sends the photo to the Gemini API and validates the 9x9 array it returns",
      "Hints * picks random empty cells and fills them from the solved board",
      "Main * Flask routes entry point; validates input and delegates each request (400 for malformed boards, 422 for unsolvable ones)",
    ],
  },
];

const SolveSudoku = () => {
  useEffect(() => {
    document.title = "Sudoku";
  }, []);

  return (
    <div className="solvesudoku-container">
      <Navbar />

      <img src={Sudoku} className="solvesudoku-name" alt="Sudoku" />

      <p className="solvesudoku-description">Upload, generate, solve, or scan.</p>
      <p className="solvesudoku-description">
        Drop in any puzzle image, let the board populate itself,
        and play. Hints, validation, and a full solver are always one click away.
      </p>

      <div className="solvesudoku-views">
        {sections.map(({ img, alt, label, tag, flip, items }) => (
          <div
            key={tag}
            className={`solvesudoku-view-section${flip ? " solvesudoku-view-section--flip" : ""}`}
          >
            <img src={img} className="solvesudoku-screenshot" alt={alt} />
            <div className="solvesudoku-view-docs">
              <p className="solvesudoku-view-label">{label}</p>
              <ul className="solvesudoku-view-list">
                {items.map((item, i) => {
                  const [bold, ...rest] = item.split(" * ");
                  return (
                    <li key={i}>
                      <span className="solvesudoku-tag">{tag}.{i + 1}</span>
                      {rest.length ? (
                        <><strong>{bold}</strong>{": "}{rest.join(" * ")}</>
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

      <div className="solvesudoku-content">
        <div className="solvesudoku-layout-overview">
          <h2 className="solvesudoku-overview-header">
            <img src={Overview} className="overview-header" alt="Overview" />
          </h2>
          <p className="overview-body">
            <strong>SolveSudoku</strong> is a full-stack sudoku tool built with{" "}
            <strong>React</strong> and <strong>Vite</strong> on the frontend, backed by a{" "}
            <strong>Flask</strong> API server.<br /><br />
            The Python backend handles solving, generation, hint logic, and image scanning,
            exposed through a REST interface with input validation and unit tests.<br /><br />
            The scanner sends a puzzle photo to the <strong>Gemini</strong> vision API, validates
            the grid it returns, and lets you fix any misread digits before the board loads.
          </p>
        </div>

        <div className="solvesudoku-layout-features">
          <h2 className="solvesudoku-features-header">
            <img src={Features} className="features-header" alt="Features" />
          </h2>
          <p className="features-body">
            • <strong>Image scanner</strong>: upload or photograph any sudoku and get a playable board<br /><br />
            • <strong>Constraint solver</strong>: bitmask backtracking that solves hard puzzles in tens of milliseconds<br /><br />
            • <strong>Puzzle generator</strong>: unique, solvable puzzles on demand<br /><br />
            • <strong>Hint engine</strong>: 1-5 hints at a time without revealing the full solution<br /><br />
            • <strong>Live validation</strong>: conflict detection and solution checking as you play<br /><br />
            • <strong>Clean board UI</strong>: clue digits, user entries, and hints are visually distinct
          </p>
        </div>

        <div className="solvesudoku-layout-architecture">
          <h2 className="solvesudoku-architecture-header">
            <img src={Architecture} className="architecture-header" alt="Architecture" />
          </h2>
          <p className="architecture-body">
            React + Vite (UI)<br />
            ↓<br /><br />
            Flask (REST API)<br />
            ↓<br /><br />
            sudoku_engine<br />
            SudokuSolutions<br />
            ImageToArray (Gemini)<br />
            Hints<br />
            (Python Modules)
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolveSudoku;