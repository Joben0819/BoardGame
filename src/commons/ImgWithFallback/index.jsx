import React from "react";
import { useCallback } from "react";
import { useState, useRef, useEffect } from "react";

const IMG = ({
  onLoadCall,
  onErrorCall,
  fallback,
  loadingIcon,
  keyIcon,
  src,
  loading,
  largeWidth,
  handleIconWidthChange,
}) => {
  const [imgSrc, setImgSrc] = useState(loadingIcon);
  const [iconWidth, setIconWidth] = useState(0);

  const iconRef = useRef();
  const onError = () => {
    onErrorCall && onErrorCall();
    setImgSrc(fallback);
  };
  const onLoad = () => {
    onLoadCall && onLoadCall();
    setImgSrc(src);
  };

  useEffect(() => {
    handleResize();
  }, [iconRef?.current?.offsetWidth, window.orientation]);

  const handleResize = useCallback(() => {
    setIconContainerSize();
  }, []);

  const setIconContainerSize = () => {
    handleIconWidthChange &&
      handleIconWidthChange(iconRef?.current?.offsetWidth);
    setIconWidth(iconRef?.current?.offsetWidth);
  };

  useEffect(() => {
    let debounceId;

    function handleDebouncedResize() {
      if (debounceId) {
        clearTimeout(debounceId);
      }
      debounceId = setTimeout(() => {
        handleResize();
      }, 1000);
    }

    window.addEventListener("resize", handleDebouncedResize);
    window.addEventListener("pageshow", handleDebouncedResize);
    window.addEventListener("orientationchange", handleDebouncedResize);

    return () => {
      window.removeEventListener("resize", handleDebouncedResize);
      window.removeEventListener("pageshow", handleDebouncedResize);
      window.removeEventListener("orientationchange", handleDebouncedResize);
    };
  }, [handleResize]);

  return (
    <img
      key={keyIcon && keyIcon}
      src={imgSrc || fallback}
      onLoad={onLoad}
      onError={onError}
      loading={loading}
      ref={iconRef}
      draggable="false"
      style={iconWidth ? { width: iconWidth } : {}}
      alt="Key Icon"
    />
  );
};

export default IMG;
