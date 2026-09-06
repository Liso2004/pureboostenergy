import React, { useEffect, useState } from "react";

const FALLBACK_IMAGE = "/images/product-placeholder.svg";

const ProductImage = ({ src, alt, className = "", ...props }) => {
  const [imageSource, setImageSource] = useState(src || FALLBACK_IMAGE);

  useEffect(() => {
    setImageSource(src || FALLBACK_IMAGE);
  }, [src]);

  return (
    <img
      src={imageSource}
      alt={alt}
      className={className}
      onError={() => setImageSource(FALLBACK_IMAGE)}
      {...props}
    />
  );
};

export { FALLBACK_IMAGE };
export default ProductImage;
