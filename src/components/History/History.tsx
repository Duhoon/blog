'use client'
import { RecordData } from "@/types/about.type";
import { useState, useEffect, useRef } from "react";
import './history.scss';

import Record from "./Record";
import Timeline from "./Timeline";

export interface HistoryProps {
  history: RecordData[];
}

/** History Component in About */
export default function History({history, }: HistoryProps){
  const recordsRef = useRef(null) as any;
  const [ deviceHeight, setDeviceHeight ] = useState<number>(0);
  const [ cur, setCur ] = useState(0);
  const [ lastScroll, setLastScroll ] = useState(0);

  useEffect(()=>{
    if(!window || !recordsRef || !recordsRef.current){
    } else {
      setDeviceHeight(window.innerHeight);
      setLastScroll(recordsRef.current.scrollTop);
      
      recordsRef.current.addEventListener('scroll',()=>{
        const currentScroll = recordsRef.current.scrollTop;
        console.log(`lastScroll ${lastScroll}`);
        console.log(`currentScroll ${currentScroll}`);
        
        if(lastScroll > currentScroll){ // up
          recordsRef.current.scrollTo({
            top: recordsRef.current.clientHeight * cur-1,
            // behavior: 'auto'
          });
          setCur(Math.max(0, cur-1));
          setLastScroll(currentScroll)
        } else {
          recordsRef.current.scrollTo({
            top: recordsRef.current.clientHeight * cur+1,
            // behavior: 'auto'
          });
          setCur(Math.min(history.length, cur+1));
          setLastScroll(currentScroll)
        }
      })
    }
  }, [])

  // useEffect(()=>{
  //   console.log(scroll);
  // }, [scroll])

  return (
    <div className='history' style={{height: deviceHeight - 60}}>
        <div className='record' ref={recordsRef}>
          {deviceHeight ? (history.map((record, index) => <Record record={record} key={index}/>)): null}
        </div>
        { deviceHeight ? <Timeline numOfCircle={4}/> : null }
    </div>
  )
}