"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Button.module.scss";

type PaginationButtonProps = {
  nextToken?: string;
};

export default function PaginationButton({ nextToken }: PaginationButtonProps) {
  const pathname = usePathname();
  return (
    <div className={styles.pagination}>
      <Link href={`${pathname}?currentToken=${nextToken}`}>Next</Link>
    </div>
  );
}
