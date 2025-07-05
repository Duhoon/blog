import { ReactNode } from "react";
import "./globals.css";

export default function RootLayout(children: ReactNode) {
  return <body>{children}</body>
}