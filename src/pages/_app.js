// src/pages/_app.js
import '../styles/globals.css'; // Import global styles
import FileUploadComponent from '../components/FileUploadComponent';  // Import the FileUploadComponent

function MyApp({ Component, pageProps }) {
  return (
    <>
      <FileUploadComponent /> {/* Use the FileUploadComponent */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
