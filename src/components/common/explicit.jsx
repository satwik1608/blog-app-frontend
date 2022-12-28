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
        {pp.map((p) => (
          <div dangerouslySetInnerHTML={iframe(p)} />
        ))}
      </div>
    );
  }
}

export default Explicit;
