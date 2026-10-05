import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateQuote, buildSummary, normalizeState} from '../lib/pricing.ts';

test('prices match the commercial offer, without charging measurement tools again', () => {
  for (const [pages, supabase, expected] of [[0,false,2000],[1,false,2400],[3,false,3200],[5,false,4000],[0,true,2500],[3,true,3700],[5,true,4500],[999,true,402100]]) {
    const quote = calculateQuote({pages, supabase});
    assert.equal(quote.total, expected, `${pages} pages, Supabase ${supabase}`);
    assert.equal(quote.totalPages, pages + 1);
    assert.ok(quote.scope.includes('Google Analytics, Meta Pixel e Microsoft Clarity'));
    assert.equal(quote.scope.includes('Integração com Supabase'), supabase);
  }
});

test('invalid input and stored state cannot produce negative or non-finite quotes', () => {
  for (const [value, expected] of [[-1,0],['',0],['hello',0],[NaN,0],[Infinity,0],[2.7,3],[1000,999],[null,0]]) {
    assert.equal(calculateQuote({pages:value}).pages, expected);
  }
  assert.equal(normalizeState({supabase:'false'}).supabase, false);
  assert.equal(normalizeState({projectName:'x'.repeat(500)}).projectName.length, 100);
  assert.deepEqual(normalizeState(null), {projectType:'site',projectName:'',landingGoal:'WhatsApp',thankYou:false,leadStorage:false,crm:false,adapted:0,newLanding:0,objective:'',segment:'',timeline:'',pages:0,supabase:false,googleBusiness:false,discovery:'descoberta',adBudget:0,trafficGoal:'whatsapp',hasSite:false,hasGoogleProfile:false,trafficCreatives:0,trafficPage:'nenhuma'});
});

test('Google Meu Negócio adds BRL 500 independently and appears in the scope and copied quote', () => {
  for (const [pages, supabase, expected] of [[0,false,2500],[0,true,3000],[3,false,3700],[3,true,4200]]) {
    const quote = calculateQuote({pages, supabase, googleBusiness:true});
    assert.equal(quote.total, expected);
    assert.equal(quote.googleBusinessCost, 500);
    assert.ok(quote.scope.includes('Configuração do Google Meu Negócio'));
    assert.equal(quote.totalPages, pages + 1);
  }
  const summary = buildSummary({pages:3,supabase:true,googleBusiness:true}).replaceAll('\u00a0',' ');
  assert.match(summary, /Configuração do Google Meu Negócio: R\$ 500,00/);
  assert.match(summary, /a partir de R\$ 4.200,00/);
  const previousDraft = {projectName:'Cliente',pages:3,supabase:true};
  assert.equal(normalizeState(previousDraft).googleBusiness, false);
  assert.equal(calculateQuote(previousDraft).total, 3700);
  assert.equal(normalizeState({googleBusiness:'true'}).googleBusiness, false);
  assert.equal(calculateQuote({googleBusiness:false}).googleBusinessCost, 0);
  assert.ok(!calculateQuote({googleBusiness:false}).scope.includes('Configuração do Google Meu Negócio'));
});

test('copied summary matches configured scope and explains estimate boundaries', () => {
  const summary = buildSummary({projectName:'Cliente Exemplo',pages:3,supabase:true}).replaceAll('\u00a0',' ');
  assert.match(summary, /Projeto: Cliente Exemplo/);
  assert.match(summary, /3 × R\$ 400,00 = R\$ 1.200,00/);
  assert.match(summary, /a partir de R\$ 3.700,00/);
  assert.match(summary, /Total: 4 páginas/);
  assert.match(summary, /Google Analytics, Meta Pixel e Microsoft Clarity/);
  assert.match(summary, /Domínio, hospedagem, manutenção/);
  assert.match(buildSummary({}), /Supabase: não incluída/);
});

test('project tabs use the correct base price and preserve additions', () => {
  assert.equal(calculateQuote({projectType:'site'}).total,2000);
  assert.equal(calculateQuote({projectType:'landing'}).total,1200);
  assert.equal(calculateQuote({projectType:'landing',pages:3,supabase:true,googleBusiness:true}).total,1200);
  assert.equal(calculateQuote({projectType:'site',pages:3,supabase:true,googleBusiness:true}).total,4200);
  assert.equal(normalizeState({}).projectType,'site');
  const summary=buildSummary({projectType:'landing'}).replaceAll('\u00a0',' ');
  assert.match(summary,/Landing page: R\$ 1.200,00/);
  assert.ok(!summary.includes('Site institucional'));
});

test('landing-only options stay isolated and CRM avoids duplicate lead storage', () => {
 assert.equal(calculateQuote({projectType:'landing',thankYou:true,crm:true}).total,1900);
 assert.equal(calculateQuote({projectType:'landing',thankYou:true,crm:true,leadStorage:true}).total,1900);
 assert.equal(calculateQuote({projectType:'landing',leadStorage:true}).total,1700);
 assert.equal(calculateQuote({projectType:'landing',adapted:2,newLanding:1,thankYou:true}).total,3800);
 assert.equal(calculateQuote({projectType:'site',adapted:2,newLanding:1,thankYou:true,crm:true,leadStorage:true}).total,2000);
 const summary=buildSummary({projectType:'landing',supabase:true,googleBusiness:true,crm:true});
 assert.ok(!summary.includes('Supabase'));assert.ok(!summary.includes('Google Meu Negócio'));
 assert.match(summary,/duas rodadas/i);assert.match(summary,/Textos e imagens fornecidos pelo cliente/);
});

test('traffic scope states who produces the creatives and matches the monthly count', () => {
  const none = calculateQuote({projectType:'trafego'});
  assert.ok(none.scope.includes('Criativos (imagens e vídeos) fornecidos por você'));
  assert.ok(!none.scope.some(item => item.includes('orçados à parte')));
  assert.ok(calculateQuote({projectType:'trafego',trafficCreatives:1}).scope.includes('1 criativo produzido por mim a cada mês'));
  const three = calculateQuote({projectType:'trafego',trafficCreatives:3});
  assert.ok(three.scope.includes('3 criativos produzidos por mim a cada mês'));
  assert.equal(three.creativesCost, 900);
});
