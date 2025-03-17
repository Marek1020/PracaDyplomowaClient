import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const HomePage = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen  flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-[#023047] p-6 text-white shadow-md sticky top-0">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mx-auto">
            <h1 className="text-3xl font-bold">Your Company</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className="hover:underline">
                    Raport produktów
                  </Link>
                </li>
                <li>
                  <Link to="products" className="hover:underline">
                    Lista produktów
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      {/* Nested Routes */}
      <main className="container py-24 mx-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 p-4 text-white text-center">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
