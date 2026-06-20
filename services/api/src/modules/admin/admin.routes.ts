import { Router } from 'express';
import {
  getDashboard,
  getUsers,
  getFeatureFlags,
  toggleFeatureFlag,
  getApiKeys,
  createApiKey,
  revokeApiKey
} from './admin.controller';

const router = Router();

router.get('/dashboard', getDashboard);
router.get('/users', getUsers);
router.get('/feature-flags', getFeatureFlags);
router.patch('/feature-flags/:id', toggleFeatureFlag);
router.get('/api-keys', getApiKeys);
router.post('/api-keys', createApiKey);
router.delete('/api-keys/:id', revokeApiKey);

export default router;
