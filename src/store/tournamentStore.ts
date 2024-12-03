import { create } from 'zustand';
import { Team, Player, Match, TournamentConfig } from '../types';
import * as api from '../api';

interface TournamentStore {
  teams: Team[];
  matches: Match[];
  config: TournamentConfig;
  initialized: boolean;
  initializeStore: () => Promise<void>;
  addTeam: (team: Team) => Promise<void>;
  addPlayer: (teamId: string, player: Player) => Promise<void>;
  scheduleMatch: (match: Match) => Promise<void>;
  updateMatchScore: (matchId: string, team1Score: number, team2Score: number) => Promise<void>;
  updateMatchStatus: (matchId: string, status: Match['status']) => Promise<void>;
  updateTournamentConfig: (config: Partial<TournamentConfig>) => Promise<void>;
  updatePlayerStats: (matchId: string, playerId: string, stats: any) => Promise<void>;
}

export const useTournamentStore = create<TournamentStore>((set, get) => ({
  teams: [],
  matches: [],
  config: {
    pointsForWin: 3,
    pointsForDraw: 1,
    pointsForLoss: 0,
    encounters: 2,
  },
  initialized: false,

  initializeStore: async () => {
    if (get().initialized) return;

    const [teams, matches, config] = await Promise.all([
      api.fetchTeams(),
      api.fetchMatches(),
      api.fetchConfig(),
    ]);

    set({ teams, matches, config, initialized: true });
  },

  addTeam: async (team) => {
    await api.createTeam(team);
    set((state) => ({ teams: [...state.teams, team] }));
  },

  addPlayer: async (teamId, player) => {
    await api.createPlayer(player);
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId
          ? { ...team, players: [...team.players, player] }
          : team
      ),
    }));
  },

  scheduleMatch: async (match) => {
    await api.createMatch(match);
    set((state) => ({ matches: [...state.matches, match] }));
  },

  updateMatchScore: async (matchId, team1Score, team2Score) => {
    const match = get().matches.find((m) => m.id === matchId);
    if (!match) return;

    const updatedMatch = { ...match, team1Score, team2Score };
    await api.updateMatch(matchId, updatedMatch);

    set((state) => ({
      matches: state.matches.map((m) =>
        m.id === matchId ? updatedMatch : m
      ),
    }));
  },

  updateMatchStatus: async (matchId, status) => {
    const state = get();
    const match = state.matches.find((m) => m.id === matchId);
    if (!match) return;

    const updatedMatch = { ...match, status };
    await api.updateMatch(matchId, updatedMatch);

    if (status === 'completed') {
      const team1 = state.teams.find(t => t.id === match.team1Id);
      const team2 = state.teams.find(t => t.id === match.team2Id);
      
      if (team1 && team2) {
        const isDraw = match.team1Score === match.team2Score;
        const team1Won = match.team1Score > match.team2Score;
        
        const updatedTeams = state.teams.map(team => {
          if (team.id === team1.id) {
            return {
              ...team,
              stats: {
                ...team.stats,
                wins: team.stats.wins + (team1Won ? 1 : 0),
                draws: team.stats.draws + (isDraw ? 1 : 0),
                losses: team.stats.losses + (!isDraw && !team1Won ? 1 : 0),
                pointsScored: team.stats.pointsScored + match.team1Score,
                pointsConceded: team.stats.pointsConceded + match.team2Score,
                tournamentPoints: team.stats.tournamentPoints + 
                  (team1Won ? state.config.pointsForWin : 
                   isDraw ? state.config.pointsForDraw : 
                   state.config.pointsForLoss),
                gamesPlayed: team.stats.gamesPlayed + 1,
              }
            };
          }
          if (team.id === team2.id) {
            return {
              ...team,
              stats: {
                ...team.stats,
                wins: team.stats.wins + (!team1Won && !isDraw ? 1 : 0),
                draws: team.stats.draws + (isDraw ? 1 : 0),
                losses: team.stats.losses + (team1Won ? 1 : 0),
                pointsScored: team.stats.pointsScored + match.team2Score,
                pointsConceded: team.stats.pointsConceded + match.team1Score,
                tournamentPoints: team.stats.tournamentPoints + 
                  (!team1Won ? state.config.pointsForWin : 
                   isDraw ? state.config.pointsForDraw : 
                   state.config.pointsForLoss),
                gamesPlayed: team.stats.gamesPlayed + 1,
              }
            };
          }
          return team;
        });

        // Update player stats
        const { team1PlayerStats, team2PlayerStats } = match.stats;
        const updatedTeamsWithPlayerStats = updatedTeams.map(team => {
          const updatedPlayers = team.players.map(player => {
            const matchStats = team.id === match.team1Id
              ? team1PlayerStats[player.id]
              : team2PlayerStats[player.id];

            if (matchStats) {
              return {
                ...player,
                stats: {
                  points: player.stats.points + (matchStats.points || 0),
                  assists: player.stats.assists + (matchStats.assists || 0),
                  rebounds: player.stats.rebounds + (matchStats.rebounds || 0),
                  steals: player.stats.steals,
                  blocks: player.stats.blocks,
                  gamesPlayed: player.stats.gamesPlayed + 1,
                }
              };
            }
            return player;
          });
          return { ...team, players: updatedPlayers };
        });

        for (const team of updatedTeamsWithPlayerStats) {
          await api.createTeam(team);
        }

        set({ teams: updatedTeamsWithPlayerStats });
      }
    }

    set((state) => ({
      matches: state.matches.map((m) => (m.id === matchId ? updatedMatch : m)),
    }));
  },

  updateTournamentConfig: async (config) => {
    const updatedConfig = { ...get().config, ...config };
    await api.updateConfig(updatedConfig);
    set({ config: updatedConfig });
  },

  updatePlayerStats: async (matchId, playerId, stats) => {
    const match = get().matches.find((m) => m.id === matchId);
    if (!match) return;

    const isTeam1Player = match.team1Id === get().teams.find(
      team => team.players.some(p => p.id === playerId)
    )?.id;

    const statsKey = isTeam1Player ? 'team1PlayerStats' : 'team2PlayerStats';
    const updatedMatch = {
      ...match,
      stats: {
        ...match.stats,
        [statsKey]: {
          ...match.stats[statsKey],
          [playerId]: stats,
        },
      },
    };

    await api.updateMatch(matchId, updatedMatch);
    set((state) => ({
      matches: state.matches.map((m) => (m.id === matchId ? updatedMatch : m)),
    }));
  },
}));