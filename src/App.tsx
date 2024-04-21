import { useEffect, useRef, useState } from 'react'
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Ev, TypingGame } from './Game';
import { IoMdDownload } from "react-icons/io";

const styles = {
  container: css`
  display: flex;
  flex-direction: column;
  white-space: nowrap;

  width: 200px;
  text-align: center;
  `,
  toolBox: css`
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 20px;

  display: flex;
  flex-diraction: row;
  `,
  toolButton: css`
  width: 40px;
  height: 40px;
  font-size: 30px;
  border-radius: 999px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: gray;
  &:hover {
    color: yellowgreen;
    font-weight: bold;
  }
  `
}

function App() {
  const [count, setCount] = useState(0)
  const wordsRef = useRef([...Array(100).keys()].map(() => Math.random().toString(36).substring(2)))
  const evsRef = useRef<Ev[]>([])
  const evsJsonRef = useRef("")

  const reset = () => {
    evsRef.current = []
    setCount(0)
  }

  return (
    <>
      <div css={styles.container}>
        <h1>Type Me {count > 1 ? [...Array(count - 1).keys()].map(() => ".").join("") : null}</h1>
        <TypingGame words={wordsRef.current} onEv={(ev) => {
          console.log(ev)
          evsRef.current.push(ev)
          evsJsonRef.current = JSON.stringify(evsRef.current, undefined, 1)

          if (ev.type === "new_word") setCount(count + 1)
        }} />
        <h1></h1>
      </div>
      <div css={styles.toolBox}>
        <a css={styles.toolButton}
          href={URL.createObjectURL(new Blob([evsJsonRef.current], { type: "text/plain" }))}
          download={`typing-result-${Date.now()}.json`}
          onClick={reset}><IoMdDownload /></a>
      </div>
    </>
  )
}

export default App
