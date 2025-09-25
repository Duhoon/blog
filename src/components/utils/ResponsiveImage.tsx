"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ResponsiveImageProps {
  thumbnail: string;
}

export default function ResponsiveImage({ thumbnail }: ResponsiveImageProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    console.log(size);
  }, [size]);

  return (
    <div className={"flex justify-center"}>
      <Image
        src={thumbnail}
        alt="thumbnail"
        width={size.width || 0}
        height={size.height || 0}
        onLoadingComplete={(img) => {
          setSize({
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        }}
        unoptimized={true}
      />
    </div>
  );
}
