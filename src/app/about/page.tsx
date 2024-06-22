import { Metadata } from "next"
import History from "@/components/History";
import { history } from "./history";

export const metadata: Metadata = {
  description: 'About me'
}

export default function About(){
  return (
    <main>
      <History history={history}></History>
    </main>
  )
}