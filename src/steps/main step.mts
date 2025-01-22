
// @ts-nocheck

export const match = () => ({ newStep2: true });

export default async (data: any) => {
  console.log('this step is just in main branch');
  task.complete()
}
