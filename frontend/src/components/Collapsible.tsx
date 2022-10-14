import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
  // a function that renders the header based on the collapse state
  headerBuilder: (collapsed: boolean) => React.ReactNode;
};

const Collapsible = ({ headerBuilder, children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="collapse collapse-arrow bg-base-100 rounded-box">
      <input
        type="checkbox"
        className="peer"
        checked={!collapsed}
        onClick={() => setCollapsed(!collapsed)}
      />
      <div className="collapse-title bg-base-200 ">
        {headerBuilder(collapsed)}
      </div>
      <div className="collapse-content p-0">{children}</div>
    </div>
  );
};

export default Collapsible;
