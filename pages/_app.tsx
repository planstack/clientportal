import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'  // Add this import
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Client Portal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="app-container">
        <Navbar />
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}