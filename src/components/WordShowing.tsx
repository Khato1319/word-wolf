import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Player } from 'src/model/Player'

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

    return <div className='bg-blue-500 w-1/2 h-1/2 rounded-md flex flex-col items-center justify-center gap-2'>
      <h1>{`Give the phone to ${players[currIdx].name}`}</h1>
      <button onClick={()=>setIdxShowValue(currIdx, true)} className={`w-fit p-1 rounded-sm bg-red-300 ${show[currIdx] ? 'cursor-default opacity-50': ''}`}>Reveal word</button>
      {show[currIdx] ? <div>
        {`Your word is: ${players[currIdx].word}`}
      </div> : <></>}
      <button onClick={() => show[currIdx] && setCurrIdx(i => i+1)} className={`w-fit p-1 rounded-sm bg-red-300 ${!show[currIdx] ? 'cursor-default opacity-50': ''}`}>{currIdx === players.length-1 ? 'Start playing!' : 'Go to the next person'}</button>
    </div>
  }