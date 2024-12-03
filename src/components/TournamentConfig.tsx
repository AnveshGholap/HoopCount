import React from 'react';
import { Settings } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';

export function TournamentConfig() {
  const config = useTournamentStore((state) => state.config);
  const updateConfig = useTournamentStore((state) => state.updateTournamentConfig);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateConfig({ [name]: parseInt(value) });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Tournament Settings</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="pointsForWin" className="block text-sm font-medium text-gray-700">
            Points for Win
          </label>
          <input
            type="number"
            id="pointsForWin"
            name="pointsForWin"
            value={config.pointsForWin}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="pointsForDraw" className="block text-sm font-medium text-gray-700">
            Points for Draw
          </label>
          <input
            type="number"
            id="pointsForDraw"
            name="pointsForDraw"
            value={config.pointsForDraw}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="pointsForLoss" className="block text-sm font-medium text-gray-700">
            Points for Loss
          </label>
          <input
            type="number"
            id="pointsForLoss"
            name="pointsForLoss"
            value={config.pointsForLoss}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="encounters" className="block text-sm font-medium text-gray-700">
            Number of Encounters
          </label>
          <input
            type="number"
            id="encounters"
            name="encounters"
            value={config.encounters}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}