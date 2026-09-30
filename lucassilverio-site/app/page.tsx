'use client'

import { useState } from 'react'
import { ChevronRight, Phone, Mail, Check } from 'lucide-react'

export default function Home() {
  const [activeService, setActiveService] = useState('site')

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">Lucas Silvério</div>
            <button className="rounded-lg bg-white px-6 py-2 text-black font-medium hover:bg-neutral-100 transition">
              Chamar no WhatsApp
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Sua empresa encontrada, apresentada e escolhida
              </h1>
              <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
                Sites estratégicos, landing pages focadas em conversão e gestão de tráfego pago
              </p>
              <div className="flex gap-4">
                <button className="rounded-lg bg-white px-8 py-3 text-black font-medium hover:bg-neutral-100 transition inline-flex items-center gap-2">
                  Simular orçamento
                  <ChevronRight size={20} />
                </button>
                <button className="rounded-lg border border-neutral-700 px-8 py-3 font-medium hover:bg-neutral-900 transition">
                  Ver processo
                </button>
              </div>
            </div>
            <div className="bg-neutral-900 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center text-neutral-600">
                <div className="text-sm mb-2">Foto profissional</div>
                <div className="text-xs">960 × 1200 px</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Seu site pode estar afastando clientes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Site lento', description: 'Quem espera a página no celular vai para o concorrente.' },
              { title: 'Visual antigo', description: 'Um site desatualizado faz sua empresa parecer desatualizada também.' },
              { title: 'Sem estratégia', description: 'Sem clareza sobre o que oferece, o visitante não entende o que fazer.' },
              { title: 'Sem conversão', description: 'Muita visita, pouco contato. Falta um caminho claro via WhatsApp.' },
              { title: 'Sem acompanhamento', description: 'Sem dados, você não sabe onde vêm os clientes nem o que ajustar.' },
              { title: 'Sem automação', description: 'Controles que chegam soltos e processos manuais tomam seu tempo.' },
            ].map((item, i) => (
              <div key={i} className="border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition">
                <div className="w-8 h-8 rounded-full bg-red-900 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Mais do que um site</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Presença profissional', description: 'Design moderno que transmite credibilidade' },
              { icon: '❤️', title: 'Mais confiança', description: 'Textos que ajudam o visitante a decidir por você.' },
              { icon: '⚡', title: 'Carregamento rápido', description: 'Desempenho otimizado no Core Web Vitals do Google.' },
              { icon: '💬', title: 'WhatsApp integrado', description: 'Um ponto de contato claro na página.' },
              { icon: '📊', title: 'Medição incluída', description: 'Analytics, Pixel e Clarity em todo site, desde o início.' },
              { icon: '📈', title: 'Estrutura preparada para crescer', description: 'Pronto para landing pages, tráfego pago e otimização.' },
            ].map((item, i) => (
              <div key={i} className="border border-neutral-800 rounded-lg p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="border-b border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Serviços</h2>
            <p className="text-neutral-400">Do site ao anúncio, conforme o momento do seu negócio</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Site Institucional */}
            <div className="border border-neutral-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Site institucional</h3>
              <p className="text-neutral-400 mb-6">Para apresentar a empresa, os serviços e os canais de contato.</p>
              <div className="text-4xl font-bold mb-8">
                <span className="text-2xl">a partir de</span>
                <br />
                R$ 2.000
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Página principal completa',
                  'Páginas internas: + R$ 400 cada',
                  'Integração WhatsApp',
                  'Analytics, Pixel e Clarity',
                  'SEO básico'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full rounded-lg border border-neutral-700 py-3 font-medium hover:bg-neutral-900 transition">
                Simular este orçamento
              </button>
            </div>

            {/* Landing Page */}
            <div className="border border-neutral-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Landing page</h3>
              <p className="text-neutral-400 mb-6">Para uma oferta ou campanha, com uma ação principal clara.</p>
              <div className="text-4xl font-bold mb-8">
                <span className="text-2xl">a partir de</span>
                <br />
                R$ 1.200
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Uma página focada em uma oferta',
                  'Ação principal: WhatsApp, leads ou checkout',
                  'Formulário de até 5 campos',
                  'Analytics, Pixel e Clarity',
                  'Duas rodadas de ajustes'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full rounded-lg border border-neutral-700 py-3 font-medium hover:bg-neutral-900 transition">
                Simular este orçamento
              </button>
            </div>

            {/* Gestão de Tráfego */}
            <div className="border border-neutral-800 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Gestão de tráfego</h3>
              <p className="text-neutral-400 mb-6">Para quem já tem uma boa página e quer levar gente até ela.</p>
              <div className="text-4xl font-bold mb-8">
                <span className="text-2xl">a partir de</span>
                <br />
                R$ 1.000 <span className="text-lg">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Meta Ads para uma oferta principal',
                  'Campanhas, públicos e acompanhamento',
                  'Relatório mensal do que entrou e do que voltou',
                  'Criativos: você envia ou eu produzo',
                  'Compromisso mínimo de 3 meses'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check size={16} className="text-green-600 mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="w-full rounded-lg border border-neutral-700 py-3 font-medium hover:bg-neutral-900 transition">
                Simular este orçamento
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-b border-neutral-800">
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Vamos conversar sobre o seu site?</h2>
          <p className="text-neutral-400 mb-8">Me chame no WhatsApp ou simule seu orçamento agora. Sem compromisso.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="rounded-lg bg-white px-8 py-3 text-black font-medium hover:bg-neutral-100 transition">
              Chamar no WhatsApp
            </button>
            <button className="rounded-lg border border-neutral-700 px-8 py-3 font-medium hover:bg-neutral-900 transition">
              Simular orçamento
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-neutral-500 text-sm">© 2026 Lucas Silvério. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
