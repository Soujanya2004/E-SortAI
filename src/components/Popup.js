import React from 'react';

const Popup = ({ finalScore, onClose }) => {
    return (
        <div id="popup" className={`popup ${finalScore !== null ? 'visible' : ''}`}>
            <div id="popup-content" className="popupContent">
                <h2 className="title">Congratulations!</h2>
                <p className="message">Your final score is: <span id="final-score" className="score">{finalScore}</span></p>
                <button id="close-popup" className="closeButton" onClick={onClose}>Close</button>
            </div>

            <style jsx>{`
                /* Popup container (background overlay) */
                .popup {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .popup.visible {
                    display: flex;
                }

                /* Popup content */
                .popupContent {
                    background-color: #fff;
                    border-radius: 10px;
                    padding: 20px;
                    text-align: center;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    width: 300px;
                    animation: fadeIn 0.3s ease-in-out;
                }

                /* Title styling */
                .title {
                    font-size: 24px;
                    color: #4CAF50;
                    margin-bottom: 15px;
                }

                /* Message styling */
                .message {
                    font-size: 18px;
                    color: #333;
                    margin-bottom: 20px;
                }

                /* Score styling */
                .score {
                    font-weight: bold;
                    color: #ff9800;
                }

                /* Close button styling */
                .closeButton {
                    background-color: #4CAF50;
                    color: white;
                    font-size: 16px;
                    border: none;
                    border-radius: 5px;
                    padding: 10px 20px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .closeButton:hover {
                    background-color: #45a049;
                }

                /* Fade-in animation */
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default Popup;
