/**
  Name:       hello world

  ID:         v1zo2wokgz6le1pbb81j8v8l0r4h8vvs
  Version:    0
  Path:       ./src/steps/hello world.mts
  UpdatedAt:  2025-01-22T15:20:58.636Z

  Workspace:  e-n66kgam328dn6onso80pt9v1qoxiss1f
*/

// @ts-nocheck

export const match = () => ({hello: String});

export default async (data: any) => {
console.log(`hello ${data.hello}`);
    data.greeted = true;
}
