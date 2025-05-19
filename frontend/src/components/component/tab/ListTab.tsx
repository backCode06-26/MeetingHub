import React, { useState } from "react";

type TabItem = {
  key: string;
  label: string;
  component: React.ReactNode;
};

type TabProps = {
  tabs: TabItem[];
};

function ReserListTab({ tabs }: TabProps) {
  const [activeKey, setActiveKey] = useState(tabs[0].key);

  const activeTab = tabs.find((tab) => tab.key === activeKey);

  return (
    <>
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveKey(tab.key)}
            className={`w-[100px] h-[50px] rounded-sm ${
              activeKey === tab.key ? "bg-sky-300 text-white" : "bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{activeTab?.component}</div>
    </>
  );
}

export default ReserListTab;
