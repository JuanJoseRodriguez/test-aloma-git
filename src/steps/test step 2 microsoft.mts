/**
  Name:       test step 2 microsoft

  ID:         inhjpnq88f2cda8aiykbz2utgkpgek05
  Version:    7
  Path:       ./src/steps/test step 2 microsoft.mts
  UpdatedAt:  2025-02-10T11:50:25.300Z

  Workspace:  e-ti98qpqcnljs4u421c5npsq8r6306zgy
*/

// @ts-nocheck

export const match = () => ({
testMicrosoft:true
});

export default async (data: any) => {
// const res = connectors.microsoft.request({ url: '/me/messages' })
// const res = connectors.microsoftJJ.request({ url: '/me/messages?top=2' })
console.log('res',res)
data.finalStep = true
}
