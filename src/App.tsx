import { Header } from './components/Header/Header';
import { List } from './components/List/List';

import './global.css';
import styles from './App.module.css'

export function App() {
  return (
    <>
      <Header />
      <div className={styles.wapper}>
        <main>
          <List />
        </main>
      </div>
    </>
  )
}


