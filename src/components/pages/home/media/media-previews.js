import { useState } from "react"
import HomeEdits from "./home-edits"
import HomeShorts from "./home-shorts"

import ShowContentInactive from "../../../../resources/art/background-project/gradients/preview-content-inactive.gif"
import ShowContentActive from "../../../../resources/art/background-project/gradients/hide-content-active.gif"
import DownArrow from "../../../../resources/art/background-project/gradients/down-arrow-orange-marble-gradient.gif"

const MediaPreviews = () => {
    const [contentOpen, setContentOpen] = useState(false);
    const [openSection, setOpenSection] = useState(null);
    const [editsVideoActive, setEditsVideoActive] = useState(false);

    const handleContentToggle = () => {
        setContentOpen(prev => !prev);
        setOpenSection(null);
    };

    return (
        <div className="HomePageMediaPreviews">
            <button
                className="dropdown-toggle-content"
                onClick={handleContentToggle}
                style={{ background: 'none', border: 'none', padding: 0, margin: 0, outline: 'none' }}
            >
                {contentOpen
                    ? <img src={ShowContentActive} alt="Hide Content" />
                    : <img src={ShowContentInactive} alt="Show Content" />
                }
            </button>

            {contentOpen && (
            <div className="ContentDropdownRow">
                {openSection !== "shorts" && (
                    <>
                        <img src={DownArrow} className="dropdown-down-arrow-one" alt="" />
                        <HomeEdits
                            isOpen={openSection === "edits"}
                            onToggle={() => setOpenSection(prev => prev === "edits" ? null : "edits")}
                            onVideoActive={setEditsVideoActive} />
                    </>
                )}
                {openSection !== "edits" && !editsVideoActive && (
                    <>
                        <img src={DownArrow} className="dropdown-down-arrow-two" alt="" />
                        <HomeShorts
                            isOpen={openSection === "shorts"}
                            onToggle={() => setOpenSection(prev => prev === "shorts" ? null : "shorts")} />
                    </>
                )}
            </div>
        )}
    </div>
    );
};

export default MediaPreviews;