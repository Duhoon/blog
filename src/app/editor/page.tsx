"use client"
import { Navigation } from "@/components/Navigation";
import { useState, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import styles from './page.module.scss';
import { MainButton } from "@/components/Button";
import { SecondaryButton } from "@/components/Button/Button";
import { saveTempPost } from "@/api/eidtor";

export default function Page(){
    const [content, setContent] = useState(`---
layout: 
category: 
published: 
title: 
---`);
    const [postId, setPostId] = useState('');

    return (
        <div>
            <MDEditor
                value={content}
                onChange={(value)=>{ setContent(value || '') }}
                height={'95vh'}
            />
            <div className={styles.editorBottom}>
                <SecondaryButton>Cancel</SecondaryButton>
                <MainButton clickHandler={()=>{saveTempPost(content)}}>Save Temporarily</MainButton>
                <MainButton>Save</MainButton>
            </div>
        </div>
    )   
}