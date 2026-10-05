import test from 'node:test';
import assert from 'node:assert/strict';
import {isValidContact, normalizeClient, buildRequest} from '../lib/request.ts';

test('request accepts phone with DDD or email and rejects incomplete contact', () => {
  for (const value of ['(31) 99999-9999','+55 31 99999-9999','cliente@example.com']) assert.ok(isValidContact(value));
  for (const value of ['', '123', 'ligue amanhã', 'cliente@', '99999-9999']) assert.equal(isValidContact(value),false);
  assert.throws(()=>buildRequest({}, {name:'Ana',contact:'123'}));
  assert.throws(()=>buildRequest({}, {name:' ',contact:'cliente@example.com'}));
});

test('client request combines contact details with current quote and selected scope', () => {
  const text=buildRequest({pages:3,supabase:true,googleBusiness:true}, {name:'  Ana  Silva ',contact:'cliente@example.com',company:'Empresa Exemplo',notes:'Quero apresentar meus serviços.'}).replaceAll('\u00a0',' ');
  assert.match(text,/Nome: Ana Silva/);
  assert.match(text,/Contato: cliente@example.com/);
  assert.match(text,/Projeto: Empresa Exemplo/);
  assert.match(text,/a partir de R\$ 4.200,00/);
  assert.match(text,/Configuração do Google Meu Negócio: R\$ 500,00/);
  assert.match(text,/Quero apresentar meus serviços\./);
  assert.match(text,/sem contratação ou cobrança automática/);
  assert.equal(normalizeClient({name:'Ana\nSilva'}).name,'Ana Silva');
  assert.equal(normalizeClient({notes:'x'.repeat(1200)}).notes.length,1000);
});
