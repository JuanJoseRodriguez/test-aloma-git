/**
  Name:       BKN/12. Generate Invoice

  ID:         iise9ngisihsp7kpjnjaj97bixuotgme
  Version:    1
  Path:       ./src/steps/BKN/12. Generate Invoice.mts
  UpdatedAt:  2025-02-13T17:54:28.751Z

  Workspace:  e-ti98qpqcnljs4u421c5npsq8r6306zgy
*/

// @ts-nocheck

export const match = () => ({createNewInvoice: true});

export default async (data: any) => {
function get85PercentRuleDifference(orderType, orderedAmount, deliveredAmount) {
  let invoicedAmount = (deliveredAmount || 0);
  if (orderType === 'Eltern' && (deliveredAmount / orderedAmount) < 0.85) {
    invoicedAmount = Math.round(orderedAmount * 0.85);
  }
  return invoicedAmount - deliveredAmount;
}
const getLineItemObject = (part, amountDelivered, shouldAppendText, positionNumber) => {
  const textToAppend = '*Gemäß §10 (4) Vertragsbestimmungen werden 85% der ursprünglich bestellten Portionen abgerechnet.';
  return {
    'id': null,
    'objectName': 'InvoicePos',
    'mapAll': true,
    'part': {
      'id': part?.id,
      'objectName': 'Part'
    },
    'quantity': amountDelivered,
    'name': part?.name,
    'unity': {
      'id': 1,
      'objectName': 'Unity'
    },
    'positionNumber': positionNumber,
    'text': `Speisen gemäß des angehängten Beköstigungsnachweises\n${shouldAppendText ? textToAppend : ''}`,
    'taxRate': 19,
    'price': '5.16',
    'priceGross': '5.16'
  };
};
// Environment Based Variables
const environmentName = task.config('envName');
const productionSevUser = 1231790;
const testSevUser = 1231790;
//let sevUserID = environmentName !== 'production' ? productionSevUser : testSevUser
const apiKey2 = task.config('SEVDESK_API_KEY');
const sevUserResponse = connectors.fetch({
  url: `https://my.sevdesk.de/api/v1/SevUser`,
  options: {
    method: 'GET',
    headers: {
      Authorization: apiKey2
    }
  }
});
const sevUserID = sevUserResponse.body.objects[0].id;
console.log('sevTestResponse: ', sevUserID);
const instanceId = data?.task?.instanceid;
const contextSymbols = connectors.metamorphosV2.getContext(data.task.taskdata);
const startDatum = contextSymbols?.find((cs) => cs.id === 'StartDatum')?.value;
const endDatum = contextSymbols?.find((cs) => cs.id === 'EndDatum')?.value;
const schulecode = contextSymbols?.find((cs) => cs.id === 'Schulcode')?.value;
const customerNumber = contextSymbols?.find((cs) => cs.id === 'Bezirk Kundennummer')?.value;
const nameForAddress = contextSymbols?.find((rc) => rc.key === 'Bezirk Ansprechpartner')?.value;
const streetName = contextSymbols?.find((rc) => rc.key === 'Bezirk Adresse')?.value;
const postCode = contextSymbols?.find((rc) => rc.key === 'Bezirk PLZ')?.value;
const city = contextSymbols?.find((rc) => rc.key === 'Bezirk Stadt')?.value;
const allFiles = connectors.metamorphosV2.getFiles({
  task: data.task.taskdata
});
const newFileParams = allFiles.find(cs => cs.id === 'BeköstigungsdatenSchule');
const bekoDelimiter = lib.helper.getDelimiter(newFileParams.value);
const bekoCsv = util.csv.toJSON(newFileParams.value, { delimiter: bekoDelimiter });
console.log('bekoCsv: ', bekoCsv);
const schools = connectors.postgreSqlDatabase.select({
  query: `select * from schools where archived = false and instanceid = '${instanceId}'`,
});
const school = schools?.[0];
const schoolId = school?.id;
console.log('school: ', school);
// Aggregate BKN data 
let hasElternRow = false;
let is85RuleApplied = false;
let totalMenues = 0;
let totalLunch = 0;
bekoCsv.forEach((row) => {
  const bknArt = row[lib.attributes.InternalBKNAttributes.bknArt];
  if (bknArt === 'ElternInfo')
    return; // Nothing to do, row is only for display purpose
  if (bknArt === 'Eltern')
    hasElternRow = true;
  const rowMenu1Ordered = parseInt(row[lib.attributes.InternalBKNAttributes.menu1Ordered] || 0);
  const rowMenu1Delivered = parseInt(row[lib.attributes.InternalBKNAttributes.menu1Delivered] || 0);
  const rowMenu2Ordered = parseInt(row[lib.attributes.InternalBKNAttributes.menu2Ordered] || 0);
  const rowMenu2Delivered = parseInt(row[lib.attributes.InternalBKNAttributes.menu2Delivered] || 0);
  const rowMenu3Ordered = parseInt(row[lib.attributes.InternalBKNAttributes.menu3Ordered] || 0);
  const rowMenu3Delivered = parseInt(row[lib.attributes.InternalBKNAttributes.menu3Delivered] || 0);
  const rowLunch = parseInt(row[lib.attributes.InternalBKNAttributes.lunch] || 0);
  const rowTotalOrdered = rowMenu1Ordered + rowMenu2Ordered + rowMenu3Ordered;
  const rowTotalDelivered = rowMenu1Delivered + rowMenu2Delivered + rowMenu3Delivered;
  const rowDiffAmount85Rule = row[lib.attributes.InternalBKNAttributes.diffAmount85Rule]
    ? parseInt(row[lib.attributes.InternalBKNAttributes.diffAmount85Rule])
    : get85PercentRuleDifference(bknArt, rowTotalOrdered, rowTotalDelivered);
  if (rowDiffAmount85Rule !== 0) {
    is85RuleApplied = true;
  }
  totalMenues += (rowTotalDelivered + rowDiffAmount85Rule);
  totalLunch += rowLunch;
  console.log('rowMenu1Ordered: ', rowMenu1Ordered);
  console.log('rowMenu1Delivered: ', rowMenu1Delivered);
  console.log('rowMenu2Ordered: ', rowMenu2Ordered);
  console.log('rowMenu2Delivered: ', rowMenu2Delivered);
  console.log('rowMenu3Ordered: ', rowMenu3Ordered);
  console.log('rowMenu3Delivered: ', rowMenu3Delivered);
  console.log('rowLunch: ', rowLunch);
  console.log('rowTotalOrdered: ', rowTotalOrdered);
  console.log('rowTotalDelivered: ', rowTotalDelivered);
  console.log('rowDiffAmount85Rule: ', rowDiffAmount85Rule);
});
console.log('totalMenues: ', totalMenues);
console.log('totalLunch: ', totalLunch);
const apiKey = task.config('SEVDESK_API_KEY');
// get Part (line item) information from SevDesk.
const productResponse = connectors.fetch({
  url: `https://my.sevdesk.de/api/v1/Part`,
  options: {
    method: 'GET',
    headers: {
      Authorization: apiKey
    }
  }
});
console.log('productResponse: ', productResponse);
const parts = productResponse.body.objects;
const partMenu = parts.find((p) => p.partNumber === '1008');
const partLunch = parts.find((p) => p.partNumber === '1002');
let allTotal = 0;
const lineItems = [];
if (totalMenues) {
  allTotal += totalMenues;
  const lineItemMenu = getLineItemObject(partMenu, totalMenues, is85RuleApplied, 0);
  lineItems.push(lineItemMenu);
}
if (totalLunch > 0) {
  allTotal += totalLunch;
  const lineItemLunch = getLineItemObject(partLunch, totalLunch, false, 3);
  lineItems.push(lineItemLunch);
}
allTotal = allTotal.toLocaleString('de-DE');
const invoiceNumber = `RE-${data.nextInvoiceNumber}`;
const contactResponse = connectors.fetch({
  url: `https://my.sevdesk.de/api/v1/Contact?customerNumber=${customerNumber}&depth=1`,
  options: {
    method: 'GET',
    headers: {
      Authorization: apiKey
    }
  }
});
console.log('contactResponse', contactResponse);
const contactToUse = contactResponse.body.objects.find((c) => c.parent);
console.log('contactToUse: ', contactToUse);
const contactId = contactToUse.id;
const newDate = new Date();
const newDay = newDate.getDate();
const newMonth = newDate.getMonth() + 1;
const newYear = newDate.getFullYear();
console.log('new date: ', `${newDay}.${newMonth}.${newYear}`);
const startDatumString = `${new Date(startDatum).getDate()}.${new Date(startDatum).getMonth() + 1}.${new Date(startDatum).getFullYear()}`;
const endDatumString = `${new Date(endDatum).getDate()}.${new Date(endDatum).getMonth() + 1}.${new Date(endDatum).getFullYear()}`;
const invoiceBody = {
  'id': null,
  'objectName': 'Invoice',
  // 'invoiceNumber': invoiceNumber,
  'invoiceNumber': null,
  'contact': {
    'id': contactId,
    'objectName': 'Contact'
  },
  'contactPerson': {
    'id': sevUserID,
    'objectName': 'SevUser'
  },
  'invoiceDate': endDatumString,
  'header': `Rechnung für die Schulversorgung von ${startDatumString} bis ${endDatumString} in der ${school?.data?.Schulnamen} (${schoolId})`,
  'footText': `Gesamtsumme: <b>${allTotal}</b> Portionen<br><br>Bitte überweisen Sie den Gesamtbetrag ohne Abzug bis zum [%ZAHLUNGSZIEL%] auf das unten angegebene Konto.<br><br>Vielen Dank für Ihren Auftrag und Ihr Vertrauen!`,
  // 'address': `\n${streetName}\n${postCode} ${city}`,
  // 'addressCountry': {
  //   'id': 1,
  //   'objectName': 'StaticCountry'
  // },
  'timeToPay': 7,
  'deliveryDate': startDatumString,
  'deliveryDateUntil': endDatumString,
  'status': '100',
  // 'isNet': false,
  'taxRate': 0,
  'taxRule': {
    'id': '1',
    'objectName': 'TaxRule'
  },
  'invoiceType': 'RE',
  'currency': 'EUR',
  'showNet': '0',
  'sendType': 'VM',
  'origin': null,
  'customerInternalNote': null,
  'mapAll': true,
};
const requestBody = JSON.stringify({
  invoice: invoiceBody,
  invoicePosSave: lineItems
});
console.log('invoiceBody: ', invoiceBody);
console.log('lineItems: ', lineItems);
const invoiceResponse = connectors.fetch({
  url: 'https://my.sevdesk.de/api/v1/Invoice/Factory/saveInvoice',
  options: {
    method: 'POST',
    headers: {
      Authorization: apiKey,
      'Content-type': 'application/json'
    },
    body: requestBody
  }
});
console.log('invoiceResponse: ', invoiceResponse);
const newInvoiceId = invoiceResponse.body.objects.invoice.id;
console.log('newInvoiceId: ', newInvoiceId);
const newInvoicePos = invoiceResponse.body.objects.invoicePos;
console.log('newInvoicePos: ', newInvoicePos);
if (!newInvoiceId) {
  console.log('generating invoice failed');
  throw 'Error';
}
const resp = connectors.postgreSqlDatabase.insert({
  query: `insert into invoices (id, instanceid) values ('${newInvoiceId}', '${instanceId}')`,
});
data.postStepLogic = true;
}
