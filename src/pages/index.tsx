import Head from 'next/head'
import Link from 'next/link'


export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='flex justify-center items-center flex-col flex-1 gap-2'>
       <h1 className='text-2xl'>
        Welcome to WordWolf!
       </h1>
       <h2 className='text-xl'>How to play:</h2>
       <div>
        <ol>
        <li>
        1. Every person will be assigned a word

        </li>
        <li>
           
        2. Only one of the participants will be given a different word (that person will be the <a className='italic font-bold'>wolf</a>)
        </li>
        <li>
          3. When the timer begins, the players will start talking about the word they were given, and the goal is to discover who the wolf is.
        </li>
        <li>
          4. At the end of the round everyone will get to vote who they think the wolf is
        </li>
        <li>
          5. If the majority correctly votes for the wolf then the <a className='italic font-bold'>people</a> win, otherwise the <a className='italic font-bold'>wolf</a> wins.
        </li>
        </ol>
   
       </div>
       <Link href='/play' className='bg-red-300 rounded-sm p-1 text-lg'>Play!</Link>
      </div>
    </>
  )
}
