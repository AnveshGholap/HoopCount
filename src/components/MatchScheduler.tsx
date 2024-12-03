import React from 'react';
import { Calendar } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import { Team } from '../types';

export function MatchScheduler() {
  const teams = useTournamentStore((state) => state.teams);
  const config = useTournamentStore((state) => state.config);
  const scheduleMatch = useTournamentStore((state) => state.scheduleMatch);

  const generateSchedule = () => {
    if (teams.length < 2) return;

    const matches = [];
    // Generate matches for the specified number of encounters
    for (let encounter = 0; encounter < config.encounters; encounter++) {
      // Round-robin tournament scheduling
      for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
          const match = {
            id: crypto.randomUUID(),
            team1Id: encounter % 2 === 0 ? teams[i].id : teams[j].id,
            team2Id: encounter % 2 === 0 ? teams[j].id : teams[i].id,
            team1Score: 0,
            team2Score: 0,
            date: new Date(Date.now() + matches.length * 24 * 60 * 60 * 1000).toISOString(),
            status: 'scheduled' as const,
            stats: {
              team1PlayerStats: {},
              team2PlayerStats: {},
            },
          };
          matches.push(match);
        }
      }
    }

    matches.forEach((match) => scheduleMatch(match));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-6 h-6 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">Match Scheduler</h2>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-700">Registered Teams</h3>
        <ul className="mt-2 space-y-2">
          {teams.map((team: Team) => (
            <li key={team.id} className="text-gray-600">
              {team.name} ({team.players.length} players)
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={generateSchedule}
        disabled={teams.length < 2}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Generate Schedule
      </button>
    </div>
  );
}