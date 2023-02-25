import type { AppProps } from 'next/app'
import { MouseEventHandler } from 'react';

interface PlayerVoteButtonProps {
  selected: boolean;
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>
}

export default function PlayerVoteButton({selected, name, onClick}:PlayerVoteButtonProps) {
      return <button onClick={onClick} className={`m-2 p-1 font-bold rounded-md ${selected ? 'bg-red-500' : 'bg-green-500'}`}>
      {name}
      </button>
  }