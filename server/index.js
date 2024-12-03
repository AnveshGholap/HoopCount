import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'tournament.db'));
const app = express();

app.use(cors());
app.use(express.json());

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS teams (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    stats TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    number INTEGER NOT NULL,
    position TEXT NOT NULL,
    teamId TEXT NOT NULL,
    stats TEXT NOT NULL,
    FOREIGN KEY (teamId) REFERENCES teams (id)
  );

  CREATE TABLE IF NOT EXISTS matches (
    id TEXT PRIMARY KEY,
    team1Id TEXT NOT NULL,
    team2Id TEXT NOT NULL,
    team1Score INTEGER NOT NULL,
    team2Score INTEGER NOT NULL,
    date TEXT NOT NULL,
    status TEXT NOT NULL,
    stats TEXT NOT NULL,
    FOREIGN KEY (team1Id) REFERENCES teams (id),
    FOREIGN KEY (team2Id) REFERENCES teams (id)
  );

  CREATE TABLE IF NOT EXISTS tournament_config (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    config TEXT NOT NULL
  );
`);

// Initialize tournament config if not exists
const configStmt = db.prepare('SELECT * FROM tournament_config WHERE id = 1');
if (!configStmt.get()) {
  db.prepare('INSERT INTO tournament_config (id, config) VALUES (?, ?)').run(
    1,
    JSON.stringify({
      pointsForWin: 3,
      pointsForDraw: 1,
      pointsForLoss: 0,
      encounters: 2,
    })
  );
}

// Teams endpoints
app.get('/api/teams', (req, res) => {
  const teams = db.prepare('SELECT * FROM teams').all().map(team => ({
    ...team,
    stats: JSON.parse(team.stats),
    players: db.prepare('SELECT * FROM players WHERE teamId = ?').all(team.id).map(player => ({
      ...player,
      stats: JSON.parse(player.stats),
    })),
  }));
  res.json(teams);
});

app.post('/api/teams', (req, res) => {
  const { id, name, stats } = req.body;
  db.prepare('INSERT INTO teams (id, name, stats) VALUES (?, ?, ?)').run(
    id,
    name,
    JSON.stringify(stats)
  );
  res.json({ success: true });
});

// Players endpoints
app.post('/api/players', (req, res) => {
  const { id, name, number, position, teamId, stats } = req.body;
  db.prepare(
    'INSERT INTO players (id, name, number, position, teamId, stats) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(id, name, number, position, teamId, JSON.stringify(stats));
  res.json({ success: true });
});

// Matches endpoints
app.get('/api/matches', (req, res) => {
  const matches = db.prepare('SELECT * FROM matches').all().map(match => ({
    ...match,
    stats: JSON.parse(match.stats),
  }));
  res.json(matches);
});

app.post('/api/matches', (req, res) => {
  const { id, team1Id, team2Id, team1Score, team2Score, date, status, stats } = req.body;
  db.prepare(
    'INSERT INTO matches (id, team1Id, team2Id, team1Score, team2Score, date, status, stats) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(id, team1Id, team2Id, team1Score, team2Score, date, status, JSON.stringify(stats));
  res.json({ success: true });
});

app.put('/api/matches/:id', (req, res) => {
  const { team1Score, team2Score, status, stats } = req.body;
  db.prepare(
    'UPDATE matches SET team1Score = ?, team2Score = ?, status = ?, stats = ? WHERE id = ?'
  ).run(team1Score, team2Score, status, JSON.stringify(stats), req.params.id);
  res.json({ success: true });
});

// Tournament config endpoints
app.get('/api/config', (req, res) => {
  const config = db.prepare('SELECT config FROM tournament_config WHERE id = 1').get();
  res.json(JSON.parse(config.config));
});

app.put('/api/config', (req, res) => {
  db.prepare('UPDATE tournament_config SET config = ? WHERE id = 1').run(
    JSON.stringify(req.body)
  );
  res.json({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});