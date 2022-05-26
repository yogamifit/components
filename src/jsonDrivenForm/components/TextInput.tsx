import React, { useContext } from "react";
import styled from "styled-components";
import FormContext from "../FormContext";
import { TextInputLayout, Layout } from "../types";

type FormData = string;

export default function TextInput(props: { layout: TextInputLayout }) {
  const { layout, ...rest } = props;
  const meta = layout.meta;

  const { data, update } = useContext(FormContext);
  const currentValue = data[meta.dataId] as FormData;

  function handleChange(newValue: string) {
    update(meta.dataId, newValue);
  }

  return (
    <>
      {meta.label && <Label htmlFor={meta.dataId}>{meta.label}</Label>}
      {meta.rows && meta.rows > 1 ? (
        <Input
          name={meta.dataId}
          as="textarea"
          rows={meta.rows}
          {...rest}
          fullWidth
          value={currentValue ?? ""}
          onChange={(e: any) => handleChange(e.target.value)}
        />
      ) : (
        <Input
          name={meta.dataId}
          fullWidth={meta.fullWidth}
          type={layout.meta.numeric ? "number" : undefined}
          {...rest}
          value={currentValue ?? ""}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
    </>
  );
}

const Label = styled.label`
  display: block;
  font-size: 16px;
  margin: 30px 0 5px;
  font-weight: 500;
`;

const Input = styled.input<{ fullWidth?: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? `100%` : `200px`)};
  min-height: 40px;
  font-size: 16px;
  padding: 10px;
  border-radius: 7px;
  border: 1px solid #a7a7a7;

  :focus {
    border: 1px solid #e86c00;
  }
`;

export function isTextInputLayout(layout: Layout): layout is TextInputLayout {
  if (layout.type === "textinput") return true;
  return false;
}
