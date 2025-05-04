"use client";
import React from "react";
import Image from "next/image";

const BASE_URL = "/images/";

const Img = ({
  className,
  src = "defaultNoData.png",
  alt = "testImg",
  isStatic = false,
  width,
  height,
  ...restProps
}) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  React.useEffect(() => {
    setImgSrc(src);
  }, [src]);

  // Format the image source to ensure it's a valid URL
  const formatImageSrc = (path) => {
    if (!path) return `${BASE_URL}defaultNoData.png`;
    
    // If it's already a full URL or starts with a slash, return as is
    if (path.startsWith('http') || path.startsWith('/')) {
      return path;
    }
    
    // Otherwise, add the BASE_URL prefix
    return `${BASE_URL}${path}`;
  };

  return (
    <Image
      className={className}
      src={formatImageSrc(imgSrc)}
      alt={alt}
      width={width}
      height={height}
      {...restProps}
      onError={() => {
        setImgSrc(`${BASE_URL}defaultNoData.png`);
      }}
    />
  );
};
export { Img };
