import React, { useState } from 'react';
import { PlusCircle, UsersRound } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';

export function TeamRegistration() {
  const [teamName, setTeamName] = useState('');
  const addTeam = useTournamentStore((state) => state.addTeam);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    addTeam({
      id: crypto.randomUUID(),
      name: teamName,
      players: [],
      stats: {
        wins: 0,
        losses: 0,
        draws: 0,
        pointsScored: 0,
        pointsConceded: 0,
        tournamentPoints: 0,
        gamesPlayed: 0,
      },
    });
    setTeamName('');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <UsersRound className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Team Registration</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter team name"
          />
        </div>
        
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Team
        </button>
      </form>
    </div>
  );
}