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

  const getFlag = (loc: string) => {
    if (!loc) return '';
    if (loc.includes('India') || loc.includes('Mumbai') || loc === 'IN') return 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2IU2AbHqdfuGBAWGuh6Tj4QPR398D2d7N0QgHb3DVYF3pnO9fxvxEvY54RoRHoOdn46VdIn7mdTsY7QuS2-ehG8jjJAlnguHhWjZgPv6vl44iKCjt8SUC-QFqFsv_JYuMgJN0hTht_0DmXekw1hJInTdHdSBvf_mNeoKpwnitDjTCupNAQWkEMr8z9FfDKqWWQQEe1QRfw_qJh5TQ4_RLAetKmXChBp2YrWzd-PXJHIFTV_GnD-v3Jvqlsj2fcS0yimu5mpNuthzj';
    if (loc.includes('US') || loc.includes('Virginia') || loc.includes('Oregon')) return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMc8xximJjpF30mznsoZr7oJTa6-eZvOf40HSbNTxcEGcvnPRjV-ZT0YiHsgc4jZ3La5n3NqAJ8iBZAkc3vqzAwOvKzVxfFKrGyuc2M2IYEvM0XQAQp35WPm-7Hqy5Su3m2xF0hq_DvUqMruYCeD4mHRPJbqTsbj7GAuVKGdzW4tzvgyM8488N3TXU_2WS-ZZ71f1wBh3YGh3HbFuJerh04T1NxB-Bgm3j8MD4rUaXO_mOqH61Z01ToZeCBEE6ojEBwyrrKz9qh0ej';
    if (loc.includes('Sweden') || loc.includes('Stockholm') || loc === 'SE') return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMP4LPdH3yNVrimNbx_aaBo6RSE1n7ysIOuR0l9F4RRQo1G0fy2FcH-_c1qcH_x8_ON-iCJaffz6h4WW8frmy9-Ti1-fQIsy3MGej6AWFNR6cfLte5xxrR_bLPS2VBb61rS1AXHHgiwMtS3SBPMd7tRhP6_ukAZLG13YhJVytmb_CBIlN3HCabuq-HFnUpdSHjDBp3lqxl44Y7faGx4NlDJAjhr2CbOCKRTZxY5jJOYpaLw5riBXL7WZW1wd3VHZU4r5b7CnxHNYUv';
    return ''; // Fallback
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
                    <div className="w-8 h-5 rounded-sm bg-surface-container-highest overflow-hidden">
                      {getFlag(locName) && (
                        <img alt={`Flag of ${locName}`} className="w-full h-full object-cover" src={getFlag(locName)} />
                      )}
                    </div>
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
