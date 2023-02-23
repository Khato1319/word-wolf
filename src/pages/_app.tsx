import '/src/styles/globals.css'
import Navbar from '@components//Navbar'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <div className='w-full min-h-screen flex flex-col'>
    <Navbar></Navbar>
    <main className='w-full flex-1 flex'>
    <Component {...pageProps} />
    </main>
  </div>
}
