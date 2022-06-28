import styled from "styled-components";

export default function ProgressBar(props: ProgressBarProps) {
  return (
    <ProgressBarWrapper>
      <ProgressText>
        {props.currentStep + 1} / {props.lastStep + 1}
      </ProgressText>
      <ProgressBarTotal>
        <ProgressCompleted style={{ width: `${(props.currentStep / props.lastStep) * 100}%` }} />
      </ProgressBarTotal>
    </ProgressBarWrapper>
  );
}

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 50px;
`;

const ProgressText = styled.span`
  display: inline-block;
  margin-bottom: 10px;
`;

const ProgressBarTotal = styled.div`
  height: 5px;
  width: 100%;
  background-color: #e5e5e5;
  /* margin: 0 0 50px; */

  @media screen and (max-width: 500px) {
    margin-bottom: 30px;
  }
`;

const ProgressCompleted = styled.div`
  height: 100%;
  background-color: #f68e2e;
`;

interface ProgressBarProps {
  currentStep: number;
  lastStep: number;
}
