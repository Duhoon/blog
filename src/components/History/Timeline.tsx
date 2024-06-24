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
      setHeight(timelineRef.current.offsetHeight);
    }
  }, [])

  return (
    <div className="timeline" ref={timelineRef}>
      { typeof height === 'number' && height !== 0 ? 
        Array.from(
          {length: numOfCircle}, 
          (v, i)=> {
            return (<Circle key={i} top={height / (numOfCircle - 1) * i - 4}/>)
          }) : null
      }
    </div>
  )
}

interface CircleProps{
  top: number,
}

function Circle ({top}: CircleProps) {
  return (
    <div className="circle" style={{top}}/>
  )
}

function CircleActivated({}: CircleProps){
  return (
    <div className='circle circle-activate'>
      <Badge/>
    </div>
  )
}

function Badge() {
  return (
    <div className='badge'>
      <span>July 22</span>
    </div>
  )
}