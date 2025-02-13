/**
  Name:       firstStep clon

  ID:         wgmuni6hc9el1a85algtc7odissk1186
  Version:    2
  Path:       ./src/steps/firstStep clon.mts
  UpdatedAt:  2025-01-09T16:20:42.235Z

  Workspace:  e-ti98qpqcnljs4u421c5npsq8r6306zgy
*/

// @ts-nocheck

export const match = () => ({step:1});

export default async (data: any) => {
console.log(' updated : this is the first step')
// data.sendSlackMessage = true
data.step = 2
// data.sendEmail = true
console.log('test url => ' , globalThis.task.config('Test_url'))
}
