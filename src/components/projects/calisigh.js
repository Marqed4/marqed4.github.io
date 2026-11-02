import { useEffect } from "react";
import Navbar from "../layout/navbar.js"

import CalisighName from "../../resources/art/projects/calisigh/calisigh.gif"
import Overview from "../../resources/art/background-project/gradients/overview-inactive.gif"
import Features from "../../resources/art/background-project/gradients/features-inactive.gif"
import Architecture from "../../resources/art/background-project/gradients/architecture-inactive.gif"
import MonthsView from "../../resources/art/projects/calisigh/months-view.png"
import YearsView from "../../resources/art/projects/calisigh/years-view.png"
import ChatView from "../../resources/art/projects/calisigh/chat-view.png"
import SettingsView from "../../resources/art/projects/calisigh/settings-view.png"
import AddAlarmView from "../../resources/art/projects/calisigh/add-alarm-view.png"
import EditAlarmView from "../../resources/art/projects/calisigh/edit-alarm-view.png"
import EditDuplicateAlarmView from "../../resources/art/projects/calisigh/duplicate-date-selection.png"
import EventView from "../../resources/art/projects/calisigh/event-view.png"

const sections = [
  {
    img: MonthsView,
    alt: "Month View",
    label: "Months View",
    tag: "mv",
    items: [
      "Month & Year 🗓️ displayed at the top center of the calendar grid",
      "mv.1.1 * This also acts as a button allowing toggle between months & years views",
      "Column day headers → marks the start day of the week",
      "Event card → displays a truncated event title and its scheduled time",
      "mv.3.1 * Multiple events can be viewed via scrollbar",
      "Day cell → contains the day number, events, and times",
      "mv.4.1 * Current day is shaded",
    ],
  },
  {
    img: AddAlarmView,
    alt: "Add Alarm View",
    label: "Add Alarm View",
    tag: "av",
    flip: true,
    items: [
      "Date label → displays the selected date the alarm is being added to",
      "Title field → text input for the alarm's title",
      "Description field → multiline text input for an optional alarm description",
      "Time field → time input for scheduling the alarm",
      "Clock icon → native time picker display for the time field",
      "av.5.1 * Time dropdown (hours, minutes, meridiems)",
      "Save button → validates and saves the alarm, closes the view",
      "Cancel button → discards changes and closes the view",
    ],
  },
  {
    imgs: [EditAlarmView, EditDuplicateAlarmView],
    alt: "Edit Alarm View",
    label: "Edit Alarm View",
    tag: "ev",
    items: [
      "Date label → displays the selected date of the alarm being edited",
      "Title field → text input pre-filled with the alarm's current title",
      "Description field → multiline text input pre-filled with the alarm's current description",
      "Time field → time input pre-filled with the alarm's current scheduled time",
      "ev.4.1 * Clock icon → native time picker (same as Add Alarm View)",
      "Repeat Until section → group containing repeat frequency options and end date",
      "Frequency toggle buttons → select repeat interval (e.g., Weekly, Yearly)",
      "End date field → date input for when the repeat should stop, with calendar icon",
      "Confirm button → confirms repeat settings and collapses the repeat section",
      "Cancel (repeat) button → discards repeat changes and collapses the repeat section",
      "Save button → validates and saves all edits, closes the view",
      "Duplicate button → toggles the Repeat Until view",
      "Delete button → permanently removes the alarm for that day and closes the view",
      "Cancel button → discards all changes and closes the view",
    ],
  },
  {
    img: YearsView,
    alt: "Years View",
    label: "Years View",
    tag: "yv",
    flip: true,
    items: [
      "Year 🗓️ displayed at the top center of the calendar grid",
      "yv.1.1 * This also acts as a button allowing toggle between months & years views",
      "Year cell → contains the year number",
      "yv.2.1 * Current year is shaded",
    ],
  },
  {
    img: ChatView,
    alt: "Chat View",
    label: "Chat View",
    tag: "c",
    items: [
      "Assistant message bubble → displays system or AI responses",
      "Send button → sends message to chatbot",
      "Calisigh Helper's message → initiate/response",
      "User's message → reply/response",
    ],
  },
  {
    img: EventView,
    alt: "Event View",
    label: "Event View",
    tag: "e",
    flip: true,
    items: [
      "Event title → displays the alarm's title in large text",
      "Event description → displays the alarm's description below the title",
      "Stop Alarm button → stops the active alarm and closes the event view",
    ],
  },
];

const Calisigh = () => {

  useEffect(() => {
    document.title = "Calisigh";
  }, []);

  return (
    <div className="custom-calendar-container">
      <Navbar/>

      <h1>
        <a
          href="https://github.com/Marqed4/Calisigh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={CalisighName} className="custom-calendar-name" alt="CalisighName" />
        </a>
      </h1>

      <div className="app-controls-section">
        <p className="app-controls-docs-label">App Controls</p>
        <ul className="app-controls-list">
          <li><span className="mv-tag">a.1</span> Left arrow button ← navigates to the previous months/years</li>
          <li><span className="mv-tag">a.2</span> Right arrow button → navigates to the next months/years</li>
          <li><span className="mv-tag">a.3</span> FAQ/About button → link for Calisigh documentation</li>
          <li><span className="mv-tag">a.4</span> Chat button → initiate integrated Calisigh AI assistant</li>
          <li><span className="mv-tag">a.4.1</span> Calisigh's AI Assistant has knowledge of your events</li>
          <li><span className="mv-tag">a.5</span> Settings button → access app settings or user preferences</li>
          <li><span className="mv-tag">a.6</span> Mini calendar sidebar → compact monthly overview for quick date navigation</li>
          <li><span className="mv-tag">a.7</span> Remove button ✕ removes user inputs, e.g., events, backgrounds, alarm sounds</li>
        </ul>
      </div>

      <div className="calisigh-views">
        {sections.map(({ img, imgs, alt, label, tag, flip, items }) => (
          <div
            key={tag}
            className={`months-view-section${flip ? " months-view-section--flip" : ""}`}
          >
            {imgs ? (
              <div className="png-column">
                {imgs.map((src, i) => (
                  <img key={i} src={src} className="months-view-example" alt={alt} />
                ))}
              </div>
            ) : (
              <img src={img} className="months-view-example" alt={alt} />
            )}
            <div className="months-view-docs">
              <p className="months-view-docs-label">{label}</p>
              <ul className="months-view-list">
                {items.map((item, i) => {
                  const hasCustomTag = item.match(/^[a-z]+[\d.]*\s*\*/);
                  if (hasCustomTag) {
                    const [customTag, ...rest] = item.split(" * ");
                    return (
                      <li key={i}>
                        <span className="mv-tag">{customTag}</span>
                        {rest.join(" * ")}
                      </li>
                    );
                  }
                  return (
                    <li key={i}>
                      <span className="mv-tag">{tag}.{i + 1}</span>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="custom-calendar-content">

        <div className="custom-calendar-layout-overview">
          <h2 className="custom-calendar-overview-header">
            <img src={Overview} className="overview-header" alt="Overview" />
          </h2>
          <p className="overview-body">
            <strong>Calisigh</strong> is a feature-rich desktop application built with <strong>Tauri</strong>,
            combining a <strong>React</strong> frontend with a
            <strong>Maven</strong>-packaged <strong>Java</strong> backend.<br/><br/>
            The backend is distributed as a JAR that embeds a local <strong>Spark Java REST API</strong>.
            The Rust/Tauri layer communicates with that local server to deliver calendar data to the UI.<br/><br/>
            Calisigh also includes an on-device AI engine, <strong>Ollama 3.2</strong>,
            which adapts to the user's hardware to run efficiently and cost-effectively.<br/><br/>
            The application is fully packaged with <strong>Tauri</strong> and bundled with a <strong>Temurin 21 JDK</strong> to run the backend on the user's PC.
          </p>
        </div>

        <div className="custom-calendar-layout-features">
          <h2 className="custom-calendar-features-header">
            <img src={Features} className="features-header" alt="Features" />
          </h2>
          <p className="features-body">
            • Switch between <strong>Months</strong> and <strong>Years</strong> views with a single tap on the header<br/><br/>
            • Add, view, duplicate, and remove <strong>events</strong> with titles, times, and multi-event scrolling per day cell<br/><br/>
            • Built-in <strong>AI assistant</strong> with awareness of events recorded on your calendar<br/><br/>
            • Personalize your experience with custom <strong>backgrounds</strong> (JPG, PNG, GIF, WEBP) and <strong>alert sounds</strong> (MP3, WAV, and more)<br/><br/>
            • Compact <strong>mini calendar sidebar</strong> for quick date navigation at a glance
          </p>
        </div>

        <div className="custom-calendar-layout-architecture">
          <h2 className="custom-calendar-architecture-header">
            <img src={Architecture} className="architecture-header" alt="Architecture" />
          </h2>
          <p className="architecture-body">
            React (UI)<br/>
            ↓<br/><br/>
            Tauri (Rust + WebView)<br/>
            ↓<br/><br/>
            Spark Java REST Server<br/>
            ↓<br/><br/>
            Calendar Logic (Java/JDK)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calisigh;