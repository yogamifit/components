import React, { ComponentProps, Fragment, useContext, useMemo } from "react";
import { CheckboxGroupLayout, Layout } from "../types";
import styled from "styled-components";
import FormContext from "../FormContext";

type FormData = { dataId: string; custom?: string }[];

export default function CheckboxGroup(props: { layout: CheckboxGroupLayout }) {
  const meta = props.layout.meta;

  const { data, update } = useContext(FormContext);
  const value = data[meta.dataId] as FormData | undefined;

  const selected = useMemo(() => {
    return value?.map(({ dataId }) => dataId);
  }, [value]);

  function isChecked(dataId: string) {
    return selected?.includes(dataId);
  }

  function toggle(dataId: string) {
    const prev = selected || [];
    let newSelected;

    if (isChecked(dataId)) newSelected = prev.filter((id) => id !== dataId);
    else newSelected = prev.concat([dataId]);

    update(
      meta.dataId,
      newSelected.map((dataId) => ({ dataId }))
    );
  }

  return (
    <>
      {meta.label && <GroupLabel>{meta.label}</GroupLabel>}
      {meta.options.map((option) => (
        <Fragment key={option.dataId}>
          <SemanticCheckbox
            type="checkbox"
            id={option.dataId}
            name={option.dataId}
            onChange={() => toggle(option.dataId)}
          />
          <Label htmlFor={option.dataId}>
            <CheckboxIcon checked={isChecked(option.dataId)} />
            <div>
              <LabelText>{option.label}</LabelText>
              {option.description && <DescriptionText>{option.description}</DescriptionText>}
            </div>
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

const SemanticCheckbox = styled.input`
  visibility: hidden;
  position: absolute;
  width: 0;
  height: 0;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
`;

function CheckboxIcon(props: ComponentProps<"input">) {
  return <CheckboxWrapper>{props.checked ? <CheckboxChecked /> : <CheckboxUnchecked />}</CheckboxWrapper>;
}

const CheckboxWrapper = styled.div`
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

export function isCheckboxGroupLayout(layout: Layout): layout is CheckboxGroupLayout {
  if (layout.type === "checkboxgroup") return true;
  return false;
}
