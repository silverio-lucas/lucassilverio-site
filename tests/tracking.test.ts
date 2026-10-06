import test from 'node:test';
import assert from 'node:assert/strict';
import {metaEventFor, track} from '../lib/track.ts';
import {CONSENT_CHANGE_EVENT, CONSENT_KEY, parseConsent, readConsent, writeConsent} from '../lib/consent.ts';

type Call = unknown[];

function installFakeWindow() {
  const store = new Map<string, string>();
  const target = new EventTarget();
  const calls: {gtag: Call[]; fbq: Call[]; events: unknown[]} = {gtag: [], fbq: [], events: []};
  target.addEventListener(CONSENT_CHANGE_EVENT, event => calls.events.push((event as CustomEvent).detail));
  (globalThis as any).window = {
    localStorage: {getItem: (key: string) => store.get(key) ?? null, setItem: (key: string, value: string) => void store.set(key, value)},
    dispatchEvent: (event: Event) => target.dispatchEvent(event),
    gtag: (...args: unknown[]) => calls.gtag.push(args),
    fbq: (...args: unknown[]) => calls.fbq.push(args),
  };
  return {store, calls};
}

test('Meta receives standard events for WhatsApp clicks and for the sent request', () => {
  for (const event of ['whatsapp_navbar', 'whatsapp_navbar_mobile', 'whatsapp_cta_final', 'whatsapp_trafego']) {
    assert.deepEqual(metaEventFor(event), {standard: true, name: 'Contact'}, event);
  }
  assert.deepEqual(metaEventFor('whatsapp_pedido'), {standard: true, name: 'Lead'});
  for (const event of ['simulador_tipo', 'servico_simular', 'trafego_cta_simular', 'nav_click']) {
    assert.deepEqual(metaEventFor(event), {standard: false, name: event}, event);
  }
});

test('track sends the original name to GA4 and the mapped name to the Meta Pixel', () => {
  const {calls} = installFakeWindow();
  track('whatsapp_pedido', {tipo: 'site'});
  track('simulador_tipo', {tipo: 'trafego'});
  assert.deepEqual(calls.gtag, [['event', 'whatsapp_pedido', {tipo: 'site'}], ['event', 'simulador_tipo', {tipo: 'trafego'}]]);
  assert.deepEqual(calls.fbq, [['track', 'Lead', {tipo: 'site'}], ['trackCustom', 'simulador_tipo', {tipo: 'trafego'}]]);
});

test('track does nothing and does not throw when the tools were not loaded', () => {
  (globalThis as any).window = {};
  assert.doesNotThrow(() => track('whatsapp_navbar'));
});

test('cookie consent accepts only granted or denied and persists the choice', () => {
  assert.equal(parseConsent('granted'), 'granted');
  assert.equal(parseConsent('denied'), 'denied');
  for (const value of [null, undefined, '', 'true', 'GRANTED', 1, {}]) assert.equal(parseConsent(value), null);

  const {store, calls} = installFakeWindow();
  assert.equal(readConsent(), null);
  writeConsent('granted');
  assert.equal(store.get(CONSENT_KEY), 'granted');
  assert.equal(readConsent(), 'granted');
  writeConsent('denied');
  assert.equal(readConsent(), 'denied');
  assert.deepEqual(calls.events, ['granted', 'denied']);
  store.set(CONSENT_KEY, 'qualquer coisa');
  assert.equal(readConsent(), null);
});
