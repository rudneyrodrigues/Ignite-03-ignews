import Link from "next/link";
import { useRouter } from "next/router";

import styles from './styles.module.scss';

interface LinkProps {
  href: string;
  title: React.ReactNode;
}

export function ActiveLink({ href, title }: LinkProps) {
  const router = useRouter();
  const asPath = router.asPath;

  return (
    <Link href={href}>
      <a className={asPath === href ? styles.active : ''}>{title}</a>
    </Link>
  );
}