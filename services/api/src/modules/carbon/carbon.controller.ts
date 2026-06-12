import { Request, Response } from 'express';
import { calculateCarbon, CarbonEngineInput } from './carbon.engine';

export const calculate = async (req: Request, res: Response) => {
  try {
    const input: CarbonEngineInput = req.body;
    
    // Basic validation
    if (!input.provider || !input.region || !input.instanceType || !input.instanceCount || !input.hoursPerMonth || input.cpuUtilization === undefined || input.storageGb === undefined) {
      return res.status(400).json({ success: false, error: 'Missing required parameters' });
    }

    const result = await calculateCarbon(input);
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const compare = async (req: Request, res: Response) => {
  // A simplified compare endpoint for demonstration
  // In reality, this would run calculateCarbon across multiple providers for the same config
  try {
    const input: CarbonEngineInput = req.body;
    const result = await calculateCarbon(input);
    res.json({ success: true, data: { base: result } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const recommend = async (req: Request, res: Response) => {
  try {
    const input: CarbonEngineInput = req.body;
    const result = await calculateCarbon(input);
    res.json({ 
      success: true, 
      data: {
        recommendedRegion: result.recommendedRegion,
        recommendedCo2Kg: result.recommendedCo2Kg,
        reductionPercent: result.reductionPercent,
        recommendation: result.recommendation
      } 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
