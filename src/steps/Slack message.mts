/**
  Name:       Slack message

  ID:         jal3dbmgyj806w21uhzgg40g7ybjczul
  Version:    4
  Path:       ./src/steps/Slack message.mts
  UpdatedAt:  2025-01-07T14:04:50.732Z

  Workspace:  e-ti98qpqcnljs4u421c5npsq8r6306zgy
*/

// @ts-nocheck

export const match = () => ({
sendSlackMessage:true
});

export default async (data: any) => {
console.log('slackMessage => ', data.slackMessage)
connectors.slackCom.send({ text: data.slackMessage, channel: 'C087L8Z4FNE' })

delete (data.slackMessage);

data.slackSent = true;

task.complete()
}
