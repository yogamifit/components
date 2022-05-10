import React from "react";
import styled from "styled-components";
import { HeadingLayout, Layout } from "../types";

export default function Heading(props: { layout: HeadingLayout }) {
  return <H1>{props.layout.meta.text}</H1>;
}

const H1 = styled.h1`
  @media screen and (max-width: 500px) {
    font-size: 24px;
  }
`;

export function isHeadingLayout(layout: Layout): layout is HeadingLayout {
  if (layout.type === "heading") return true;
  return false;
}
