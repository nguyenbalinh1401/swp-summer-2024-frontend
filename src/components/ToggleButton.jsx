import React from "react";
import { Button } from "antd";

export default function ToggleButton({ value, name, onChange })  {
  const handleClick = (newValue) => {
    onChange({ target: { name, value: newValue } });
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-center" }}>
      <span style={{ marginRight: "10px" }}> 
        
      </span>
      <Button
        type={value === "yes" ? "primary" : "default"}
        onClick={() => handleClick("yes")}
        style={{ margin: "0 5px", minWidth: "80px" }}  
      >
        Yes
      </Button>
      <Button
        type={value === "no" ? "primary" : "default"}
        onClick={() => handleClick("no")}
        style={{ margin: "0 5px", minWidth: "80px" }} 
      >
        No
      </Button>
    </div>
  );
};


