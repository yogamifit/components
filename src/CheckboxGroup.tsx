import { ComponentProps } from "react";
import styled from "styled-components";

export const GroupLabel = styled.label`
  display: block;
  font-size: 16px;
  margin: 30px 0 5px;
  font-weight: 500;
`;

export const SemanticCheckbox = styled.input`
  visibility: hidden;
  position: absolute;
  width: 0;
  height: 0;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
`;

export function CheckboxIcon(props: ComponentProps<"input">) {
  return <CheckboxWrapper>{props.checked ? <CheckboxChecked /> : <CheckboxUnchecked />}</CheckboxWrapper>;
}

const CheckboxWrapper = styled.div`
  margin-right: 10px;
  display: flex;
`;

export const LabelText = styled.span`
  display: block;
  font-size: 16px;
`;

export const DescriptionText = styled.span`
  display: block;
  font-size: 14px;
  color: #6f6f6f;
`;

function CheckboxChecked() {
  return (
    <svg width="20" height="20" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M64 0H8C3.56 0 0 3.6 0 8V64C0 68.4 3.56 72 8 72H64C68.44 72 72 68.4 72 64V8C72 3.6 68.44 0 64 0ZM28 56L8 36L13.64 30.36L28 44.68L58.36 14.32L64 20L28 56Z"
        fill="#E86C00"
      />
    </svg>
  );
}

function CheckboxUnchecked() {
  return (
    <svg width="20" height="20" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M64 8V64H8V8H64ZM64 0H8C3.6 0 0 3.6 0 8V64C0 68.4 3.6 72 8 72H64C68.4 72 72 68.4 72 64V8C72 3.6 68.4 0 64 0Z"
        fill="#6F6F6F"
      />
    </svg>
  );
}
