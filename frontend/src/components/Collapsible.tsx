import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
  // a function that renders the header based on the collapse state
  headerBuilder: (collapsed: boolean) => React.ReactNode;
};

const Collapsible = ({ headerBuilder, children }: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div
      className="collapse collapse-arrow bg-base-100 rounded-box"
      tabIndex={1}
    >
      <input
        type="checkbox"
        className="peer"
        checked={true}
        onClick={() => setCollapsed(!collapsed)}
      />
      <div className="collapse-title bg-base-200 ">
        {headerBuilder(collapsed)}
      </div>
      <div className="collapse-content p-0">{children}</div>
    </div>
  );
};
const Collapsible2 = ({ headerBuilder, children }: Props) => {
  return (
    <div className="bg-base-100 rounded-box">
      <div className="collapse-title bg-base-200 rounded-t-xl">
        {headerBuilder(false)}
      </div>
      {children}
    </div>
  );
};

export default Collapsible2;
