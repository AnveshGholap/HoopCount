import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import { Team } from '../types';

export function PlayerRegistration() {
  const teams = useTournamentStore((state) => state.teams);
  const addPlayer = useTournamentStore((state) => state.addPlayer);
  
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    position: '',
    teamId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.number || !formData.teamId) return;

    addPlayer(formData.teamId, {
      id: crypto.randomUUID(),
      name: formData.name,
      number: parseInt(formData.number),
      position: formData.position,
      teamId: formData.teamId,
      stats: {
        points: 0,
        assists: 0,
        rebounds: 0,
        steals: 0,
        blocks: 0,
        gamesPlayed: 0,
      },
    });

    setFormData({
      name: '',
      number: '',
      position: '',
      teamId: '',
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <UserPlus className="w-6 h-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Player Registration</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="team" className="block text-sm font-medium text-gray-700">
            Select Team
          </label>
          <select
            id="team"
            value={formData.teamId}
            onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">Select a team</option>
            {teams.map((team: Team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="playerName" className="block text-sm font-medium text-gray-700">
            Player Name
          </label>
          <input
            type="text"
            id="playerName"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">
            Jersey Number
          </label>
          <input
            type="number"
            id="number"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <select
            id="position"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">Select position</option>
            <option value="PG">Point Guard</option>
            <option value="SG">Shooting Guard</option>
            <option value="SF">Small Forward</option>
            <option value="PF">Power Forward</option>
            <option value="C">Center</option>
          </select>
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Player
        </button>
      </form>
    </div>
  );
}