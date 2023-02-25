import type { AppProps } from 'next/app'
import { ChangeEventHandler } from 'react';



export default function NameInput({text, onChange}:{
  text: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
    return <input value={text} onChange={onChange} className='bg-black rounded-md w-1/2 max-w-md h-12 m-2 p-1'/>
  }