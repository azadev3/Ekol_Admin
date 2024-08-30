import React from "react";
import LegalForm from "./LegalForm";
import NaturalForm from "./NaturalForm";

type Tabs = {
  id: number;
  title: string;
  renderedComponent: React.JSX.Element;
};

const TabsNav: Tabs[] = [
  { id: 1, title: "Hüquqi şəxslər", renderedComponent: <LegalForm /> },
  { id: 2, title: "Fiziki şəxslər", renderedComponent: <NaturalForm /> },
];

const PurchaseContact: React.FC = () => {
  const [selected, setSelected] = React.useState<number>(1);

  const selectedTab = (id: number) => {
    setSelected(id);
  };

  return (
    <div className="purchase-contact">
      <h1>Satınalma əlaqə formundan gələn məlumatlar</h1>

      <div className="tabs-area">
        {TabsNav?.map((tabs: Tabs) => (
          <div
            onClick={() => selectedTab(tabs?.id)}
            key={tabs?.id}
            className={`tablink ${selected === tabs?.id ? "active" : ""}`}>
            {tabs?.title}
          </div>
        ))}
      </div>

      <div className="content-area">
        {TabsNav.map((tabs: Tabs) => {
          if (tabs?.id === selected) {
            return <React.Fragment key={tabs?.id}>{tabs?.renderedComponent}</React.Fragment>;
          }
        })}
      </div>
    </div>
  );
};

export default PurchaseContact;
