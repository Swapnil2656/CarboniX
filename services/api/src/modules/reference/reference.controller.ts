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
