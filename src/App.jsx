import { useState, useEffect } from "react";
import "./App.css";
import { log } from "./Middleware/logger";
function App() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Placement Drive",
      message: "Amazon hiring for SDE Intern.",
      type: "Placement",
      time: "10 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "Workshop",
      message: "AI Workshop starts at 2 PM.",
      type: "Event",
      time: "30 mins ago",
      read: false,
    },
    {
      id: 3,
      title: "Results Published",
      message: "Semester Results are available.",
      type: "Result",
      time: "Yesterday",
      read: true,
    },
  ]);
  const [filter, setFilter] = useState("All");
  useEffect(() => {
    log("info", "page", "Dashboard Loaded");
  }, []);
  const markRead = (id) => {
    log("info", "component", `Notification ${id} marked as read`);
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };
  const filtered =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.type === filter);
  return (
    <div className="container">
      <aside className="sidebar">
        <h2>NotifyHub</h2>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Placement")}>
          Placement
        </button>
        <button onClick={() => setFilter("Event")}>
          Events
        </button>
        <button onClick={() => setFilter("Result")}>
          Results
        </button>
      </aside>
      <main className="content">
        <div className="topbar">
          <h1>Notification Dashboard</h1>
          <span>{filtered.length} Notifications</span>
        </div>
        <div className="cards">
          {filtered.map((item) => (
            <div
              className={`card ${item.read ? "read" : "unread"}`}
              key={item.id}
            >
              <div className="header">
                <h3>{item.title}</h3>
                <span>{item.type}</span>
              </div>
              <p>{item.message}</p>
              <small>{item.time}</small>
              {!item.read && (
                <button
                  className="readBtn"
                  onClick={() => markRead(item.id)}
                >
                  Mark Read
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
export default App;