import React from "react";

function iframe(pp) {
  return {
    __html: pp,
  };
}

function Explicit({ pp }) {
  if (pp) {
    return (
      <div>
        {/* <div {pp.map((p) => (dangerouslySetInnerHTML={iframe(p)} ))}/> */}
        {pp.map((p) => (
          <div dangerouslySetInnerHTML={iframe(p)} />
        ))}
      </div>
      // <div>
      //   <h1>lol</h1>

      // </div>
    );
  }
}

export default Explicit;
