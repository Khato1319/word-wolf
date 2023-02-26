import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Player } from 'src/model/Player'
import StandardButton from './StandardButton'

interface WordShowingProps {
  players: Player[],
  onFinish: Function
}
export default function WordShowing({players, onFinish}:WordShowingProps) {
  const [currIdx, setCurrIdx] = useState(0)
  const [show, setShow] = useState(new Array(players.length).fill(false))
  const outOfBounds = currIdx > players.length-1

  const setIdxShowValue = (idx:number, value:boolean) => {
    setShow(arr => {arr[currIdx] = value; return [...arr]})
  }

  if (outOfBounds) {
    onFinish()
    return <></>
  }

    return <div className='text-lg w-1/2 h-1/2 flex flex-col items-center justify-center gap-2'>
      <h1>{`Give the phone to ${players[currIdx].name}`}</h1>
      <StandardButton onClick={()=>setIdxShowValue(currIdx, true)} disabled={show[currIdx]}>Reveal word</StandardButton>
      {show[currIdx] ? <div>
        {`Your word is: ${players[currIdx].word}`}
      </div> : <></>}
      <StandardButton disabled={!show[currIdx]} onClick={() => show[currIdx] && setCurrIdx(i => i+1)}>
      {currIdx === players.length-1 ? 'Start playing!' : 'Go to the next person'}
      </StandardButton>
    </div>
  }