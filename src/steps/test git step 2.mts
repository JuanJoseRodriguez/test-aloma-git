/**
  Name:       test git step 2

  ID:         d8qdl4qkhvt92qzyfszy5ar2sxtt03h8
  Version:    7
  Path:       ./src/steps/test git step 2.mts
  UpdatedAt:  2025-01-22T15:31:03.477Z

  Workspace:  e-n66kgam328dn6onso80pt9v1qoxiss1f
*/

// @ts-nocheck

export const match = () => ({ runStep: 2 });

export default async (data: any) => {
  console.log('running new version of step 2 updated on git ');
  console.log('new log');
  console.log('another new log');
  // const res = connectors.microsoftJJ.parsedRequest({ url: '/me/messages?top=2' })
  // console.log('res =>', res)
  console.log('just updating the step in another_company brach');
  data.newStep = true;
}
