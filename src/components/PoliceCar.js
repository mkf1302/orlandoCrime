import React from "react";
import "./style.css";

// This Col component offers us the convenience of being able to set a column's "size" prop instead of its className
// We can also omit the col- at the start of each Bootstrap column class, e.g. size="md-12" instead of className="col-md-12"

function PoliceCar(props) {
    return (
      <div className="PoliceCar text-center" style={{ backgroundImage: `url(${props.backgroundImage})` }}>
        {props.children}
      </div>
    );
  }
  
  export default PoliceCar;
