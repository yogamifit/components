export interface Survey {
  surveyId: string;
  layout: Layout[];
}

export type Layout = ContactLayout | HeadingLayout | TextInputLayout | RadioGroupLayout | CheckboxGroupLayout;

export interface ContactLayout {
  type: "contact";
}

export interface HeadingLayout {
  type: "heading";
  meta: {
    text: string;
  };
}

export interface TextInputLayout {
  type: "textinput";
  meta: {
    dataId: string;
    label?: string;
    rows?: number;
    fullWidth?: boolean;
    numeric?: boolean;
  };
}

export interface RadioGroupLayout {
  type: "radiogroup";
  meta: {
    dataId: string;
    label: string | undefined;
    options: {
      dataId: string;
      label: string;
      description: string | undefined;
      custom?: boolean;
    }[];
  };
}

export interface CheckboxGroupLayout {
  type: "checkboxgroup";
  meta: {
    dataId: string;
    label: string | undefined;
    options: {
      dataId: string;
      label: string;
      description: string | undefined;
      custom?: boolean;
    }[];
  };
}
