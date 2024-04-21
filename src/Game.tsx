import { useEffect, useRef, useState } from "react"

type NewWordEv = {
  type: "new_word",
  word: string,
  time: number,
}
type KeyTypeEv = {
  type: "key_type",
  key: string,
  isCorrect: boolean,
  time: number,
}
export type Ev = NewWordEv | KeyTypeEv

type TypingGameProps = {
  words: string[],
  onEv?: (ev: Ev) => void,
}
export const TypingGame: React.FC<TypingGameProps> = ({ words, onEv = () => { } }) => {
  const isFirst = useRef(true)

  const [failed, setFailed] = useState(false)
  const [index, setIndex] = useState(0)
  const setRandom = () => {
    const next = Math.floor(Math.random() * words.length)
    setIndex(next)
    return next
  }
  const [cur, setCur] = useState(0)

  const word = words[index]

  if (isFirst.current) {
    onEv({ word: words[index], time: Date.now(), type: "new_word" })
    isFirst.current = false
  }

  const keyHandler = (ev: KeyboardEvent) => {
    if (ev.key.length !== 1) return

    const isCorrect = ev.key === word[cur]
    const isCompleted = (cur + 1) === word.length
    onEv({ key: ev.key, isCorrect, time: Date.now(), type: "key_type" })

    if (isCorrect) {
      setFailed(false)

      if (isCompleted) {
        setRandom()
        setCur(0)
        isFirst.current = true
      } else {
        setCur(cur + 1)
      }
    } else {
      setFailed(true)
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", keyHandler)
    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  })

  return (
    <>
      <div style={{ padding: "10px 20px", border: "solid " + (failed ? "red" : "gray"), borderRadius: "5px", textAlign: "center", transitionDuration: "150ms", }}>
        <span style={{ color: "white", fontSize: "25px", fontWeight: 200 }}>
          <span style={{ color: "greenyellow", textDecoration: "overline", }}>
            {words[index].slice(0, cur)}
          </span>
          {words[index].substring(cur)}
        </span>
      </div>
    </>
  )
}
