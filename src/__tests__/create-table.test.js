const dynadsl = require('../');

jest.setTimeout(30000)

test('create tabla', async () => {
  await dynadsl('willy-test').add({});
});