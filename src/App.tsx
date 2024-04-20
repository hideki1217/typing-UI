import { useRef, useState } from 'react'
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { TypingGame } from './Game';

const styles = {
  container: css`
  display: flex;
  flex-direction: column;
  white-space: nowrap;

  width: 200px;
  text-align: center;
  `
}

function App() {
  const [count, setCount] = useState(0)
  const wordsRef = useRef([...Array(100).keys()].map(() => Math.random().toString(36).substring(2)))

  return (
    <>
      <div css={styles.container}>
        <h1>Type Me {count > 1 ? [...Array(count - 1).keys()].map(() => ".").join("") : null}</h1>
        <TypingGame words={wordsRef.current} onEv={(ev) => {
          console.log(ev)

          if (ev.type === "new_word") setCount(count + 1)
        }} />
        <h1></h1>
      </div>
    </>
  )
}

export default App
