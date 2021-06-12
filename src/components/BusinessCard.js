import React from "react";

export default function BusinessCard({ businesses }) {
  return (
    <div className="businessCard">
      <div className="businessCardContent">
        <h1 className="businessName">{businesses.name}</h1>
        <div className="rightSide">
          <h3>SIREN : {businesses.siren}</h3>
          <h3>{businesses.sector}</h3>
        </div>
      </div>
    </div>
  );
}
