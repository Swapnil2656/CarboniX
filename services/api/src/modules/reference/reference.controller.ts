import { Request, Response } from 'express';
import { regions, instanceTypes, providers } from './reference.data';

import { GridService } from '../carbon/services/grid.service';

const gridService = new GridService();

export const getRegions = async (req: Request, res: Response) => {
  const { provider } = req.query;
  let filteredRegions = regions;
  if (provider) {
    filteredRegions = regions.filter(r => r.provider === (provider as string).toUpperCase());
  }

  try {
    const enrichedRegions = await Promise.all(
      filteredRegions.map(async (r) => {
        try {
          const liveData = await gridService.getGridIntensity(r.country);
          return { ...r, gridIntensity: liveData.gridIntensity };
        } catch (e) {
          return r;
        }
      })
    );
    return res.json({ success: true, data: enrichedRegions });
  } catch (error) {
    console.error('Failed to fetch live grid data', error);
  }

  res.json({ success: true, data: filteredRegions });
};

export const getInstances = (req: Request, res: Response) => {
  const { provider } = req.query;
  let filteredInstances = instanceTypes;
  if (provider) {
    filteredInstances = instanceTypes.filter(i => i.provider === (provider as string).toUpperCase());
  }
  res.json({ success: true, data: filteredInstances });
};

export const getProviders = (req: Request, res: Response) => {
  res.json({ success: true, data: providers });
};

export const getRegionsRanked = async (req: Request, res: Response) => {
  const { provider } = req.query;
  let filteredRegions = regions;
  if (provider) {
    filteredRegions = regions.filter(r => r.provider === (provider as string).toUpperCase());
  }

  // Sort by grid intensity (ascending - greenest first)
  filteredRegions = [...filteredRegions].sort((a, b) => a.gridIntensity - b.gridIntensity);

  try {
    const enrichedRegions = await Promise.all(
      filteredRegions.map(async (r) => {
        let gridIntensity = r.gridIntensity;
        try {
          const liveData = await gridService.getGridIntensity(r.country);
          gridIntensity = liveData.gridIntensity;
        } catch (e) {
          // Fallback to static
        }
        
        let category = 'red';
        if (gridIntensity <= 200) category = 'green';
        else if (gridIntensity <= 400) category = 'yellow';

        return {
          code: r.code,
          name: r.name,
          country: r.country,
          gridIntensity,
          category,
          // We omit estimatedCo2Kg here as it requires full calculate params 
          // (which can be added later if UI passes them)
        };
      })
    );
    
    // Re-sort just in case live data changed order
    enrichedRegions.sort((a, b) => a.gridIntensity - b.gridIntensity);

    // Calculate savings vs current (the worst one, or just relative to max)
    if (enrichedRegions.length > 0) {
      const highestIntensity = enrichedRegions[enrichedRegions.length - 1].gridIntensity;
      enrichedRegions.forEach(r => {
        // Simple heuristic: percentage cleaner than the dirtiest region
        (r as any).savingsVsCurrent = Math.round(((highestIntensity - r.gridIntensity) / highestIntensity) * 100);
      });
    }

    return res.json({ success: true, data: enrichedRegions });
  } catch (error: any) {
    console.error('Failed to fetch ranked regions', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
