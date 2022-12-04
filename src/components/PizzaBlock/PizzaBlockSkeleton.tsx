import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaBlockSkeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2.5}
    width={280}
    height={468}
    viewBox="0 0 280 468"
    backgroundColor="#e0e0e0"
    foregroundColor="#cfcfcf">
    <circle cx="136" cy="118" r="116" />
    <rect x="0" y="310" rx="9" ry="9" width="280" height="90" />
    <rect x="3" y="424" rx="8" ry="8" width="100" height="30" />
    <rect x="148" y="412" rx="24" ry="24" width="130" height="50" />
    <rect x="0" y="268" rx="6" ry="6" width="280" height="27" />
  </ContentLoader>
);

export default PizzaBlockSkeleton;
