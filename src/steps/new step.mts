/**
  Name:       new step

  ID:         rxt3kuzr51awlsramc5frskk190qqk44
  Version:    0
  Path:       ./src/steps/new step.mts
  UpdatedAt:  2025-01-22T15:26:58.588Z

  Workspace:  e-n66kgam328dn6onso80pt9v1qoxiss1f
*/

// @ts-nocheck

export const match = () => ({ newStep: true });

export default async (data: any) => {
  console.log('running new step ');
  data.newStep2 = true
}
