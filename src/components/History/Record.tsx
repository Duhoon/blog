import { RecordData } from "@/types/about.type";
import Image from "next/image";
import dayjs from "dayjs";
import './history.scss';

interface RecordProps {
  record: RecordData;
  isCur?: boolean;
} 

export default function Record({record, isCur}: RecordProps){

  return (
    <article className='record-wrapper'>
      <div className='record-start'></div>
      <div className='record-img-wrapper'>
        <Image src={record.image} alt='image' fill={true} loading={"lazy"} placeholder="blur" blurDataURL="https://www.paintscapes.ca/products/t9-payne-s-gray"/>
      </div>
      <div className='record-body'>
        <h1 className='record-title'>{record.title}</h1>
        <small className='record-date'>{dayjs(record.date).format('MMMM DD, YYYY')}</small>
        <p className='record-content'>{record.content}</p>
      </div>
      <div className='record-end'></div>
    </article>
  )
}