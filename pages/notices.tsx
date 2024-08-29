import Head from 'next/head'
import Dashboard from '../components/Dashboard'

export default function Notices() {
  return (
    <>
      <Head>
        <title>Notices | Client Portal</title>
      </Head>
      <Dashboard title="Notices" />
    </>
  )
}