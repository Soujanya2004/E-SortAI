// src/components/FileUploadComponent.js
import React, { useState } from "react";
import { useUpload } from "@/utilities/runtime-helpers";  // Adjust the import path accordingly

function FileUploadComponent() {
  const [upload, { loading }] = useUpload();  // Use the upload hook
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (file) {
      const result = await upload({ file });
      if (result.error) {
        setUploadError(result.error);
      } else {
        console.log("File uploaded successfully:", result);
      }
    }
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        onChange={handleFileChange}
        disabled={loading}
      />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload File"}
      </button>
      {uploadError && <p className="error">{uploadError}</p>}
    </div>
  );
}

export default FileUploadComponent;
