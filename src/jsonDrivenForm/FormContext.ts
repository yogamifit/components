import React from "react";

const FormContext = React.createContext<{
  data: {
    [key: string]: unknown;
  };
  update: (key: string, value: unknown) => void;
  showValidationErrors?: boolean;
}>({
  data: {},
  update: () => {},
});

export default FormContext;
