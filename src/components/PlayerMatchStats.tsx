import React, { useState } from 'react';
import { Target, Award, TrendingUp } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import { Match, Player } from '../types';

interface PlayerStatInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon: React.ElementType;
}

function PlayerStatInput({ label, value, onChange, icon: Icon }: PlayerStatInputProps) {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      <label className="text-sm text-gray-600 dark:text-gray-300 flex-1">{label}</label>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-20 px-2 py-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
  );
}

export function PlayerMatchStats({ match, teamId }: { match: Match; teamId: string }) {
  const teams = useTournamentStore((state) => state.teams);
  const updatePlayerStats = useTournamentStore((state) => state.updatePlayerStats);
  
  const team = teams.find((t) => t.id === teamId);
  const statsKey = teamId === match.team1Id ? 'team1PlayerStats' : 'team2PlayerStats';
  
  const [playerStats, setPlayerStats] = useState<Record<string, { points: number; assists: number; rebounds: number }>>({});

  const handleStatChange = (playerId: string, stat: 'points' | 'assists' | 'rebounds', value: number) => {
    setPlayerStats((prev) => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        [stat]: value,
      },
    }));

    updatePlayerStats(match.id, playerId, {
      ...playerStats[playerId],
      [stat]: value,
    });
  };

  if (!team) return null;

  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {team.name} - Player Statistics
      </h3>
      <div className="grid gap-4">
        {team.players.map((player: Player) => (
          <div
            key={player.id}
            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                #{player.number} {player.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {player.position}
              </span>
            </div>
            <div className="space-y-2">
              <PlayerStatInput
                label="Points"
                value={playerStats[player.id]?.points || 0}
                onChange={(value) => handleStatChange(player.id, 'points', value)}
                icon={Target}
              />
              <PlayerStatInput
                label="Assists"
                value={playerStats[player.id]?.assists || 0}
                onChange={(value) => handleStatChange(player.id, 'assists', value)}
                icon={Award}
              />
              <PlayerStatInput
                label="Rebounds"
                value={playerStats[player.id]?.rebounds || 0}
                onChange={(value) => handleStatChange(player.id, 'rebounds', value)}
                icon={TrendingUp}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}