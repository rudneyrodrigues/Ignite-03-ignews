import Link from 'next/link';
import { useRouter } from 'next/router';
import { ActiveLink } from '../activeLink';
import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';

export function Header() {
  const { asPath } = useRouter();

  

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />

        <nav>
          {/* <Link href="/">
            <a className={asPath === '/' ? styles.active : ''}>Home</a>
          </Link>
          <Link href="/posts" prefetch>
            <a className={asPath === '/posts' ? styles.active : ''}>Post</a>
          </Link> */}

          <ActiveLink href='/' title='Home' />
          <ActiveLink href='/posts' title='Posts' />
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}