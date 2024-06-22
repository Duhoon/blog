'use client'
import { RecordData } from "@/types/about.type";
import { useState, useEffect } from "react";
import './history.scss';

import Record from "./Record";
import Timeline from "./Timeline";

export interface HistoryProps {
  history: RecordData[];
}

/** History Component in About */
export default function History({history, }: HistoryProps){
  const [ deviceHeight, setDeviceHeight ] = useState<number>(0);
  const [cursor, setCursor] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(()=>{
    if(!window){
      return
    } else {
      setDeviceHeight(window.innerHeight);
    }
  }, [])

  if(deviceHeight){
    return (
      <div className='history' style={{height: deviceHeight - 60}}>
        {history.map((record, index) => <Record record={record} key={index}/>)}
        { deviceHeight ? <Timeline numOfCircle={4}/> : null }
      </div>
    )
  }else {
    return (
      <div></div>
    )
  }
}