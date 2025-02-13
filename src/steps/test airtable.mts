/**
  Name:       test airtable

  ID:         bw2xx9gdftzt7gys6ms1de1ejcn7381f
  Version:    17
  Path:       ./src/steps/test airtable.mts
  UpdatedAt:  2025-01-24T16:06:04.491Z

  Workspace:  e-ti98qpqcnljs4u421c5npsq8r6306zgy
*/

// @ts-nocheck

export const match = () => ({
testAirtable:true
});

export default async (data: any) => {
// const res = connectors.airtableCom.request({ url: '/bases/app3uVdWClGAWh0O5/webhooks' })
// connectors.airtableCom.request({
//   url: '/bases/app3uVdWClGAWh0O5/webhooks/achGks3UFBY1QhMPw', options: {
//     method: 'DELETE',
// }})
// connectors.airtableCom.request({
//   url: '/bases/app3uVdWClGAWh0O5/webhooks/achx98236VDBEcO0s', options: {
//     method: 'DELETE',
//   }
// })
const res = connectors.airtableCom.request({ url: `/bases/${task.config("AIRTABLE_BASE")}/webhooks` })
console.log('res ',res)
const webhooks = res.webhooks
console.log('webhooks ', webhooks)

if (webhooks.length > 0) {
  webhooks.filter(webhook => webhook.notificationUrl.startsWith('https://connect.aloma.io/connector/'))
    .forEach(webhook => {
      console.log('deleting webhook =>', webhook.id)
      connectors.airtableCom.request({
        url: `/bases/${task.config("AIRTABLE_BASE")}/webhooks/${webhook.id}`, options: {
          method: 'DELETE',
        }
      })
    })

}
}
