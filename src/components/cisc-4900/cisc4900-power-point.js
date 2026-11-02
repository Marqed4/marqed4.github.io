import { useEffect, useRef } from "react";
import { init } from "pptx-preview";
import Navbar from "../layout/navbar.js";
import "./cisc4900-power-point.css";
import PV_PPTX from "../../resources/art/projects/popularvote/cisc-4900-popularvote-power-point.gif"

const PPTX_URL = `${process.env.PUBLIC_URL}/documents/popularvote-sixteenth-draft-dark.pptx`;

const CISC4900PowerPoint = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.title = "CISC 4900 - PopularVote PowerPoint";

    const node = wrapperRef.current;
    let cancelled = false;

    const previewer = init(node, {
      width: 960,
      height: 540,
      mode: "slide",
    });

    fetch(PPTX_URL)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        if (!cancelled) previewer.preview(buffer);
      });

    return () => {
      cancelled = true;
      if (node) node.innerHTML = "";
    };
  }, []);

  return (
    <div className="cisc4900-ppt-container">
      <Navbar />

      <img src={PV_PPTX} className="cisc4900-ppt-title"/>

      <a className="cisc4900-ppt-download" href={PPTX_URL} download>
        Download .pptx
      </a>

      <div className="cisc4900-ppt-viewer" ref={wrapperRef} />
    </div>
  );
};

export default CISC4900PowerPoint;
