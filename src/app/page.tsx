import Image from 'next/image'
import styles from './page.module.scss'
import { Main } from '@/components/Main/Main'

export default function Home() {
  return (
    <main className={styles.mainWrapper}>
      <Main/>
    </main>
  )
}
