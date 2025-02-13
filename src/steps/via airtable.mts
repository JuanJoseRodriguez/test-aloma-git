/**
  Name:       via airtable

  ID:         xxantyop6qglm423pb5yg9zki5xgrwhw
  Version:    1
  Path:       ./src/steps/via airtable.mts
  UpdatedAt:  2025-01-23T13:40:00.734Z

  Workspace:  e-ti98qpqcnljs4u421c5npsq8r6306zgy
*/

// @ts-nocheck

export const match = () => ({
  "$via": {
    name: "airtable.com"
  }
});

export default async (data: any) => {
console.log('received via airtable connector')
}
