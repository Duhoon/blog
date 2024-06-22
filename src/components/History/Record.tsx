import {useState } from 'react';
import { RecordData } from "@/types/about.type";
import Image from "next/image";
import dayjs from "dayjs";
import './history.scss';

interface RecordProps {
  record: RecordData
} 

const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 300;

export default function Record({record}: RecordProps){
  return (
    <article className='record-wrapper'>
      {/* <Image src={record.image} alt='image' width={IMAGE_WIDTH} height={IMAGE_HEIGHT}></Image> */}
      <img className='record-img' src={record.image} width={IMAGE_WIDTH} height={IMAGE_HEIGHT}/>
      <div className='record-body'>
        <h1 className='record-title'>{record.title}</h1>
        <small className='record-date'>{dayjs(record.date).format('MMMM DD, YYYY')}</small>
        <p className='record-content'>{record.content}</p>
      </div>
    </article>
  )
}