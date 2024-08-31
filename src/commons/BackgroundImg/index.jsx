import React from "react";
import { useState } from "react";
import ConvertImage from "react-convert-image";

const BackgroundImg = ({
  src,
  size,
  repeat,
  position,
  className,
  children,
}) => {
  const [converted, setConverted] = useState(undefined);

  //   const handleConvertedImage = (url) => {
  //     setConverted(url);
  //   };

  //   const convertImage = () => {
  //     return (
  //       <ConvertImage image={src} onConversion={(url) => setConverted(url)} />
  //     );
  //   };

  //   useEffect(() => {
  //     convertImage();
  //   }, []);

  return (
    <>
      {!converted && (
        <div
          style={{
            display: "none",
            height: "0",
            width: "0",
            overflow: "hidden",
          }}
        >
          <ConvertImage
            format={"webp"}
            image={src}
            onConversion={(url) => setConverted(url)}
          />
        </div>
      )}
      {converted && (
        <div
          className={className}
          style={{
            background: `url(${converted})`,
            backgroundSize: size && size,
            backgroundRepeat: repeat && repeat,
            backgroundPosition: position && position,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default BackgroundImg;
