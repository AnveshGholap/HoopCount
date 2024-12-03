import React from 'react';
import { MatchScheduler } from '../components/MatchScheduler';
import { MatchList } from '../components/MatchList';
import { TournamentConfig } from '../components/TournamentConfig';

export function Schedule() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <MatchList />
      </div>
      <div className="space-y-6">
        <TournamentConfig />
        <MatchScheduler />
      </div>
    </div>
  );
}