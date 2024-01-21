"use client"
import { Navigation } from "@/components/Navigation";
import { useState, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import styles from './page.module.scss';
import { MainButton } from "@/components/Button";
import { SecondaryButton } from "@/components/Button/Button";

export default function Page(){
    const [content, setContent] = useState(`---
layout: 
category: 
published: 
title: 
---`);

    useEffect(()=>{
        console.log(content);
    }, [content])

    return (
        <div>
            <MDEditor
                value={content}
                onChange={(value)=>{ setContent(value || '') }}
                height={'95vh'}
            />
            <div className={styles.editorBottom}>
                <SecondaryButton>Cancel</SecondaryButton>
                <MainButton>Save Temporarily</MainButton>
                <MainButton>Save</MainButton>
            </div>
        </div>
    )   
}