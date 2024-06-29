import React from "react";
import { Button } from "antd";

export default function ToggleButton({ value, name, onChange })  {
  const handleClick = (newValue) => {
    onChange({ target: { name, value: newValue } });
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
      
      <Button
        type={value === "yes" ? "primary" : "default"}
        onClick={() => handleClick("yes")}
        style={{ minWidth: "200px" }}  
      >
        Yes
      </Button>
      <Button
        type={value === "no" ? "primary" : "default"}
        onClick={() => handleClick("no")}
        style={{minWidth: "200px" }} 
      >
        No
      </Button>
    </div>
  );
};


