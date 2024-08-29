import Head from 'next/head'
import ReportsList from '../../components/ReportsList'
import { useRouter } from 'next/router'

export default function ReportsPage() {
  const router = useRouter()
  const { planName } = router.query

  return (
    <>
      <Head>
        <title>{planName ? `Reports - ${planName}` : 'Reports'} | Client Portal</title>
      </Head>
      <ReportsList />
    </>
  )
}