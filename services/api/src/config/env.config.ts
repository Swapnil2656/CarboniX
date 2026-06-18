import dotenv from 'dotenv';

dotenv.config();

export const config = {
  EMISSIONS_API_KEY: process.env.EMISSIONS_API_KEY || '',
  USE_STATIC_GRID_DATA: process.env.USE_STATIC_GRID_DATA === 'true' || false,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
  USE_MOCK_AGENTS: process.env.USE_MOCK_AGENTS !== 'false', // true by default
  CARBON_BUDGET_KG_DAY: parseFloat(process.env.CARBON_BUDGET_KG_DAY || '10'),
};

