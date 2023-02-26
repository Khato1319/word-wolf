import { MouseEventHandler } from 'react';

interface StandardButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  children: string | JSX.Element | JSX.Element[]
}

export default function StandardButton({onClick, disabled, children}:StandardButtonProps) {
      return <button onClick={(e) => disabled || onClick(e)} className={`w-fit p-1 rounded-md bg-red-300 ${disabled ? 'cursor-default opacity-50': ''}`}>
        {children}
      </button>
  }