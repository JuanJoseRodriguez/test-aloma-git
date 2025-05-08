/**
  Name:       git webhook test

  ID:         wgmuni6hc9el1a85algtc7odissk1186
  Version:    2
  Path:       ./src/steps/TEST/git webhook test.mts
  UpdatedAt:  2025-05-08T16:20:42.235Z

  Workspace:  e-ti98qpqcnljs4u421c5npsq8r6306zgy
*/

// @ts-nocheck

export const match = () => ({gitAction: 'push'});

export default async (data: any) => {
console.log(' updated : this is the first test step')
data.gitStep = 2
}
