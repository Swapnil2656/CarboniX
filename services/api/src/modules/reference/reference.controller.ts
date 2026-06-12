import { Request, Response } from 'express';
import { regions, instanceTypes, providers } from './reference.data';

export const getRegions = (req: Request, res: Response) => {
  const { provider } = req.query;
  let filteredRegions = regions;
  if (provider) {
    filteredRegions = regions.filter(r => r.provider === (provider as string).toUpperCase());
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
