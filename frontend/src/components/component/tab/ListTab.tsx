import ReserList from "../list/reserList";

type Reser = {
  id: number;
  username: string;
  roomName: string;
  reserDate: Date;
  startDate: number;
  endDate: number;
};

type TabItem = {
  key: string;
  label: string;
  url: string;
  reserList: Reser[];
  setReserList: React.Dispatch<React.SetStateAction<Reser[]>>;
  isEdit?: boolean;
};

type activeKeyProps = {
  key : string;
  setKey : React.Dispatch<React.SetStateAction<string>>
}

type TabProps = {
  tabs: TabItem[];
  activeKey : activeKeyProps
};

function ReserListTab({ tabs, activeKey }: TabProps) {
  const activeTab = tabs.find((tab) => tab.key === activeKey.key);

  return (
    <>
      <div className="flex space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => activeKey.setKey(tab.key)}
            className={`w-[100px] h-[50px] rounded-sm ${
              activeKey.key === tab.key ? "bg-sky-300 text-white" : "bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab && (
          <ReserList
            url={activeTab.url}
            reserList={activeTab.reserList}
            setReserList={activeTab.setReserList}
            tabs = {tabs}
            key = {activeTab.key}
            setKey = {activeKey.setKey}

            isEdit={activeTab.isEdit}
          />
        )}
      </div>
    </>
  );
}

export default ReserListTab;
