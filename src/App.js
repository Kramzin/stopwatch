import React, { useState, useEffect } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import Time from "./components/Stopwatch";
import ReactiveButton from "reactive-button";
import styled from "styled-components/macro";

// Styled components
const Container = styled.div`
  min-width: 350px;
  margin: auto;
  width: 600px;
  background: white;
`;

const Stopwatch = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10rem;
  color: #191335;
`;

const Controls = styled.div`
  display: flex;
  align-content: space-around;
  justify-content: space-evenly;
`;

const Wait = styled.button`
  color: white;
  background: #5867dd;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  width: 100px;
  height: 35px;
  &:hover {
    opacity: 0.85;
    box-shadow: inset 0 -4px 0 rgb(0 0 0 / 20%);
    margin-top: -1px;
  }
`;
// Styled components

function App() {
  const [time, setTime] = useState(0);
  const [timerOn, setTimeOn] = useState(false);

  // Set time on
  useEffect(() => {
    const unsubscribe = new Subject();
    const observable$ = interval(1000)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (timerOn) {
          setTime((el) => el + 1);
        }
      });

    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [timerOn]);
  // Set time on

  // Control functions
  const startTimer = () => {
    setTimeOn(true);
  };
  const stopTimer = () => {
    setTimeOn(false);
    setTime(0);
  };
  const resetTimer = () => {
    setTime(0);
  };
  const onDoubleClickHandler = () => {
    setTimeOn(false);
  };
  const resumeTimer = () => {
    if (time > 0) {
      setTimeOn(true);
    }
  };
  // Control functions

  return (
    <Container>
      <Stopwatch>
        <Time time={time} />
      </Stopwatch>
      <Controls>
        {!timerOn && time === 0 && (
          <ReactiveButton
            idleText={"Start"}
            rounded={true}
            onClick={startTimer}
          />
        )}
        {(time || timerOn) && (
          <ReactiveButton
            idleText={"Stop"}
            rounded={true}
            onClick={stopTimer}
          />
        )}
        {(time || timerOn) && (
          <Wait onDoubleClick={onDoubleClickHandler} onClick={resumeTimer}>
            {timerOn ? "Wait" : "Resume"}
          </Wait>
        )}
        {(time || timerOn) && (
          <ReactiveButton
            idleText={"Reset"}
            rounded={true}
            onClick={resetTimer}
          />
        )}
      </Controls>
    </Container>
  );
}

export default App;
