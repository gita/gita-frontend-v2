import Head from 'next/head'
import Banner from '../components/Home/Banner'
import Chapters from '../components/Home/Chapters'
import Newsletter from '../components/Home/Newsletter'
import VerseOfDay from '../components/Home/VerseOfDay'
import HomeLayout from '../layouts/HomeLayout'


export default function Home() {
  return (
    <div className="font-inter min-h-screen py-2">
      <Head>
        <title>Bhagwat Gita App</title>
        <link rel="icon" href="/favicon.ico" />
        <link ref="style" rel="stylesheet" href="/globals.css"/>
      </Head>

      <main className="">
      <HomeLayout>
       <Banner/>
       <VerseOfDay/>
       <Newsletter/>
       <Chapters/>
       </HomeLayout>
      </main>

    </div>
  )
}
