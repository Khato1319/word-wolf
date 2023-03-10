import type { AppProps } from 'next/app'
import { ChangeEventHandler } from 'react';



export default function NameInput({text, onChange}:{
  text: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
    return <input value={text} onChange={onChange} className='bg-gray-400 outline-0 rounded-2xl w-1/2 max-w-md h-12 m-2 p-1 px-2'/>
  }