import { useRef, useEffect, useState } from 'react';
import './history.scss';
import { RecordData } from '@/types/about.type';

interface TimelineProps {
  history?: RecordData[];
  numOfCircle: number;
}

export default function Timeline({numOfCircle}: TimelineProps){
  const timelineRef = useRef(null) as any;
  const [ height, setHeight] = useState(0)
  
  useEffect(()=>{
    if (!window || !timelineRef){
      return
    } else {
      setHeight(timelineRef.current.clientHeight);
    }
  }, [])

  return (
    <div className="timeline" ref={timelineRef}>
      { typeof height === 'number' && height !== 0 ? 
        Array.from(
          {length: numOfCircle}, 
          (v, i)=> (<Circle key={i} top={height / numOfCircle * i}/>)) : null
      }
    </div>
  )
}

interface CircleProps{
  top: number,
}

function Circle ({top}: CircleProps) {
  return (
    <div className="circle" style={{top}}>

    </div>
  )
}

function CircleActivated({}: CircleProps){
  return (
    <div className='circle circle-activate'/>
  )
}

function Badge() {
  return (
    <div className='badge'>
      <span>2024</span>
    </div>
  )
}