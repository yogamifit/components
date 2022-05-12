import React, { useState } from "react";
import FormContext from "../FormContext";
import { Layout } from "../types";
import { BottomButtons } from "./BottomButtons";
import CheckboxGroup, { isCheckboxGroupLayout } from "./CheckboxGroup";
import Contact, { isContactLayout } from "./Contact";
import Heading, { isHeadingLayout } from "./Heading";
import ProgressBar from "./ProgressBar";
import RadioGroup, { isRadioGroupLayout } from "./RadioGroup";
import TextInput, { isTextInputLayout } from "./TextInput";

function useForm(initialFormData?: FormData) {
  const [data, setData] = useState<FormData>(initialFormData ?? {});

  function update(key: string, value: unknown) {
    console.log(key, value);
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return { data, update };
}

export default function JsonDrivenForm(props: JsonDrivenFormProps) {
  const renderLayout = (layout: Layout) => {
    if (isHeadingLayout(layout)) return <Heading layout={layout} />;

    if (isContactLayout(layout)) return <Contact />;

    if (isTextInputLayout(layout)) return <TextInput layout={layout} />;

    if (isCheckboxGroupLayout(layout)) return <CheckboxGroup layout={layout} />;

    if (isRadioGroupLayout(layout)) return <RadioGroup layout={layout} />;

    return null;
  };

  const { data, update } = useForm(props.initialFormData);

  const [loading, setLoading] = useState(false);

  const handleBackClick = async () => {
    await props.onPrevious();
  };

  const handleNextClick = async () => {
    setLoading(true);

    await props.onNext({ data });

    setLoading(false);
  };

  const lastStep = props.layoutJson.length - 1;
  const isFirstStep = props.step === 0;
  const isLastStep = props.step === lastStep;

  return (
    <>
      <ProgressBar currentStep={props.step} lastStep={lastStep} />

      <FormContext.Provider value={{ data, update }}>
        {props.layoutJson[props.step].layout.map((layout, index) => (
          <React.Fragment key={index}>{renderLayout(layout)}</React.Fragment>
        ))}
      </FormContext.Provider>

      <BottomButtons
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        onBack={handleBackClick}
        onNext={handleNextClick}
        submitLoading={loading}
      />
    </>
  );
}

interface FormData {
  [key: string]: unknown;
}

interface JsonDrivenFormProps {
  layoutJson: {
    formId: string;
    layout: Layout[];
  }[];

  initialFormData?: FormData;

  step: number;

  onNext: (formData: { data: FormData }) => void | Promise<void>;

  onPrevious: () => void | Promise<void>;
}
