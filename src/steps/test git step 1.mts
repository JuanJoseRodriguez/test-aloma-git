/**
  Name:       test git step 1

  ID:         o87rjjpz2mec2l5cahb31wjizjm99k8m
  Version:    1
  Path:       ./src/steps/test git step 1.mts
  UpdatedAt:  2025-01-22T14:13:35.979Z

  Workspace:  e-n66kgam328dn6onso80pt9v1qoxiss1f
*/

// @ts-nocheck

export const match = () => ({
runStep:1
});

export default async (data: any) => {
console.log('running step 1')

data.runStep = 2
}
