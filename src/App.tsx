import { useState } from 'react'
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const styles = {
  container: css`
  display: flex;
  flex-direction: column;
  width: 200px;
  overflow: visible;
  `
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div css={styles.container}>
        <h1>Hello React {[...Array(count).keys()].map(() => "!").join("")}</h1>
        <div>
        <button onClick={() => setCount(count + 1)}> Push me! </button>
        </div>
      </div>
    </>
  )
}

export default App
