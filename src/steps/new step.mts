/**
  Name:       new step

  ID:         rxt3kuzr51awlsramc5frskk190qqk44
  Version:    2
  Path:       ./src/steps/new step.mts
  UpdatedAt:  2025-01-22T18:05:15.905Z

  Workspace:  e-n66kgam328dn6onso80pt9v1qoxiss1f
*/

// @ts-nocheck

export const match = () => ({newStep: true});

export default async (data: any) => {
console.log('running new step ');
data.newStep2 = true;
}
