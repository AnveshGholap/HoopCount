import { Team, Player, Match, TournamentConfig } from '../types';

const API_URL = 'http://localhost:3000/api';

export async function fetchTeams(): Promise<Team[]> {
  const response = await fetch(`${API_URL}/teams`);
  return response.json();
}

export async function createTeam(team: Team): Promise<void> {
  await fetch(`${API_URL}/teams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(team),
  });
}

export async function createPlayer(player: Player): Promise<void> {
  await fetch(`${API_URL}/players`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(player),
  });
}

export async function fetchMatches(): Promise<Match[]> {
  const response = await fetch(`${API_URL}/matches`);
  return response.json();
}

export async function createMatch(match: Match): Promise<void> {
  await fetch(`${API_URL}/matches`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(match),
  });
}

export async function updateMatch(
  matchId: string,
  updates: Partial<Match>
): Promise<void> {
  await fetch(`${API_URL}/matches/${matchId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
}

export async function fetchConfig(): Promise<TournamentConfig> {
  const response = await fetch(`${API_URL}/config`);
  return response.json();
}

export async function updateConfig(config: TournamentConfig): Promise<void> {
  await fetch(`${API_URL}/config`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });
}