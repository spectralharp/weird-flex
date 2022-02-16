import './Tabs.scss';
import { useState } from "react";
import Tab from './Tab';

export default function Tabs({ children, tabsRef }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="tabs" ref={tabsRef}>
      <ul className="tabs__list">
        {children.map((child, index) => {
          const { label } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={index}
              label={label}
              index={index}
              onClick={() => setActiveTab(index)}
            />
          );
        })}
      </ul>
      <section className="tabs__content">
        {children.map((child, index) => {
          if (index !== activeTab) return undefined;
          return child;
        })}
      </section>
    </section>
  );
}