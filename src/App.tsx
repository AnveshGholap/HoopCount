import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Trophy, Users, CalendarDays, ClipboardList } from 'lucide-react';
import { useThemeStore } from './store/themeStore';
import { useTournamentStore } from './store/tournamentStore';
import { ThemeToggle } from './components/ThemeToggle';
import { Dashboard } from './pages/Dashboard';
import { Teams } from './pages/Teams';
import { Schedule } from './pages/Schedule';
import { Standings } from './pages/Standings';

export default function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const initializeStore = useTournamentStore((state) => state.initializeStore);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200`}>
        <header className="bg-blue-600 dark:bg-blue-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">
              Basketball Tournament Manager
            </h1>
            <ThemeToggle />
          </div>
        </header>

        <nav className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              <Link to="/" className="flex items-center px-3 py-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <ClipboardList className="w-5 h-5 mr-2" />
                Dashboard
              </Link>
              <Link to="/teams" className="flex items-center px-3 py-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <Users className="w-5 h-5 mr-2" />
                Teams
              </Link>
              <Link to="/schedule" className="flex items-center px-3 py-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <CalendarDays className="w-5 h-5 mr-2" />
                Schedule
              </Link>
              <Link to="/standings" className="flex items-center px-3 py-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                <Trophy className="w-5 h-5 mr-2" />
                Standings
              </Link>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/standings" element={<Standings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}