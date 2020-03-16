import React from "react";

function Container({ children, className }) {
  return (
    <div className={`uk-container uk-container-xsmall ${className}`}>
      {children}
    </div>
  );
}

export default Container;
