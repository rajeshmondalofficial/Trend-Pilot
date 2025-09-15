import { useState } from "react";
import { Bot, LayoutDashboard } from "lucide-react";
import { Link } from "react-router";

const ICON_SIZE = 26;

const Sidebar = () => {
  const [menu] = useState([
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={ICON_SIZE} />,
      path: "/",
    },
    {
      title: "Generate Content",
      icon: <Bot size={ICON_SIZE} />,
      path: "/generate-niche",
    },
  ]);

  return (
    <div className="p-4">
      {menu.map((m) => (
        <Link to={m.path}>
          <div className="py-2">{m.icon}</div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
