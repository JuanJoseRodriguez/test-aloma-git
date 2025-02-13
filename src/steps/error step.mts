/**
  Name:       error step

  ID:         cjh0u240wqhco65pbjs7ie4q2dc79nso
  Version:    4
  Path:       ./src/steps/error step.mts
  UpdatedAt:  2025-01-29T12:21:45.384Z

  Workspace:  e-ti98qpqcnljs4u421c5npsq8r6306zgy
*/

// @ts-nocheck

export const match = () => ({
  testError: true
});

export default async (data: any) => {
// throw new Error('Testing errors notifications..')
data.errorStep = 2
}
