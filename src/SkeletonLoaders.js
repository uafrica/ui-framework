import React from "react";
import ContentLoader from "react-content-loader";

const ShipmentLoader = props => (
  <div className="p-20">
    <ContentLoader
      speed={4}
      width="100%"
      height="90vh"
      backgroundColor="#f0f0f0"
      foregroundColor="#fbfbfb"
      interval={0}
      {...props}
    >
      <rect x="1%" y="0" rx="5" ry="5" width="98%" height="10%" />
      <rect x="1%" y="12%" rx="5" ry="5" width="98%" height="20%" />
      <rect x="1%" y="34%" rx="5" ry="5" width="48%" height="70%" />
      <rect x="51%" y="34%" rx="5" ry="5" width="48%" height="70%" />
    </ContentLoader>
  </div>
);

const SkeletonLoader = {
  ShipmentLoader
};

export default SkeletonLoader;
