import styled from "styled-components";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export function BottomButtons(props: BottomButtonsProps) {
  return (
    <BottomButtonsWrapper>
      <NextButton onClick={props.onNext} disabled={props.submitLoading}>
        {props.isLastStep ? "Finish" : "Next"}{" "}
        <Spin
          size="default"
          spinning={props.submitLoading}
          indicator={<LoadingOutlined style={{ fontSize: 24, color: "white", marginLeft: 20 }} spin />}
        />
      </NextButton>
      {!props.isFirstStep && (
        <Button onClick={props.onBack} style={{ marginLeft: -17 }}>
          <ChevronLeft />
          Previous
        </Button>
      )}
    </BottomButtonsWrapper>
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

interface BottomButtonsProps {
  /**
   * If true, back button won't be shown.
   */
  isFirstStep: boolean;
  /**
   * If true, next button will have the label "Finish" instead of "Next".
   */
  isLastStep: boolean;
  /**
   * If true, shows loading indicator in next button to indicate form submit.
   */
  submitLoading: boolean;
  onBack: () => void;
  onNext: () => void;
}
