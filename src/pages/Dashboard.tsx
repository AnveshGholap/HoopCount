import React from 'react';
import { useTournamentStore } from '../store/tournamentStore';
import { Users, CalendarDays, Trophy } from 'lucide-react';
import { PlayerStats } from '../components/PlayerStats';

export function Dashboard() {
  const teams = useTournamentStore((state) => state.teams);
  const matches = useTournamentStore((state) => state.matches);

  const stats = {
    totalTeams: teams.length,
    totalPlayers: teams.reduce((acc, team) => acc + team.players.length, 0),
    totalMatches: matches.length,
    completedMatches: matches.filter(match => match.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Users className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Teams</h2>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalTeams}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stats.totalPlayers} Players</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <CalendarDays className="w-10 h-10 text-green-600 dark:text-green-400" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Matches</h2>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalMatches}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stats.completedMatches} Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <Trophy className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Tournament</h2>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.completedMatches === stats.totalMatches ? 'Completed' : 'In Progress'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <PlayerStats />
    </div>
  );
}