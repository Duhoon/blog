'use client'
import { RecordData } from "@/types/about.type";
import { useState, useEffect, useRef, EventHandler } from "react";
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

  const throttle = (callback: Function, delay: number) => {
    let timer:any;

    return (event: any) => {
      if(timer) return;
      timer = setTimeout(()=>{
        callback(event);
        timer= null;
      }, delay );
    };
  };

  const historyScrollHandler = (event: UIEvent)=>{
    const currentScroll = recordsRef.current.scrollTop;
    const historyHeight = recordsRef.current.clientHeight;
    const targetIndex = Math.floor( currentScroll / historyHeight );
    
    let scrollTo: number = 0;
    let current: number = 0;

    if (lastScroll === currentScroll || 
        currentScroll === 0 || 
        currentScroll % historyHeight === 0
    ) {
      setCur(targetIndex);
      return;
    };

    if( targetIndex < cur ){ // up
      current = Math.max(0, Math.min(history.length - 1, cur-1));
      scrollTo = Math.min(((history.length - 1) * historyHeight), historyHeight * (current));
    }
    
    if( targetIndex >= cur ) { // lastScroll < currentScroll down
      current = Math.min(history.length - 1, Math.max(0, cur+1))
      scrollTo = Math.max(0, historyHeight * (current))
    }

    recordsRef.current.scrollTo({
      top: scrollTo,
      behavior: 'smooth'
    })
    
    setLastScroll(scrollTo);
    setCur(current);
  }

  useEffect(()=>{
    if(!window || !recordsRef || !recordsRef.current){
    } else {
      setDeviceHeight(window.innerHeight);
      setLastScroll(recordsRef.current.scrollTop);

      window.addEventListener('resize', ()=>{
        setDeviceHeight(window.innerHeight);
      })
    }
  }, [])

  return (
    <div className='history' style={{height: deviceHeight - 60}}>
        <div className='record' ref={recordsRef} onScroll={throttle(historyScrollHandler, 1000)}>
          {deviceHeight ? (history.map((record, index) => <Record record={record} key={index}/>)): null}
        </div>
        { deviceHeight ? <Timeline history={history} cursor={cur}/> : null }
    </div>
  )
}