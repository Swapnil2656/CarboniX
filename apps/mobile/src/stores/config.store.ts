/**
 * Config Builder Store — Zustand
 *
 * Manages the carbon calculation config form state.
 */

import { create } from 'zustand';

interface ConfigState {
  provider: 'aws' | 'gcp' | 'azure' | null;
  region: string | null;
  instanceType: string | null;
  serverCount: number;
  hoursPerDay: number;
  cpuUtilization: number;
  storageTb: number;
  ramGb: number;

  setProvider: (provider: ConfigState['provider']) => void;
  setRegion: (region: string) => void;
  setInstanceType: (type: string) => void;
  setServerCount: (count: number) => void;
  setHoursPerDay: (hours: number) => void;
  setCpuUtilization: (util: number) => void;
  setStorageTb: (tb: number) => void;
  setRamGb: (gb: number) => void;
  reset: () => void;
}

const initialState = {
  provider: null as ConfigState['provider'],
  region: null as string | null,
  instanceType: null as string | null,
  serverCount: 1,
  hoursPerDay: 24,
  cpuUtilization: 50,
  storageTb: 0,
  ramGb: 0,
};

export const useConfigStore = create<ConfigState>((set) => ({
  ...initialState,

  setProvider: (provider) => set({ provider }),
  setRegion: (region) => set({ region }),
  setInstanceType: (instanceType) => set({ instanceType }),
  setServerCount: (serverCount) => set({ serverCount }),
  setHoursPerDay: (hoursPerDay) => set({ hoursPerDay }),
  setCpuUtilization: (cpuUtilization) => set({ cpuUtilization }),
  setStorageTb: (storageTb) => set({ storageTb }),
  setRamGb: (ramGb) => set({ ramGb }),
  reset: () => set(initialState),
}));
