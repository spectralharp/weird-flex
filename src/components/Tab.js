export default function Tab({ activeTab, index, label, onClick }) {

  let className = 'tabs__list-item';
  if (activeTab === index) {
    className += ' active';
  }

  return (
    <li
      className={className}
      onClick={onClick}
    >
      {label}
    </li>
  );
}