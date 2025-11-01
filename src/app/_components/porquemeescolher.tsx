import { Shield, Award, Headphones, CreditCard } from "lucide-react";
const features = [
  {
    icon: Shield,
    title: "Garantia Completa",
    description: "Todos os veículos com garantia e procedência verificada",
  },
  {
    icon: Award,
    title: "Qualidade Certificada",
    description: "Inspeção rigorosa em todos os veículos do nosso estoque",
  },
  {
    icon: Headphones,
    title: "Atendimento Premium",
    description: "Equipe especializada para te ajudar em cada etapa",
  },
  {
    icon: CreditCard,
    title: "Financiamento Facilitado",
    description: "Melhores taxas e condições especiais de pagamento",
  },
];

export default function PorqueMeEscolher() {
  return (
    <>
    <section className="py-0 bg-accent/30 flex flex-col items-center sm:gap-5">
        <h1 className="pt-10 text-2xl sm:text-3xl font-extrabold uppercase">Por que <span className="text-rose-500">me Escolher?</span></h1>
        <h2 className="pb-10 sm:pb-0 text-gray-500 px-10">Mais do que vender carros, te ofereço uma experiência completa</h2>
      <div className="flex justify-center container px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card p-8 border-[oklch(.65_.18_45)] rounded-2xl border border-border sm:border-gray-500
                         transition-all duration-300
                         w-60
                         hover:shadow-lg sm:hover:border-[oklch(.65_.18_45)]"
            >
              {/* Ícone com fundo escuro e hover colorido */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6
                            bg-[#cd3e0024] transition-all duration-300
                            sm:group-hover:bg-[oklch(.65_.18_45)]/20"
                >

                <feature.icon className="w-7 h-7 text-[oklch(.65_.18_45)]" />
              </div>

              {/* Título */}
              <h3 className="text-lg font-semibold mb-3">
                {feature.title}
              </h3>

              {/* Descrição */}
              <p className="text-sm text-muted-foreground leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
