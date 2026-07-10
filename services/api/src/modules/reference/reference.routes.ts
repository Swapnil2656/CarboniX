import { Router } from 'express';
import { getRegions, getInstances, getProviders, getRegionsRanked } from './reference.controller';

const router = Router();

router.get('/regions', getRegions);
router.get('/regions/ranked', getRegionsRanked);
router.get('/instances', getInstances);
router.get('/providers', getProviders);

export default router;
