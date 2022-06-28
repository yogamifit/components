import React, { useState } from "react";
import FormContext from "../FormContext";
import { Layout } from "../types";
import { BottomButtons } from "./BottomButtons";
import CheckboxGroup, { isCheckboxGroupLayout } from "./CheckboxGroup";
import Contact, { isContactLayout } from "./Contact";
import FileDropZone, { isFileDropZoneLayout } from "./FileDropZone";
import Heading, { isHeadingLayout } from "./Heading";
import HelperText, { isHelperTextLayout } from "./HelperText";
import ProgressBar from "./ProgressBar";
import RadioGroup, { isRadioGroupLayout } from "./RadioGroup";
import TextInput, { isTextInputLayout } from "./TextInput";

function useForm({
  initialFormData,
  onChange,
}: {
  initialFormData?: FormData;
  onChange?: (formData: { data: FormData }) => void;
}) {
  const [data, setData] = useState<FormData>(initialFormData ?? {});

  function update(key: string, value: unknown) {
    console.log({ key, value });
    setData((prev) => {
      const newState = {
        ...prev,
        [key]: value,
      };

      onChange?.({ data: newState });

      return newState;
    });
  }

  return { data, update };
}

export default function JsonDrivenForm(props: JsonDrivenFormProps) {
  const { data, update } = useForm({ initialFormData: props.initialFormData, onChange: props.onChange });

  const [loading, setLoading] = useState(false);

  const currentStep = props.step ?? 0;
  const lastStep = props.layoutJson.length - 1;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === lastStep;

  const showProgressBar = props.showProgressBar ?? true;
  const showFormActionButtons = props.showFormActionButtons ?? true;
  const showValidationErrors = props.showValidationErrors;

  const renderLayout = (layout: Layout) => {
    if (isHeadingLayout(layout)) return <Heading layout={layout} />;

    if (isHelperTextLayout(layout)) return <HelperText layout={layout} />;

    if (isContactLayout(layout)) return <Contact />;

    if (isTextInputLayout(layout)) return <TextInput layout={layout} />;

    if (isCheckboxGroupLayout(layout)) return <CheckboxGroup layout={layout} />;

    if (isRadioGroupLayout(layout)) return <RadioGroup layout={layout} />;

    if (isFileDropZoneLayout(layout)) return <FileDropZone layout={layout} />;

    const CustomLayoutComponent = props.customLayoutComponents?.[layout.type];

    if (CustomLayoutComponent)
      return <CustomLayoutComponent layout={layout} onChange={update} showValidationError={showValidationErrors} />;

    return null;
  };

  const handleBackClick = async () => {
    await props.onPrevious?.();
  };

  const handleNextClick = async () => {
    setLoading(true);

    await props.onNext?.({ data });

    setLoading(false);
  };

  return (
    <>
      {showProgressBar && <ProgressBar currentStep={currentStep} lastStep={lastStep} />}

      <FormContext.Provider value={{ data, update, showValidationErrors }}>
        {props.layoutJson[currentStep].layout.map((layout, index) => (
          <React.Fragment key={index}>{renderLayout(layout)}</React.Fragment>
        ))}
      </FormContext.Provider>

      {showFormActionButtons && (
        <BottomButtons
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          onBack={handleBackClick}
          onNext={handleNextClick}
          submitLoading={loading}
        />
      )}
    </>
  );
}

interface FormData {
  [key: string]: unknown;
}

interface JsonDrivenFormProps {
  layoutJson: {
    layout: Layout[];
  }[];

  /**
   * A map of React components for custom form layouts. Useful for rendering
   * one-off components that are not part of the standard form element set.
   */
  customLayoutComponents?: {
    [layoutType: string]: React.ComponentType<{
      layout: {
        type: string;
        meta?: any;
        [key: string]: any;
      };
      onChange: (key: string, value: unknown) => void;
      showValidationError?: boolean;
    }>;
  };

  /**
   * Form elements to be pre-filled with data. Useful when resuming a form.
   */
  initialFormData?: FormData;

  /**
   * Current form step. Defaults to 0.
   */
  step?: number;

  /**
   * Whether to show the step progress indicator on top of the form. Defaults to
   * true.
   */
  showProgressBar?: boolean;

  /**
   * Whether to show the Next, Previous and Finish buttons at the bottom of the
   * form. Defaults to true.
   */
  showFormActionButtons?: boolean;

  /**
   * Whether to show validation error text under required fields.
   */
  showValidationErrors?: boolean;

  onChange?: (formData: { data: FormData }) => void;

  onNext?: (formData: { data: FormData }) => void | Promise<void>;

  onPrevious?: () => void | Promise<void>;
}
