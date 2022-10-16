import React, { useRef, useState } from "react";
import { Collapse } from "react-collapse";

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
  const [collapsed, setCollapsed] = useState(true);

  const contentRef: any = useRef();

  console.log("collapsed: ", collapsed);
  return (
    <div className=" rounded-box">
      <div
        className="bg-base-200 cursor-pointer"
        onClick={() => setCollapsed(!collapsed)}
      >
        {headerBuilder(false)}
      </div>
      <div
        className=" transition-all"
        ref={contentRef}
        style={
          !collapsed
            ? { height: contentRef.current.scrollHeight + "px" }
            : { height: "0px" }
        }
      >
        {children}
      </div>
    </div>
  );
};
const Collapsible3 = ({ headerBuilder, children }: Props) => {
  const [collapsed, setCollapsed] = useState(true);
  console.log(collapsed);
  return (
    <div className="">
      <div
        className="bg-base-200 collapse-title cursor-pointer flex rounded-t-xl w-full"
        onClick={() => setCollapsed(!collapsed)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={
            "feather feather-chevron-right mr-4 transition-all " +
            (collapsed ? "rotate-90" : "")
          }
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        {headerBuilder(!collapsed)}
      </div>
      <Collapse isOpened={collapsed} className="transition-all">
        {children}
      </Collapse>
    </div>
  );
};

export default Collapsible3;
