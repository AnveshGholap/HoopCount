import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import { Match, Team } from '../types';
import { PlayerMatchStats } from './PlayerMatchStats';

export function MatchResult({ match }: { match: Match }) {
  const updateMatchScore = useTournamentStore((state) => state.updateMatchScore);
  const updateMatchStatus = useTournamentStore((state) => state.updateMatchStatus);
  const teams = useTournamentStore((state) => state.teams);

  const [scores, setScores] = useState({
    team1: match.team1Score,
    team2: match.team2Score,
  });

  const getTeamName = (teamId: string) => {
    return teams.find((team: Team) => team.id === teamId)?.name || 'Unknown Team';
  };

  const handleScoreChange = (team: 'team1' | 'team2', value: string) => {
    setScores({ ...scores, [team]: parseInt(value) || 0 });
  };

  const handleSave = () => {
    updateMatchScore(match.id, scores.team1, scores.team2);
    updateMatchStatus(match.id, 'completed');
  };

  if (match.status === 'completed') {
    return null;
  }

  return (
    <div className="mt-4 space-y-6">
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="grid grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {getTeamName(match.team1Id)}
            </label>
            <input
              type="number"
              value={scores.team1}
              onChange={(e) => handleScoreChange('team1', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div className="text-center text-gray-500 dark:text-gray-400">vs</div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {getTeamName(match.team2Id)}
            </label>
            <input
              type="number"
              value={scores.team2}
              onChange={(e) => handleScoreChange('team2', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Save Result
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlayerMatchStats match={match} teamId={match.team1Id} />
        <PlayerMatchStats match={match} teamId={match.team2Id} />
      </div>
    </div>
  );
}