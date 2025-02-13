/**
  Name:       new step

  ID:         eqi682cfpkgz3l56hlxar6sp8ighpc73
  Version:    1
  Path:       ./src/steps/new step.mts
  UpdatedAt:  2025-01-21T15:43:33.496Z

  Workspace:  e-ti98qpqcnljs4u421c5npsq8r6306zgy
*/

// @ts-nocheck

export const match = () => ({
finalStep : true
});

export default async (data: any) => {
console.log('final step') 
task.complete()
}
