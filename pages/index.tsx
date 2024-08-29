import Head from 'next/head'
import Dashboard from '../components/Dashboard'

export default function Home() {
  return (
    <>
      <Head>
        <title>Reporting - Select Plan | Client Portal</title>
      </Head>
      <Dashboard title="Plans" />
    </>
  )
}