import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware';
import {
  getDashboard,
  getUsers,
  getFeatureFlags,
  toggleFeatureFlag,
  getApiKeys,
  createApiKey,
  revokeApiKey,
  deleteApiKey,
  getTeamMembers,
  syncTeamMembers,
  inviteUser,
  removeTeamMember,
  getEmissions,
  migrateEmission,
  getNotifications,
  deleteNotification,
  getAuditLogs,
  deleteAuditLog,
  deleteProject,
  disconnectProject,
  getProjectStats,
  addDeployment,
  deleteDeployment,
} from './admin.controller';

const router = Router();

router.use(authenticate);

router.get('/dashboard', getDashboard);
router.get('/emissions', getEmissions);
router.post('/emissions/:id/migrate', migrateEmission);
router.get('/notifications', getNotifications);
router.delete('/notifications/:id', deleteNotification);
router.get('/audit-logs', getAuditLogs);
router.delete('/audit-logs/:id', deleteAuditLog);
router.get('/users', getUsers);
router.delete('/projects/:id', deleteProject);
router.post('/projects/:id/disconnect', disconnectProject);
router.get('/projects/:id/stats', getProjectStats);
router.post('/projects/:id/deployments', addDeployment);
router.delete('/projects/:id/deployments/:deploymentId', deleteDeployment);
router.delete('/users/:id', removeTeamMember);
router.post('/users/sync', syncTeamMembers);
router.post('/users/invite', inviteUser);
router.get('/team', getTeamMembers);
router.get('/feature-flags', getFeatureFlags);
router.patch('/feature-flags/:id', toggleFeatureFlag);
router.get('/api-keys', getApiKeys);
router.post('/api-keys', createApiKey);
router.delete('/api-keys/:id', revokeApiKey);
router.delete('/api-keys/:id/hard', deleteApiKey);

export default router;
