import test from 'node:test';
import assert from 'node:assert/strict';
import {PROJECTS, PORTFOLIO_URL} from '../lib/portfolio.ts';
import {buildQuoteLine, buildSummary, calculateQuote, recommendTraffic} from '../lib/pricing.ts';

test('portfolio projects have unique ids, https links and complete text', () => {
  assert.ok(PROJECTS.length >= 1);
  assert.equal(new Set(PROJECTS.map(project => project.id)).size, PROJECTS.length);
  for (const project of PROJECTS) {
    for (const key of ['id', 'name', 'segment', 'type', 'description', 'url', 'host'] as const) assert.ok(project[key]?.trim(), `${project.id}: ${key}`);
    assert.ok(project.url.startsWith('https://'));
    assert.equal(new URL(project.url).hostname, project.host);
  }
  assert.ok(PORTFOLIO_URL.startsWith('https://'));
});

test('quote line summarizes type, pages and total for the request dialog', () => {
  const line = (input: unknown) => buildQuoteLine(input).replaceAll('\u00a0', ' ');
  assert.equal(line({}), 'Site institucional · 1 página · a partir de R$ 2.000');
  assert.equal(line({pages: 3, supabase: true}), 'Site institucional · 4 páginas · a partir de R$ 3.700');
  assert.equal(line({projectType: 'landing'}), 'Landing page · 1 página · a partir de R$ 1.200');
  assert.equal(line({projectType: 'landing', thankYou: true, adapted: 2}), 'Landing page · 4 páginas · a partir de R$ 2.600');
});

test('WhatsApp destination is the authorized number', async () => {
  const {buildWhatsAppURL} = await import('../lib/request.ts');
  assert.ok(buildWhatsAppURL('oi').startsWith('https://wa.me/5531987638437?text='));
});

test('traffic matrix recommends channels by discovery and budget', () => {
  const r = (discovery: string, budget: number) => recommendTraffic(discovery as never, budget);
  // micro (até 1.500)
  assert.equal(r('descoberta', 800).setup, 'single');
  assert.match(r('descoberta', 1500).channels, /Somente Meta/);
  assert.equal(r('busca', 1500).setup, 'single');
  assert.match(r('busca', 900).channels, /Google Ads no início/);
  assert.match(r('busca', 900).channels, /remarketing/);
  // ambos no micro e qualquer caso médio -> combinado
  assert.equal(r('ambos', 1000).setup, 'combined');
  assert.equal(r('descoberta', 3000).setup, 'combined');
  assert.equal(r('busca', 5000).setup, 'combined');
  // alto (acima de 5.000) -> sob orçamento, sem valor fechado
  assert.equal(r('ambos', 5001).setup, 'custom');
  assert.equal(r('descoberta', 20000).fee, null);
  // mensalidades
  assert.equal(r('descoberta', 800).fee, 1000);
  assert.equal(r('ambos', 3000).fee, 1800);
});

test('traffic quote separates management fee, ad budget, creatives and one-off page', () => {
  const q = (input: unknown) => calculateQuote({projectType: 'trafego', ...(input as object)});
  // gestão 1000 + verba 1000 + 2 criativos (600) = 2600
  const a = q({discovery: 'descoberta', adBudget: 1000, trafficCreatives: 2});
  assert.equal(a.monthlyFee, 1000);
  assert.equal(a.creativesCost, 600);
  assert.equal(a.monthlyTotal, 2600);
  assert.equal(a.setupCost, 0);
  // combinado + landing page: mensal 1800+3000 = 4800, inicial 1200
  const b = q({discovery: 'ambos', adBudget: 3000, trafficPage: 'landing'});
  assert.equal(b.monthlyFee, 1800);
  assert.equal(b.monthlyTotal, 4800);
  assert.equal(b.setupCost, 1200);
  assert.equal(b.total, 1200);
  // sob orçamento não fecha total
  const c = q({discovery: 'ambos', adBudget: 9000});
  assert.equal(c.monthlyFee, null);
  assert.equal(c.monthlyTotal, null);
  // entradas inválidas não quebram
  assert.equal(q({adBudget: -5}).adBudget, 0);
  assert.equal(q({adBudget: 'abc'}).adBudget, 0);
  assert.equal(q({trafficCreatives: 99}).trafficCreatives, 20);
  assert.equal(calculateQuote({}).monthlyTotal, 0);
});

test('traffic summary lists the answers, the recommendation and each cost separately', () => {
  const text = buildSummary({projectType: 'trafego', discovery: 'busca', adBudget: 1200, trafficGoal: 'ligacoes', hasSite: false, hasGoogleProfile: true, trafficCreatives: 1, trafficPage: 'landing'}).replaceAll('\u00a0', ' ');
  assert.match(text, /Como meus clientes me encontram: Procuram ativamente/);
  assert.match(text, /Verba mensal para anúncios: R\$ 1\.200,00/);
  assert.match(text, /Objetivo principal: Ligações telefônicas/);
  assert.match(text, /Já tenho Perfil da Empresa no Google: sim/);
  assert.match(text, /RECOMENDAÇÃO \(estimativa, sujeita a diagnóstico\)/);
  assert.match(text, /Gestão mensal: R\$ 1\.000,00/);
  assert.match(text, /Verba de anúncios \(paga por você à plataforma\): R\$ 1\.200,00 por mês/);
  assert.match(text, /Criativos: 1 × R\$ 300,00 = R\$ 300,00 por mês/);
  assert.match(text, /TOTAL MENSAL ESTIMADO: R\$ 2\.500,00/);
  assert.match(text, /TOTAL INICIAL \(uma única vez\): R\$ 1\.200,00/);
  assert.match(text, /Compromisso mínimo de 3 meses/);
  // sob orçamento: nunca inventa total
  const alto = buildSummary({projectType: 'trafego', discovery: 'ambos', adBudget: 9000});
  assert.match(alto, /Gestão mensal: sob orçamento/);
  assert.match(alto, /TOTAL MENSAL: sob orçamento/);
  assert.doesNotMatch(alto, /TOTAL MENSAL ESTIMADO/);
});

test('traffic quote line shows monthly and setup', () => {
  const line = (i: unknown) => buildQuoteLine({projectType: 'trafego', ...(i as object)}).replaceAll('\u00a0', ' ');
  assert.equal(line({discovery: 'descoberta', adBudget: 1000}), 'Gestão de tráfego · a partir de R$ 2.000/mês');
  assert.equal(line({discovery: 'ambos', adBudget: 9000}), 'Gestão de tráfego · gestão sob orçamento');
  assert.equal(line({discovery: 'descoberta', adBudget: 1000, trafficPage: 'site'}), 'Gestão de tráfego · a partir de R$ 2.000/mês · + R$ 2.000 de entrada');
});
