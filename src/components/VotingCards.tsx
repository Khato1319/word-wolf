import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { Player } from 'src/model/Player'
import PlayerVoteButton from 'src/components/PlayerVoteButton'
import { useRouter } from 'next/router'
import { PLAYERS_KEY } from 'src/constants'

interface VotingCardsProps {
  players: Player[],
  wolf: Player
}
export default function VotingCards({players, wolf}:VotingCardsProps) {
  const [currIdx, setCurrIdx] = useState(0)
  const [selected, setSelected] = useState<Player|undefined>(undefined)
  const [calculatedScores, setCalculatedScores] = useState(false)
  const router = useRouter()
  const outOfBounds = currIdx > players.length-1
  const currPlayer = players[currIdx]

  const returnHome = () => {
    router.push({
      pathname: '/play',
      query: { [PLAYERS_KEY]: players.join(';') },
    })
  }

  const goNext = () => {
    if (!selected)
      return
    currPlayer.voted = selected
    selected.votes++
    setSelected(undefined)
    setCurrIdx(i => i+1)
  }

  useEffect(()=> {
    if (outOfBounds && !calculatedScores) {
      const maxVotes = Math.max(...players.map(a => a.votes))
      const voteCorrect = maxVotes === wolf.votes
      for (const player of players) {
        player.addPoints(wolf, voteCorrect)
      }
      setCalculatedScores(true)
    }
  }, [currIdx])

  if (outOfBounds) {
    const maxVotes = Math.max(...players.map(a => a.votes))
    const voteCorrect = maxVotes === wolf.votes
    return <div className='bg-blue-500 w-1/2 h-1/2 rounded-md flex flex-col items-center justify-center gap-2'>
    <h1>{`The players with the most votes where ${players.filter(p => p.votes === maxVotes).map(p => p.name).join(', ')}`}</h1>
    <h2>{`${voteCorrect ? 'The people won' : 'The wolf won'}`}</h2>
    <button onClick={returnHome} className={`w-fit p-1 rounded-sm bg-red-300`}>Finish round</button>
  </div>
  }

    return <div className='bg-blue-500 w-1/2 h-1/2 rounded-md flex flex-col items-center justify-center gap-2'>
      <h1>{`Give the phone to ${currPlayer.name}`}</h1>
      {players.filter(p => p !== currPlayer).map(p => <PlayerVoteButton onClick={() => setSelected(p)} name={p.name} selected={selected === p}></PlayerVoteButton>  )}
      <button onClick={selected && goNext} className={`w-fit p-1 rounded-sm bg-red-300 ${selected ? '' : 'cursor-default opacity-50'}`}>{currIdx === players.length-1 ? 'See results' : 'Go to the next person'}</button>
    </div>
  }