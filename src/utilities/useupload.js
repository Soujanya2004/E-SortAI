import { useState } from "react";

const useUpload = () => {
  const [loading, setLoading] = useState(false);

  const upload = async ({ file }) => {
    if (!file) return { url: null, error: "No file selected" };

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", { 
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setLoading(false);
      return { url: data.url, error: null };
    } catch (error) {
      setLoading(false);
      return { url: null, error: "Upload failed" };
    }
  };

  return [upload, { loading }];
};

export default useUpload;
