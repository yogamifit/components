import React, { ComponentProps, Fragment, useContext } from "react";
import { RadioGroupLayout, Layout } from "../types";
import styled from "styled-components";
import FormContext from "../FormContext";

type FormData = string;

export default function RadioGroup(props: { layout: RadioGroupLayout }) {
  const meta = props.layout.meta;
  const { data, update } = useContext(FormContext);

  const value = data[meta.dataId] as FormData | undefined;

  function isChecked(dataId: string) {
    return value === dataId;
  }

  function toggle(dataId: string) {
    if (isChecked(dataId)) return;
    else update(meta.dataId, dataId);
  }

  function handleCustomInputChange(dataId: string, newValue: string) {
    update(meta.dataId, dataId);
  }

  return (
    <>
      {meta.label && <GroupLabel>{meta.label}</GroupLabel>}
      {meta.options.map((option) => (
        <Fragment key={option.dataId}>
          <SemanticRadio type="radio" id={option.dataId} name={meta.dataId} onChange={() => toggle(option.dataId)} />
          <Label htmlFor={option.dataId}>
            <RadioIcon checked={isChecked(option.dataId)} />
            <div>
              <LabelText>{option.label}</LabelText>
              {option.description && <DescriptionText>{option.description}</DescriptionText>}
            </div>
            {option.custom && (
              <TextInput
                name={option.dataId}
                onClick={() => toggle(option.dataId)}
                onChange={(e) => handleCustomInputChange(option.dataId, e.target.value)}
              />
            )}
          </Label>
        </Fragment>
      ))}
    </>
  );
}

const GroupLabel = styled.label`
  display: block;
  font-size: 16px;
  margin: 30px 0 5px;
  font-weight: 500;
`;

const SemanticRadio = styled.input`
  visibility: hidden;
  width: 0;
  height: 0;
  position: absolute;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
`;

function RadioIcon(props: ComponentProps<"input">) {
  return <RadioWrapper>{props.checked ? <RadioChecked /> : <RadioUnchecked />}</RadioWrapper>;
}

const RadioWrapper = styled.div`
  margin-right: 10px;
  display: flex;
`;

const LabelText = styled.span`
  display: block;
  font-size: 16px;
`;

const DescriptionText = styled.span`
  display: block;
  font-size: 14px;
  color: #6f6f6f;
`;

const TextInput = styled.input`
  margin-left: 20px;
  height: 40px;
  font-size: 16px;
  padding: 10px;
  border-radius: 7px;
  border: 1px solid #a7a7a7;

  :focus {
    border: 1px solid #e86c00;
  }
`;

function RadioChecked() {
  return (
    <svg width="20" height="20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40 60C51.0457 60 60 51.0457 60 40C60 28.9543 51.0457 20 40 20C28.9543 20 20 28.9543 20 40C20 51.0457 28.9543 60 40 60Z"
        fill="#E86C00"
      />
      <path
        d="M40 0C17.92 0 0 17.92 0 40C0 62.08 17.92 80 40 80C62.08 80 80 62.08 80 40C80 17.92 62.08 0 40 0ZM40 72C22.32 72 8 57.68 8 40C8 22.32 22.32 8 40 8C57.68 8 72 22.32 72 40C72 57.68 57.68 72 40 72Z"
        fill="#E86C00"
      />
    </svg>
  );
}

function RadioUnchecked() {
  return (
    <svg width="20" height="20" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40 0C17.92 0 0 17.92 0 40C0 62.08 17.92 80 40 80C62.08 80 80 62.08 80 40C80 17.92 62.08 0 40 0ZM40 72C22.32 72 8 57.68 8 40C8 22.32 22.32 8 40 8C57.68 8 72 22.32 72 40C72 57.68 57.68 72 40 72Z"
        fill="#6F6F6F"
      />
    </svg>
  );
}

export function isRadioGroupLayout(layout: Layout): layout is RadioGroupLayout {
  if (layout.type === "radiogroup") return true;
  return false;
}
