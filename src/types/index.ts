export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  teamId: string;
  stats: PlayerStats;
}

export interface PlayerStats {
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
  gamesPlayed: number;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
  stats: TeamStats;
}

export interface TeamStats {
  wins: number;
  losses: number;
  draws: number;
  pointsScored: number;
  pointsConceded: number;
  tournamentPoints: number;
  gamesPlayed: number;
}

export interface Match {
  id: string;
  team1Id: string;
  team2Id: string;
  team1Score: number;
  team2Score: number;
  date: string;
  status: 'scheduled' | 'ongoing' | 'completed';
  stats: MatchStats;
}

export interface MatchStats {
  team1PlayerStats: Record<string, PlayerMatchStats>;
  team2PlayerStats: Record<string, PlayerMatchStats>;
}

export interface PlayerMatchStats {
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
}

export interface TournamentConfig {
  pointsForWin: number;
  pointsForDraw: number;
  pointsForLoss: number;
  encounters: number;
}