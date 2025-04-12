import React from 'react';

function FeatureCard({ icon, title, description }) {
  const renderIcon = () => {
    if (icon === "HIPAA") {
      return (
        <div className="icon hipaa-icon">
          HIPAA
        </div>
      );
    } else if (icon === "Upload") {
      return (
        <div className="icon upload-icon">
          <svg viewBox="0 0 24 24" fill="#4169e1" width="24" height="24">
            <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
          </svg>
        </div>
      );
    } else if (icon === "Audit") {
      return (
        <div className="icon audit-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </div>
      );
    }
  };

  return (
    <div className="feature-card">
      {renderIcon()}
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

export default FeatureCard;
