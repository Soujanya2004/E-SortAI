const useHandleStreamResponse = ({ onChunk, onFinish }) => {
    return async (response) => {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        onChunk(result);
      }
  
      onFinish(result);
    };
  };
  
  export default useHandleStreamResponse;
  