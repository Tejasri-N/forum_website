import React, { useState, useEffect } from "react";
import ManagePosts from "../components/ManagePosts";

function Home({ toggleSidebar, isSidebarOpen }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-custom-body-bg min-h-screen flex flex-col dark:bg-black">
      <div className="flex flex-1">
        {isSidebarOpen && (
          <aside className="w-64 h-100 bg-custom-nav-bg-2 p-4 m-2 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-white">Sidebar</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="text-white">
                  Link 1
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white">
                  Link 2
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-white">
                  Link 3
                </a>
              </li>
            </ul>
          </aside>
        )}
        <main className={`flex-1 p-4 ${isSidebarOpen ? "ml-2" : ""}`}>
          <div className="flex flex-col justify-center items-center">
            <ManagePosts user={user} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
