import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = (await readFile(new URL('../js/form.js', import.meta.url), 'utf8')).replace('export function', 'function');
function setup(fetchImplementation, { valid = true, bot = false } = {}) {
  let submit;
  let resets = 0;
  let timeout;
  const button = { innerHTML: 'Send message', disabled: false };
  const status = { dataset: {}, textContent: '' };
  const attrs = {};
  const form = {
    elements: { name: { value: 'Test Visitor' }, message: { value: 'A sufficiently long test message.' }, botcheck: { checked: bot } },
    action: 'https://example.test/contact',
    querySelector: selector => selector.startsWith('button') ? button : status,
    reportValidity: () => valid,
    addEventListener: (_event, handler) => { submit = handler; },
    setAttribute: (name, value) => { attrs[name] = value; },
    removeAttribute: name => { delete attrs[name]; },
    reset: () => { resets++; },
  };
  class FormPayload extends FormData { constructor() { super(); this.set('access_key', 'test-key'); } }
  const context = vm.createContext({ document: { querySelector: () => form }, FormData: FormPayload, fetch: fetchImplementation, AbortController, setTimeout: callback => { timeout = callback; return 1; }, clearTimeout: () => {} });
  vm.runInContext(`${source}\ninitContactForm();`, context);
  return { submit: () => submit({ preventDefault() {} }), button, status, form, attrs, resets: () => resets, timeout: () => timeout() };
}

test('success sends one key, resets only after acceptance, and restores the button', async () => {
  let payload;
  const ui = setup(async (_url, options) => { payload = options.body; return { ok: true, json: async () => ({ success: true }) }; });
  await ui.submit();
  assert.deepEqual(payload.getAll('access_key'), ['test-key']);
  assert.match(payload.get('subject'), /Test Visitor/);
  assert.equal(ui.resets(), 1);
  assert.equal(ui.status.dataset.state, 'success');
  assert.equal(ui.button.disabled, false);
  assert.equal(ui.attrs['aria-busy'], undefined);
});
test('HTTP error never becomes success, even with a success-shaped body', async () => {
  const ui = setup(async () => ({ ok: false, json: async () => ({ success: true }) }));
  await ui.submit();
  assert.equal(ui.resets(), 0);
  assert.equal(ui.status.dataset.state, 'error');
  assert.match(ui.status.textContent, /message is still here/);
  assert.equal(ui.button.disabled, false);
});
test('network and malformed response failures preserve the message for retry', async () => {
  for (const fetcher of [async () => { throw new Error('Offline'); }, async () => ({ ok: true, json: async () => { throw new SyntaxError('Not JSON'); } })]) {
    const ui = setup(fetcher);
    await ui.submit();
    assert.equal(ui.resets(), 0);
    assert.equal(ui.status.dataset.state, 'error');
    assert.equal(ui.button.disabled, false);
  }
});
test('duplicate submits cannot send a second request while one is in flight', async () => {
  let calls = 0;
  let resolveFetch;
  const ui = setup(() => { calls++; return new Promise(resolve => { resolveFetch = resolve; }); });
  const pending = ui.submit();
  await ui.submit();
  assert.equal(calls, 1);
  assert.equal(ui.button.disabled, true);
  resolveFetch({ ok: true, json: async () => ({ success: true }) });
  await pending;
  assert.equal(ui.button.disabled, false);
});
test('timeout reports uncertain delivery and preserves user input', async () => {
  const ui = setup((_url, { signal }) => new Promise((_resolve, reject) => signal.addEventListener('abort', () => reject(Object.assign(new Error('Timeout'), { name: 'AbortError' })))));
  const pending = ui.submit();
  ui.timeout();
  await pending;
  assert.match(ui.status.textContent, /could not be confirmed/);
  assert.equal(ui.resets(), 0);
  assert.equal(ui.button.disabled, false);
});
test('invalid, bot, and whitespace-only submissions never call the provider', async () => {
  let calls = 0;
  const fetcher = async () => { calls++; throw new Error('Should not send'); };
  for (const options of [{ valid: false }, { bot: true }]) await setup(fetcher, options).submit();
  const ui = setup(fetcher);
  ui.form.elements.name.value = '   ';
  await ui.submit();
  assert.equal(calls, 0);
});
