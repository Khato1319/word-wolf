import NameInput from '@components//NameInput'
import { useRouter } from 'next/router';
import {  useEffect, useState } from 'react'
import { Player } from 'src/model/Player';
import { PlayingState } from 'src/model/PlayingState';
import { Api } from '../../api';
import WordShowing from '@components//WordShowing';
import Timer from '@components//Timer';
import VotingCards from '@components//VotingCards';
import { PLAYERS_KEY } from 'src/constants';


export default function Playing() {
    const [players, setPlayers] = useState<Player[]>([])
    const router = useRouter()
    const data = router.query[PLAYERS_KEY]
    const [words, setWords] = useState(undefined)
    const [wolf, setWolf] = useState<Player | undefined>(undefined)
    const [playingState, setPlayingState] = useState(PlayingState.ASSIGN_WORD)
    useEffect(() => {
        if (!router.isReady)
            return
        if (!data || typeof data !== 'string') {
            router.replace('/play')
            return
        }
        const serializedPlayers =  data.split(';')
        setPlayers(serializedPlayers.map(serialized => Player.getBySerialized(serialized)))

    }, [router.isReady])

    useEffect(() => {
        if (!words || !players.length)
            return
        const differentWordIdx = Math.floor(Math.random() *players.length-1) + 1;
        setWolf(players[differentWordIdx])
        for (const player of players) {
            player.setWord(words[0])
        }

        setPlayers(players)

        players[differentWordIdx].setWord(words[1])
        setPlayingState(PlayingState.SHOWING_WORDS)
    }, [words, players])

    useEffect(() => {
        Api.getWords().then((words) => {
            setWords(words)
        })
    }, [])

    const getViewBasedOnState = () => {
        switch(playingState) {
            case PlayingState.ASSIGN_WORD:
                return <h1 className='w-full text-center text-xl p-1'>
            Fetching words...
        </h1>
        break
        case PlayingState.SHOWING_WORDS:
            return <WordShowing onFinish={() => setPlayingState(PlayingState.PLAYING)} players={players}></WordShowing>
            break
        case PlayingState.PLAYING:
            return <div className='flex flex-col gap-2 justify-center items-center'>
            <h1 className='text-2xl font-bold'>Start talking!</h1>
            <Timer onFinish={() => setPlayingState(PlayingState.VOTING)} seconds={10}></Timer>
            </div>
            break
        case PlayingState.VOTING:
                return <VotingCards players={players} wolf={wolf}></VotingCards>
            }
       
        
    }


    if(!router.isReady)
        return <></>

    return <div className='bg-black w-full flex flex-col justify-center items-center'>   
      {getViewBasedOnState()}
    </div>
  }