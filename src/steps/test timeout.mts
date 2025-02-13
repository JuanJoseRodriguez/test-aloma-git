/**
  Name:       test timeout

  ID:         w28kwvxnbwvrnn4z0iivt1ro38b891n7
  Version:    2
  Path:       ./src/steps/test timeout.mts
  UpdatedAt:  2025-02-05T17:29:41.701Z

  Workspace:  e-ti98qpqcnljs4u421c5npsq8r6306zgy
*/

// @ts-nocheck

export const match = () => ({
testTimeout:true
});

export default async (data: any) => {
console.log('starting ...')
let i=1
while (i > 0) {
  console.log('i',i)
  i++
}
console.log('i',i)
}
