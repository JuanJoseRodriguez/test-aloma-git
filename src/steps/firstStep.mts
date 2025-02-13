/**
  Name:       firstStep

  ID:         beotn5lz3h77sumels9rtulizkaz9lwb
  Version:    7
  Path:       ./src/steps/firstStep.mts
  UpdatedAt:  2025-01-09T13:38:05.522Z

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
task.complete()
}
