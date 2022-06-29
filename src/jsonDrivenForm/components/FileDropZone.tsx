import { useContext, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import FormContext from "../FormContext";
import { FileDropZoneLayout, Layout } from "../types";

const FileDropZone = (props: FileDropZoneProps) => {
  const { data, update, showValidationErrors } = useContext(FormContext);
  const meta = props.layout.meta;

  const acceptedMimeTypes: Record<string, never[]> = {};

  if (meta.supportedFormats) {
    Object.keys(meta.supportedFormats).forEach((mimeType) => {
      acceptedMimeTypes[mimeType] = [];
    });
  }

  const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: acceptedMimeTypes,
    maxFiles: meta.maxFiles,
    maxSize: meta.maxSize,
    multiple: !!meta.allowMultiple,
  });

  useEffect(() => {
    update(meta.dataId, acceptedFiles);
  }, [acceptedFiles]);

  const files = acceptedFiles.map((file) => (
    // @ts-ignore
    <FileItem key={file.path}>
      {/* @ts-ignore */}
      {file.path}
    </FileItem>
  ));

  const validationError = meta.required && showValidationErrors && !acceptedFiles.length;

  return (
    <>
      <Label>{props.layout.meta.label}</Label>
      <section>
        <DropZone
          {...getRootProps({
            style: getDropZoneStyle(isDragReject ? "reject" : isDragAccept ? "accept" : isFocused ? "focus" : "idle"),
          })}
          error={validationError}
        >
          <input {...getInputProps()} />
          <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M32.0833 4.58325H13.75C11.2291 4.58325 9.18954 6.64575 9.18954 9.16659L9.16663 45.8333C9.16663 48.3541 11.2062 50.4166 13.727 50.4166H41.25C43.7708 50.4166 45.8333 48.3541 45.8333 45.8333V18.3333L32.0833 4.58325ZM41.25 45.8333H13.75V9.16659H29.7916V20.6249H41.25V45.8333ZM18.3333 34.3978L21.5645 37.6291L25.2083 34.0083V43.5416H29.7916V34.0083L33.4354 37.652L36.6666 34.3978L27.5229 25.2083L18.3333 34.3978Z"
              fill="#E86C00"
            />
          </svg>

          <p>
            Drag and drop {meta.allowMultiple ? "files" : "a file"}, or <BrowseLabel>Browse</BrowseLabel>
          </p>
          {typeof meta.maxSize === "number" ? <p>{`Max size: ${(meta.maxSize / 1_048_576).toFixed(0)} MB`}</p> : null}

          {props.layout.meta.supportedFormats && (
            <SupportedFormats>
              Supported Formats: {getFileExtensions(props.layout.meta.supportedFormats)}
            </SupportedFormats>
          )}
        </DropZone>
        {files.length ? (
          <FilesList>
            <FilesListLabel>Files</FilesListLabel>
            <ul>{files}</ul>
          </FilesList>
        ) : null}

        {validationError && <ErrorText>This field is required.</ErrorText>}
      </section>
    </>
  );
};

const Label = styled.label`
  display: block;
  font-size: 16px;
  margin: 30px 0 5px;
  font-weight: 500;
`;

const DropZone = styled.div<{ error?: boolean }>`
  padding: 40px 50px 50px;
  text-align: center;
  font-size: 16px;
  border: 1px solid ${({ error }) => (error ? "red" : "#e2e2e2")};
  border-radius: 10px;
`;

const BrowseLabel = styled.span`
  color: #e86c00;
  cursor: pointer;
`;

const SupportedFormats = styled.span`
  color: #6f6f6f;
`;

const FilesList = styled.aside``;

const FilesListLabel = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0;
`;

const FileItem = styled.li`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ErrorText = styled.p`
  margin-top: 8px;
  color: red;
`;

const getDropZoneStyle = (state: "idle" | "focus" | "accept" | "reject") => {
  if (state === "focus")
    return {
      borderColor: "#2196f3",
    };

  if (state === "accept")
    return {
      borderColor: "#00e676",
      backgroundColor: "#d9faea",
    };

  if (state === "reject")
    return {
      borderColor: "#ff1744",
      backgroundColor: "#ffdee4",
    };
};

const getFileExtensions = (supportedFormats: FileDropZoneLayout["meta"]["supportedFormats"]) => {
  let extensions: string[] = [];

  Object.entries(supportedFormats ?? {}).forEach(([, value]) => {
    extensions = extensions.concat(value);
  });

  return extensions.join(", ");
};

export const isFileDropZoneLayout = (layout: Layout): layout is FileDropZoneLayout => {
  if (layout.type === "filedropzone") return true;
  return false;
};

export default FileDropZone;

export interface FileDropZoneProps {
  layout: FileDropZoneLayout;
}
