import styled from "styled-components";
import { HelperTextLayout, Layout } from "../types";

const HelperText = (props: { layout: HelperTextLayout }) => {
  return <P>{props.layout.meta.text}</P>;
};

const P = styled.p`
  margin: 5px 0;
`;

export default HelperText;

export function isHelperTextLayout(layout: Layout): layout is HelperTextLayout {
  if (layout.type === "helperText") return true;
  return false;
}
