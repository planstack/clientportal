import Head from 'next/head'
import Dashboard from '../components/Dashboard'

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings | Client Portal</title>
      </Head>
      <Dashboard title="Settings" />
    </>
  )
}