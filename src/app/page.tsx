import Image from 'next/image'
import styles from './page.module.scss'
import { Main } from '@/components/Main/Main'
import { Navigation } from '@/components/Navigation'

export default function Home() {
  return (
    <>
      <Navigation/>
      <main className={styles.mainWrapper}>
        <Main/>
      </main>
    </>
  )
}
