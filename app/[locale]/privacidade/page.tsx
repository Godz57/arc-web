import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { getSiteUrl, seoCopy } from "@/lib/seo";
import { siteContact } from "@/lib/data";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a ARC WEB trata dados pessoais coletados pelo site, formulário de contato e analytics.",
  alternates: { canonical: "/privacidade" },
  openGraph: {
    title: "Política de Privacidade | ARC WEB",
    description:
      "Transparência sobre cookies, formulário de contato e ferramentas de medição no site da ARC WEB.",
    url: "/privacidade",
  },
};

const updated = "11 de julho de 2026";

export default function PrivacidadePage({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);
  const siteUrl = getSiteUrl();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="font-orbitron text-[10px] uppercase tracking-[0.28em] text-hud-cyan/70">
        Legal · ARC WEB
      </p>
      <h1 className="mt-3 font-orbitron text-3xl font-bold text-chrome text-glow-chrome md:text-4xl">
        Política de Privacidade
      </h1>
      <p className="mt-3 font-rajdhani text-sm text-arc-blue/50">
        Última atualização: {updated}
      </p>

      <div className="mt-10 space-y-8 font-rajdhani text-base leading-relaxed text-arc-blue/75">
        <section className="space-y-3">
          <h2 className="font-orbitron text-lg font-semibold text-chrome">
            1. Quem somos
          </h2>
          <p>
            A <strong className="text-arc-blue/90">ARC WEB</strong> (
            <a
              href={siteUrl}
              className="text-hud-cyan underline-offset-2 hover:underline"
            >
              {siteUrl.replace(/^https?:\/\//, "")}
            </a>
            ) é um estúdio de desenvolvimento web. Responsável pelo tratamento:
            Gabriel Almeida — contato:{" "}
            <a
              href={`mailto:${siteContact.email}`}
              className="text-hud-cyan underline-offset-2 hover:underline"
            >
              {siteContact.email}
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-orbitron text-lg font-semibold text-chrome">
            2. Quais dados coletamos
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-arc-blue/90">Formulário de contato:</strong>{" "}
              nome, e-mail, tipo de projeto e mensagem que você envia.
            </li>
            <li>
              <strong className="text-arc-blue/90">WhatsApp:</strong> se você
              clicar para conversar, a conversa ocorre no app da Meta; não
              armazenamos o histórico no site.
            </li>
            <li>
              <strong className="text-arc-blue/90">Dados de navegação:</strong>{" "}
              páginas visitadas, dispositivo, origem aproximada do tráfego e
              eventos (ex.: envio de formulário), via Google Analytics 4 e
              Google Tag Manager.
            </li>
            <li>
              <strong className="text-arc-blue/90">Publicidade (quando ativa):</strong>{" "}
              se você chega por anúncios Google Ads, cookies/identificadores
              podem ser usados para medir conversões e otimizar campanhas.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-orbitron text-lg font-semibold text-chrome">
            3. Para que usamos
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Responder pedidos de briefing e orçamento</li>
            <li>Entregar e melhorar serviços de desenvolvimento web</li>
            <li>Medir desempenho do site e campanhas de marketing</li>
            <li>Cumprir obrigações legais quando aplicável</li>
          </ul>
          <p>
            Base legal principal (LGPD): execução de medidas pré-contratuais a
            pedido do titular e legítimo interesse em analytics/segurança, com
            minimização de dados.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-orbitron text-lg font-semibold text-chrome">
            4. Cookies e ferramentas de terceiros
          </h2>
          <p>Utilizamos, entre outras:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Google Analytics 4 (medição de audiência e eventos)</li>
            <li>Google Tag Manager (gestão de tags)</li>
            <li>Google Ads (quando houver campanhas ativas)</li>
            <li>Web3Forms / provedor de formulário (envio da mensagem)</li>
          </ul>
          <p>
            Você pode bloquear cookies no navegador; isso pode limitar
            funcionalidades de medição. Políticas dos provedores:{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-hud-cyan underline-offset-2 hover:underline"
            >
              Google Privacy
            </a>
            .
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-orbitron text-lg font-semibold text-chrome">
            5. Compartilhamento
          </h2>
          <p>
            Não vendemos dados pessoais. Compartilhamos apenas com processadores
            necessários (hospedagem, e-mail/formulário, analytics/ads) sob
            obrigação de confidencialidade e conforme a finalidade acima.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-orbitron text-lg font-semibold text-chrome">
            6. Retenção e segurança
          </h2>
          <p>
            Mensagens de contato são mantidas pelo tempo necessário para
            atendimento e eventual relação comercial. Dados de analytics seguem
            as retenções configuradas no Google Analytics. Adotamos medidas
            razoáveis de segurança (HTTPS, controle de acesso).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-orbitron text-lg font-semibold text-chrome">
            7. Seus direitos (LGPD)
          </h2>
          <p>
            Você pode solicitar confirmação de tratamento, acesso, correção,
            anonimização, portabilidade ou eliminação dos dados, quando
            cabível, pelo e-mail{" "}
            <a
              href={`mailto:${siteContact.email}`}
              className="text-hud-cyan underline-offset-2 hover:underline"
            >
              {siteContact.email}
            </a>
            . Também pode reclamar à ANPD.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-orbitron text-lg font-semibold text-chrome">
            8. Contato
          </h2>
          <p>
            Dúvidas sobre privacidade:{" "}
            <a
              href={`mailto:${siteContact.email}`}
              className="text-hud-cyan underline-offset-2 hover:underline"
            >
              {siteContact.email}
            </a>
            . Site:{" "}
            <a
              href={siteUrl}
              className="text-hud-cyan underline-offset-2 hover:underline"
            >
              {seoCopy.title}
            </a>
            .
          </p>
        </section>
      </div>

      <p className="mt-14 border-t border-hud-cyan/10 pt-8 font-rajdhani text-sm text-arc-blue/45">
        <Link
          href="/#contact"
          className="text-hud-cyan transition-colors hover:text-chrome"
        >
          ← Voltar ao contato
        </Link>
      </p>
    </article>
  );
}
