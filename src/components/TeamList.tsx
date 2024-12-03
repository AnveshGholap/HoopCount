import React from 'react';
import { Users } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import { Team, Player } from '../types';

export function TeamList() {
  const teams = useTournamentStore((state) => state.teams);

  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Teams</h2>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {teams.map((team: Team) => (
          <div key={team.id} className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{team.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.players.map((player: Player) => (
                <div key={player.id} className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold text-gray-900">#{player.number} {player.name}</p>
                  <p className="text-sm text-gray-600">{player.position}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}