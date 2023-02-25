import type { AppProps } from 'next/app'
import Link from 'next/link'

export default function Navbar() {
    return <header className='bg-blue-500 w-full h-12 flex items-center'>
      <Link href={'/'} className='px-2 font-bold'>
      WordWolf
      </Link>
    </header>
  }