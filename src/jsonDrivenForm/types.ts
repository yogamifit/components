export interface Survey {
  surveyId: string;
  layout: Layout[];
}

export type Layout =
  | ContactLayout
  | HeadingLayout
  | HelperTextLayout
  | TextInputLayout
  | RadioGroupLayout
  | CheckboxGroupLayout
  | CustomLayout
  | FileDropZoneLayout;

export interface CustomLayout {
  type: string;
  meta?: any;
  [key: string]: any;
}

export interface ContactLayout {
  type: "contact";
}

export interface HeadingLayout {
  type: "heading";
  meta: {
    text: string;
  };
}

export interface HelperTextLayout {
  type: "helperText";
  meta: {
    text: string;
  };
}

export interface TextInputLayout {
  type: "textinput";
  meta: {
    dataId: string;
    label?: string;
    placeholder?: string;
    helperText?: string;
    rows?: number;
    fullWidth?: boolean;
    numeric?: boolean;
    required?: boolean;
  };
}

export interface RadioGroupLayout {
  type: "radiogroup";
  meta: {
    dataId: string;
    label: string | undefined;
    required?: boolean;
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
    required?: boolean;
    options: {
      dataId: string;
      label: string;
      description: string | undefined;
      custom?: boolean;
    }[];
  };
}

export interface FileDropZoneLayout {
  type: "filedropzone";
  meta: {
    dataId: string;
    label: string | undefined;
    supportedFormats: Record<string, string[]> | undefined;
    allowMultiple: boolean | undefined;
    maxFiles?: number | undefined;
    required?: boolean;
  };
}
