import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const sidebarNavItems = [
  {
    display: 'General',
    to: 'general',
    section: 'general',
  },
  {
    display: 'News',
    to: 'notification',
    section: 'notification',
  },
  {
    display: 'Bookings',

    to: 'booking',
    section: 'booking',
  },
  {
    display: 'Plan',
    to: 'plan',
    section: 'plan',
  },
  {
    display: 'Referrals',
    to: 'referrals',
    section: 'referrals',
  },
  {
    display: 'Blocking',
    to: 'blocking',
    section: 'blocking',
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const curPath = window.location.pathname.split('settings/')[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);
  return (
    <>
      <aside className="sidebar sticky">
        <nav className="nav">
          <ul>
            {sidebarNavItems.map((item, index) => (
              <Link to={item.to} key={index}>
                <div
                  className={`navitem ${activeIndex === index ? 'active' : ''}`}
                >
                  <li className="navitem">{item.display}</li>
                </div>
              </Link>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
