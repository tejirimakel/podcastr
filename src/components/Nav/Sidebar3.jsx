import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const sidebarNavItems = [
  {
    display: "All Messages",
    to: "all",
    section: "all",
  },
  {
    display: "Unread",
    to: "unread",
    section: "unread",
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const curPath = window.location.pathname.split("inbox/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);
  return (
    <>
      <aside className="sidebar sticky">
        <nav className="nav" style={{ top: "45%" }}>
          <ul>
            {sidebarNavItems.map((item, index) => (
              <Link to={item.to} key={index}>
                <div
                  className={`navitem ${activeIndex === index ? "active" : ""}`}
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
