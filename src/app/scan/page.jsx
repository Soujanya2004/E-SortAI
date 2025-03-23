"use client";
import React, { useState, useRef, useCallback } from "react";
import { useHandleStreamResponse } from "../../utilities/runtime-helper";

function MainComponent() {
  const [selectedWaste, setSelectedWaste] = useState(null);
  const [userQuestion, setUserQuestion] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [messages, setMessages] = useState([]);
  const [streamingMessage, setStreamingMessage] = useState("");
  const audioRef = useRef(null);

  const wasteOptions = [
    { id: "phone", name: "Old Phone", icon: "fa-mobile-alt" },
    { id: "laptop", name: "Laptop", icon: "fa-laptop" },
    { id: "motherboard", name: "Motherboard", icon: "fa-microchip" },
    { id: "tablet", name: "Tablet", icon: "fa-tablet-alt" },
    { id: "smartwatch", name: "Smartwatch", icon: "fa-clock" },
  ];

  const handleFinish = useCallback((message) => {
    setMessages((prev) => [...prev, { role: "assistant", content: message }]);
    setStreamingMessage("");
    const cleanMessage = message.replace(/\*/g, "");

    fetch(
      `/integrations/text-to-speech/speech?text=${encodeURIComponent(
        cleanMessage
      )}`,
      { cache: "no-store" }
    )
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current
            .play()
            .catch((error) => console.log("Audio playback failed:", error));
          setIsSpeaking(true);
          setIsPaused(false);
        }
      });
  }, []);

  const handleStreamResponse = useHandleStreamResponse({
    onChunk: setStreamingMessage,
    onFinish: handleFinish,
  });

  const generateResponse = useCallback(
    async (question) => {
      if (!selectedWaste) return;

      const prompt = question
        ? `You are ${selectedWaste.name}. Respond to "${question}" in first person. Be informative about your environmental impact, recycling process, and proper disposal methods. Include facts about electronic waste while maintaining a conversational tone. Keep responses under 100 words.`
        : `You are ${selectedWaste.name}. Introduce yourself and share important facts about electronic waste, your environmental impact, and how you should be recycled properly. Be informative while maintaining a conversational tone. Keep it under 100 words.`;

      const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          stream: true,
        }),
      });
      handleStreamResponse(response);
    },
    [selectedWaste, handleStreamResponse]
  );

  const handleAudioEnd = useCallback(() => {
    setIsSpeaking(false);
  }, []);

  const handleWasteSelect = useCallback(
    (waste) => {
      setSelectedWaste(waste);
      setMessages([]);
      setStreamingMessage("");
      generateResponse("");
    },
    [generateResponse]
  );

  const handleQuestionSubmit = useCallback(() => {
    if (userQuestion.trim()) {
      generateResponse(userQuestion);
      setUserQuestion("");
    }
  }, [userQuestion, generateResponse]);

  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPaused(false);
      } else {
        audioRef.current.pause();
        setIsPaused(true);
      }
    }
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{
        backgroundImage: `url("https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-thelily-washpost.s3.amazonaws.com/public/SGOVWGXKJNEE3M6DEJF6RAQ6LQ.gif&w=1200")`,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-roboto text-[white] text-center mb-8">
          Talk to Your E-Waste 🌱
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {wasteOptions.map((waste) => (
            <button
              key={waste.id}
              onClick={() => handleWasteSelect(waste)}
              className={`p-6 rounded-lg flex flex-col items-center justify-center transition-all ${
                selectedWaste?.id === waste.id
                  ? "bg-[#4CAF50] text-white"
                  : "bg-white hover:bg-[#e8f5e9]"
              }`}
            >
              <i className={`fas ${waste.icon} text-3xl mb-2`}></i>
              <span className="font-roboto text-sm">{waste.name}</span>
            </button>
          ))}
        </div>

        {selectedWaste && (
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex flex-col items-center justify-center space-y-6">
              <i
                className={`fas ${selectedWaste.icon} text-8xl text-[#4CAF50] ${
                  isSpeaking ? "animate-bounce" : ""
                }`}
              ></i>

              <div className="mb-6 w-full">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="bg-[#e8f5e9] p-4 rounded-lg font-roboto mb-4"
                  >
                    {msg.content}
                    {idx === messages.length - 1 && (
                      <div className="flex justify-center mt-4 space-x-4">
                        <button
                          onClick={togglePlayPause}
                          className="px-4 py-2 bg-[#4CAF50] text-white rounded-lg hover:bg-[#45a049] transition-colors"
                        >
                          <i
                            className={`fas ${
                              isPaused ? "fa-play" : "fa-pause"
                            }`}
                          ></i>
                        </button>
                        <button
                          onClick={stopSpeaking}
                          className="px-4 py-2 bg-[#f44336] text-white rounded-lg hover:bg-[#e53935] transition-colors"
                        >
                          <i className="fas fa-stop"></i>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {streamingMessage && (
                  <div className="bg-[#e8f5e9] p-4 rounded-lg font-roboto">
                    {streamingMessage}
                  </div>
                )}
              </div>

              <div className="w-full">
                <input
                  type="text"
                  name="question"
                  placeholder="Ask me anything..."
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleQuestionSubmit()
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#4CAF50]"
                />
              </div>
            </div>
          </div>
        )}

        {!selectedWaste && (
          <div className="text-center text-white bg-black font-roboto">
            👆 Select an e-waste item to start the conversation!
          </div>
        )}
      </div>
      <audio ref={audioRef} onEnded={handleAudioEnd} />
    </div>
  );
}

export default MainComponent;
