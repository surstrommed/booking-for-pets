import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { RootState } from "../App";
import { useDropzone } from "react-dropzone";
import { Typography } from "@mui/material";
import { actionChangeAvatar } from "./../../actions/thunks";

const Dropzone = ({ text, actionAvatar, type, limit }) => {
  const [typeError, setTypeError] = useState(false);
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (
        acceptedFiles[0].type.includes(type) &&
        acceptedFiles.length <= limit &&
        acceptedFiles.length > 0
      ) {
        actionAvatar(acceptedFiles[0]);
      } else {
        setTypeError(true);
      }
    },
    [actionAvatar]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={`${typeError ? "redText" : null} customDropzone`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? setTypeError(false) : null}
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

export const CDropzone = connect((state: RootState) => ({ auth: state.auth }), {
  actionAvatar: actionChangeAvatar,
})(Dropzone);