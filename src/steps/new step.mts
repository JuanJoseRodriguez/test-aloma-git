// @ts-nocheck
export const match = () => ({
  newStep: true
});

export default async (data: any) => {
  console.log('running new step ')
  task.complete()
}