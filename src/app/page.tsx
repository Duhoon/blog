import Image from 'next/image'
import styles from './page.module.scss'
import Scene from '@/components/Three';
import { Navigation } from '@/components/Navigation'

export default function Home() {
  return (
    <>
      <Navigation/>
      <main className={styles.mainWrapper}>
        <Scene/>
      </main>
    </>
  )
}
