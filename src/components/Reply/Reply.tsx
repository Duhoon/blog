"use client";

import { useEffect, useRef, useCallback } from "react";
import "./reply.scss";

interface ReplyProps {
  slug: string;
}

export default function Reply({ slug }: ReplyProps) {
  const commentRef = useRef<HTMLDivElement>(null);
  const createUtterances = useCallback(() => {
    if (commentRef.current === null) return;

    const isUtterances = commentRef.current.firstChild;
    if (isUtterances) {
      return;
    }

    const utterances = document.createElement("script");

    const utterancesConfig = {
      src: "https://utteranc.es/client.js",
      repo: "Duhoon/blog",
      "issue-term": slug,
      theme: "github-light",
      async: "true",
      crossorigin: "annoymous",
    };

    Object.entries(utterancesConfig).forEach(
      ([key, value]) => utterances.setAttribute(key, value),
      [],
    );

    commentRef.current?.appendChild(utterances);
  }, []);

  useEffect(() => {
    createUtterances();
  }, []);

  return (
    // <Suspense fallback={'...loading'}>
    <div ref={commentRef} style={{ width: "100%" }} />
    // </Suspense>
  );
}
