'use client'

import { useEffect, useRef, useCallback, Suspense } from 'react';
import './reply.scss';

export default function Reply(){
    const commentRef = useRef<HTMLDivElement>(null);
    const createUtterances = useCallback(() => {
        if (commentRef.current === null) return;

        const isUtterances = commentRef.current.firstChild;
        if (isUtterances) {
            return;
        }

        const utterances = document.createElement('script');

        const utterancesConfig = {
            src: 'https://utteranc.es/client.js',
            repo: 'Duhoon/blog',
            'issue-term': 'pathname',
            theme: 'github-light',
            async: 'true',
            crossorigin: 'annoymous',
        }

        Object.entries(utterancesConfig).forEach(
            ([key, value]) => 
                utterances.setAttribute(key, value)
        , []);

        commentRef.current?.appendChild(utterances);
    }, []);

    useEffect(() => {
        createUtterances();
    }, [])

    return (
        // <Suspense fallback={'...loading'}>
            <div ref={commentRef} style={{width: '100%'}}/>
        // </Suspense>
    )
}