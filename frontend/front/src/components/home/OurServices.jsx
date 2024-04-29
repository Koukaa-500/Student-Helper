import React, { useState, useEffect } from "react";
import { fileServices } from "./FileServices"; // Import your service here

const OurServices = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Fetch files data from your service
    const fetchFiles = async () => {
      try {
        const response = await fileServices.getFiles(); // Replace with your service method to fetch files
        setFiles(response.data); // Assuming the response data is an array of files
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      {files.map((file, index) => (
        <div
          key={index}
          style={{
            width: "20rem",
            height: "15rem",
            borderTop: "1px solid #333",
            borderRight: "1px solid #333",
            borderBottom: "1px solid #333",
            borderLeft: "1px solid #333",
            borderRadius: "2px",
            marginBottom: "20px",
          }}
        >
          <img
            src={file.imageUrl} // Assuming each file object has an imageUrl property
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{file.title}</h5> {/* Assuming each file object has a title property */}
            <p className="card-text">{file.description}</p> {/* Assuming each file object has a description property */}
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OurServices;
