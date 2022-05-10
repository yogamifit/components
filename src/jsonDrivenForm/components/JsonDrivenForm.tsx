import React, { useState } from "react";
import { Layout, Survey } from "../types";
import styled from "styled-components";
import FormContext from "../FormContext";
import CheckboxGroup, { isCheckboxGroupLayout } from "./CheckboxGroup";
import Heading, { isHeadingLayout } from "./Heading";
import RadioGroup, { isRadioGroupLayout } from "./RadioGroup";
import TextInput, { isTextInputLayout } from "./TextInput";
import Contact, { isContactLayout } from "./Contact";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ProgressBar from "./ProgressBar";

function useForm() {
  const [data, setData] = useState<{
    [key: string]: unknown;
  }>({});

  function update(key: string, value: unknown) {
    console.log(key, value);
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return { data, update };
}

export default function JsonDrivenSurvey(props: {
  survey: Survey;
  onNext: () => void;
  onBack: () => void;
  onFinish: () => void;
  onSubmit: (form: { data: { [key: string]: unknown } }) => Promise<void>;
  currentStep: number;
  totalSteps: number;
}) {
  const renderLayout = (layout: Layout, index: number) => {
    if (isHeadingLayout(layout)) return <Heading key={index} layout={layout} />;

    if (isTextInputLayout(layout)) return <TextInput key={index} layout={layout} />;

    if (isCheckboxGroupLayout(layout)) return <CheckboxGroup key={index} layout={layout} />;

    if (isRadioGroupLayout(layout)) return <RadioGroup key={index} layout={layout} />;

    if (isContactLayout(layout)) return <Contact key={index} />;

    return null;
  };

  const isFirstSurvey = props.currentStep === 0;

  const isLastSurvey = props.currentStep === props.totalSteps;

  const handleBackClick = () => {
    if (isFirstSurvey) return;
    props.onBack();
  };

  const handleNextClick = async () => {
    await submit();
    if (isLastSurvey) props.onFinish();
    else props.onNext();
  };

  const { data, update } = useForm();

  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);

    await props.onSubmit({ data });

    setLoading(false);
  }

  return (
    <>
      <ProgressBar currentStep={props.currentStep} totalSteps={props.totalSteps} />

      <FormContext.Provider value={{ data, update }}>{props.survey.layout.map(renderLayout)}</FormContext.Provider>

      <BottomButtonsWrapper>
        <NextButton onClick={handleNextClick} disabled={loading}>
          {isLastSurvey ? "Finish" : "Next"}{" "}
          <Spin
            size="default"
            spinning={loading}
            indicator={<LoadingOutlined style={{ fontSize: 24, color: "white", marginLeft: 20 }} spin />}
          />
        </NextButton>
        {!isFirstSurvey && (
          <Button onClick={handleBackClick} style={{ marginLeft: -17 }}>
            <ChevronLeft />
            Previous
          </Button>
        )}
      </BottomButtonsWrapper>
    </>
  );
}

const ChevronLeft = () => (
  <svg
    width="25"
    height="25"
    style={{ marginRight: 5 }}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.841 6.175L11.666 5L6.66602 10L11.666 15L12.841 13.825L9.02435 10L12.841 6.175Z" fill="black" />
  </svg>
);

const BottomButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: white;
  border-radius: 7px;
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NextButton = styled(Button)`
  padding: 10px 20px;
  background-color: #f68e2e;
  border-bottom: 3px solid #c07128;
  color: white;
  min-width: 150px;
`;
