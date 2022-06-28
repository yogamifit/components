import React, { useContext } from "react";
import styled from "styled-components";
import FormContext from "../FormContext";
import { TextInputLayout, Layout } from "../types";

type FormData = string;

export default function TextInput(props: { layout: TextInputLayout }) {
  const { layout, ...rest } = props;
  const meta = layout.meta;

  const { data, update, showValidationErrors } = useContext(FormContext);
  const currentValue = data[meta.dataId] as FormData;

  function handleChange(newValue: string) {
    update(meta.dataId, newValue);
  }

  const validationError = meta.required && showValidationErrors && !currentValue;

  return (
    <>
      {meta.label && (
        <Label htmlFor={meta.dataId} error={validationError}>
          {meta.label}
        </Label>
      )}
      {meta.rows && meta.rows > 1 ? (
        <Input
          name={meta.dataId}
          as="textarea"
          rows={meta.rows}
          error={validationError}
          placeholder={meta.placeholder}
          {...rest}
          fullWidth
          value={currentValue ?? ""}
          onChange={(e: any) => handleChange(e.target.value)}
        />
      ) : (
        <Input
          name={meta.dataId}
          fullWidth={meta.fullWidth}
          error={validationError}
          placeholder={meta.placeholder}
          type={layout.meta.numeric ? "number" : undefined}
          {...rest}
          value={currentValue ?? ""}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
      {meta.helperText && <HelperText>{meta.helperText}</HelperText>}
      {validationError && <ErrorText>This field is required.</ErrorText>}
    </>
  );
}

const Label = styled.label<{ error?: boolean }>`
  display: block;
  font-size: 16px;
  margin: 40px 0 0;
  font-weight: 500;
  ${({ error }) => (error ? "color: red" : "")};
`;

const Input = styled.input<{ fullWidth?: boolean; error?: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? `100%` : `200px`)};
  min-height: 40px;
  font-size: 16px;
  padding: 10px;
  margin-top: 10px;
  border-radius: 7px;
  border: 1px solid ${({ error }) => (error ? "red" : "#a7a7a7")};

  :focus {
    border: 1px solid ${({ error }) => (error ? "red" : "black")};
  }
`;

const HelperText = styled.p`
  margin-top: 8px;
`;

const ErrorText = styled.p`
  margin-top: 8px;
  color: red;
`;

export function isTextInputLayout(layout: Layout): layout is TextInputLayout {
  if (layout.type === "textinput") return true;
  return false;
}
