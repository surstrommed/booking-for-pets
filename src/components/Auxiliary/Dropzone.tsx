import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "@mui/material";

export const Dropzone = ({ text, type, limit, handleImageUpload }) => {
  const [typeError, setTypeError] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (
      acceptedFiles[0].type.includes(type) &&
      acceptedFiles.length <= limit &&
      acceptedFiles.length > 0
    ) {
      handleImageUpload(acceptedFiles[0]);
    } else {
      setTypeError(true);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={`${typeError && "redText"} customDropzone`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive && setTypeError(false)}
      {isDragActive ? (
        <Typography variant="body1" gutterBottom>
          {text}
        </Typography>
      ) : (
        <>
          {typeError ? (
            <Typography variant="body1" gutterBottom>
              Error! Invalid file type for upload or you are uploading a large
              number of files.
            </Typography>
          ) : (
            <Typography variant="body1" gutterBottom>
              To upload, drag and drop files here or click on the box and select
              them locally.
            </Typography>
          )}
        </>
      )}
    </div>
  );
};
