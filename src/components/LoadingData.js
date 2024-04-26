import React from "react";

function LoadingData(props) {
  return (
    // set inline style to enable more control over background color for loading component
    <div className="loading-panel" style={{ backgroundColor: props.bgColor }}>
      Loading...
    </div>
  );
}

export default LoadingData;
