import { useRef, useEffect, useState, ReactElement } from 'react';
import './history.scss';
import { RecordData } from '@/types/about.type';
import dayjs from 'dayjs';

interface TimelineProps {
  history: RecordData[];
  cursor: number;
}

export default function Timeline({history, cursor}: TimelineProps){
  const timelineRef = useRef(null) as any;
  const [ height, setHeight ] = useState(0);
  
  useEffect(()=>{
    if (!window || !timelineRef || !timelineRef.current){
      return
    } else {
      setHeight(timelineRef.current.offsetHeight);
    }
  }, [])

  return (
    <div className='timeline-wrapper'>
      <div className="timeline" ref={timelineRef}>
        { typeof height === 'number' && height !== 0 ? 
          Array.from(
            {length: history.length}, 
            (v, i)=> {
              /** -4 top detail contorll */
              return i === cursor
              ? (<CircleActivated key={i} top={timelineRef.current.clientHeight / (history.length - 1) * i - 4}><Badge date={history[i].date}/></CircleActivated>) 
              : (<Circle key={i} top={timelineRef.current.clientHeight / (history.length - 1) * i - 4}/>)
            }) : null
        }
      </div>
    </div>
  )
}

interface CircleProps{
  top: number,
}

interface CircleActivatedProps extends CircleProps{
  children: ReactElement,
}

function Circle ({top}: CircleProps) {
  return (
    <div className="circle" style={{top}}/>
  )
}

function CircleActivated({children, top}: CircleActivatedProps){
  return (
    <div className='circle circle-activate' style={{top}}>
      {children}
    </div>
  )
}

interface BadgeProps {
  date: Date;
}

function Badge({date}: BadgeProps) {
  return (
    <div className='badge'>
      <span>{dayjs(date).format('MMM, D')}</span>
    </div>
  )
}