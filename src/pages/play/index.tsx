import NameInput from '@components//NameInput'
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react'
import { PLAYERS_KEY } from 'src/constants';
import { Player } from 'src/model/Player';


interface Input {
    id: number;
    text: string
}
 

export default function Play() {
    const [players, setPlayers] = useState<Input[]>([{id: 0, text: ""}])
    const [showDialog, setShowDialog] = useState(true)
    const [id, setId] = useState(1)
    const router = useRouter()

    useEffect(() => {
        if (!router.isReady)
            return

    }, [router.isReady])

  

    const handleChange = (idx: number, e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        setPlayers(p => {
            p[idx] = {...p[idx], text}
            return [...p]
        })
    }

    const arePlayersUnique = () => {
        const names = players.map(p => p.text)
        const set = new Set(names);
        return set.size === names.length;
    }

    const addInput = () => {
        setPlayers(p => [...p, {id, text: ""}])
        setId(id => id+1)
    }

    const resumeSession = () => {
        router.push({
            pathname: '/playing',
            query: {...router.query},
          })
    }

    const savePlayersAndStartGame = () => {
        const playersString = players.filter(p => p.text !== "").map(p => new Player(p.text, 0)).join(';')
        localStorage.setItem(PLAYERS_KEY, playersString)
        
    }

    if (showDialog && typeof router.query[PLAYERS_KEY] === 'string') {
        return <div className='w-full flex justify-center items-center'>
            <div className='w-fit h-fit rounded-md p-2  bg-gray-400'>
            <h2>Continue same session?</h2>
            <div className='flex justify-between'>
                <button className='p-1 w-fit bg-blue-300 rounded-md' onClick={resumeSession}>Continue</button>
                <button className='p-1 w-fit bg-blue-300 rounded-md' onClick={() => setShowDialog(false)}>Start over</button>
            </div>
            </div>
        </div>
    }

    return <div className='bg-gray-500 w-full flex flex-col justify-center items-center'>
      <h2 className='w-full text-center text-xl p-1'>Players:</h2>
      <div className='flex justify-center flex-col items-center w-full'>
        {players.map((p, idx) => <NameInput onChange={(e) => handleChange(idx, e)} key={p.id} text={p.text}/>)}
      </div>
      <button onClick={addInput} className='bg-blue-300 p-1 rounded-md m-2 w-8'>+</button>
      <button onClick={() => arePlayersUnique() && savePlayersAndStartGame()}  className={`bg-red-300 p-1 rounded-md m-2 w-fit mt-4 ${arePlayersUnique() ? '' : 'cursor-default opacity-50'}`}>Start game!</button>
    </div>
  }