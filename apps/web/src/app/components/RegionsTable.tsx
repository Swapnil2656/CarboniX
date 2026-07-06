"use client";

import React, { useEffect, useState } from 'react';

type Region = {
  id: string;
  provider: string;
  code: string;
  name: string;
  country: string;
  continent: string;
  gridIntensity: number;
  pue: number;
};

export function RegionsTable() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
        const res = await fetch(`${apiUrl}/reference/regions`);
        if (res.ok) {
          const data = await res.json();
          setRegions(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch regions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRegions();
  }, []);

  if (loading) {
    return <div className="text-center text-on-surface-variant py-xl">Loading live grid data...</div>;
  }

  if (!regions || regions.length === 0) {
    return <div className="text-center text-error py-xl">Failed to load grid data.</div>;
  }

  const getRating = (intensity: number) => {
    if (intensity < 50) return { label: 'BEST IN CLASS', className: 'bg-primary-container text-on-primary-fixed' };
    if (intensity < 400) return { label: 'MODERATE', className: 'bg-surface-container-highest text-on-surface-variant' };
    return { label: 'CRITICAL', className: 'bg-error/20 text-error' };
  };



  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-outline-variant">
            <th className="text-left font-label-caps text-label-caps text-on-surface-variant py-lg">REGION</th>
            <th className="text-left font-label-caps text-label-caps text-on-surface-variant py-lg">GRID INTENSITY</th>
            <th className="text-left font-label-caps text-label-caps text-on-surface-variant py-lg">PUE</th>
            <th className="text-right font-label-caps text-label-caps text-on-surface-variant py-lg">RATING</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {regions.map((region) => {
            const intensity = region.gridIntensity || 0;
            const rating = getRating(intensity);
            const isBest = intensity < 50;
            const locName = region.name || region.code || '';
            
            return (
              <tr key={region.id} className={`${isBest ? 'bg-primary-container/5 border-l-4 border-primary-container' : 'hover:bg-surface-container transition-colors group'}`}>
                <td className={`py-lg ${isBest ? 'pl-lg' : ''}`}>
                  <div className="flex items-center gap-md">

                    <span className={`font-display font-bold ${isBest ? 'text-primary-container' : 'text-on-surface'}`}>
                      {locName} ({region.code})
                    </span>
                  </div>
                </td>
                <td className={`py-lg font-code ${isBest ? 'text-primary-container' : (rating.label === 'CRITICAL' ? 'text-error' : 'text-on-surface-variant')}`}>
                  {intensity} gCO2/kWh
                </td>
                <td className="py-lg font-code text-on-surface-variant">
                  {region.pue}
                </td>
                <td className={`py-lg text-right ${isBest ? 'pr-lg' : ''}`}>
                  <span className={`${rating.className} px-md py-xs rounded-full font-label-caps text-[10px]`}>
                    {rating.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
