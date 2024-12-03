import React from 'react';
import { Medal, Award, TrendingUp } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import { Player } from '../types';

export function PlayerStats() {
  const teams = useTournamentStore((state) => state.teams);
  
  const allPlayers = teams.flatMap(team => team.players);
  
  const sortedByPoints = [...allPlayers].sort((a, b) => b.stats.points - a.stats.points);
  const sortedByAssists = [...allPlayers].sort((a, b) => b.stats.assists - a.stats.assists);
  const sortedByRebounds = [...allPlayers].sort((a, b) => b.stats.rebounds - a.stats.rebounds);

  const StatCard = ({ player, stat, icon: Icon, label }: { player: Player, stat: number, icon: any, label: string }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5 text-yellow-500" />
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{label}</h3>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {player.name} (#{player.number})
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {teams.find(t => t.id === player.teamId)?.name}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Tournament Leaders</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedByPoints[0] && (
          <StatCard
            player={sortedByPoints[0]}
            stat={sortedByPoints[0].stats.points}
            icon={Medal}
            label="Top Scorer"
          />
        )}
        {sortedByAssists[0] && (
          <StatCard
            player={sortedByAssists[0]}
            stat={sortedByAssists[0].stats.assists}
            icon={Award}
            label="Most Assists"
          />
        )}
        {sortedByRebounds[0] && (
          <StatCard
            player={sortedByRebounds[0]}
            stat={sortedByRebounds[0].stats.rebounds}
            icon={TrendingUp}
            label="Most Rebounds"
          />
        )}
      </div>
    </div>
  );
}