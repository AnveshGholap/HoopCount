import React from 'react';
import { TeamRegistration } from '../components/TeamRegistration';
import { PlayerRegistration } from '../components/PlayerRegistration';
import { TeamList } from '../components/TeamList';

export function Teams() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <TeamList />
      </div>
      <div className="space-y-6">
        <TeamRegistration />
        <PlayerRegistration />
      </div>
    </div>
  );
}