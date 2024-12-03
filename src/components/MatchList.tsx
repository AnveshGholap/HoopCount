import React from 'react';
import { CalendarDays } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import { Match, Team } from '../types';
import { MatchResult } from './MatchResult';

export function MatchList() {
  const matches = useTournamentStore((state) => state.matches);
  const teams = useTournamentStore((state) => state.teams);

  const getTeamName = (teamId: string) => {
    return teams.find((team: Team) => team.id === teamId)?.name || 'Unknown Team';
  };

  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Match Schedule</h2>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {matches.map((match: Match) => (
          <div key={match.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 text-center">
                <p className="text-lg font-semibold">{getTeamName(match.team1Id)}</p>
                <p className="text-3xl font-bold">{match.team1Score}</p>
              </div>
              <div className="mx-4">
                <p className="text-sm text-gray-500">vs</p>
                <p className="text-xs text-gray-400">
                  {new Date(match.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-lg font-semibold">{getTeamName(match.team2Id)}</p>
                <p className="text-3xl font-bold">{match.team2Score}</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${match.status === 'completed' ? 'bg-green-100 text-green-800' :
                  match.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
              </span>
            </div>
            <MatchResult match={match} />
          </div>
        ))}
      </div>
    </div>
  );
}