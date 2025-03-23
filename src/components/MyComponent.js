import React, { useState } from 'react';
import { useHandleStreamResponse } from './utilities/runtime-helper'; // Import your hook

function MyComponent() {
  const [loading, setLoading] = useState(false);
  const onChunk = (content) => {
    console.log(content);  // Handle the chunk
  };
  const onFinish = (content) => {
    console.log("Finished", content); // Handle finish
  };

  const handleStreamResponse = useHandleStreamResponse({ onChunk, onFinish });

  const handleFetch = async () => {
    const response = await fetch("https://example.com/data");
    await handleStreamResponse(response);  // Calling the hook inside component
  };

  return (
    <div>
      <button onClick={handleFetch} disabled={loading}>
        Start Streaming
      </button>
    </div>
  );
}

export default MyComponent;
