import { useState } from "react";
import { Seo } from "@/components/seo/Seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLang } from "@/hooks/useLang";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/site";

interface FaqItem {
  q: Record<Locale, string>;
  a: Record<Locale, string>;
}

const FAQS: FaqItem[] = [
  {
    q: {
      tr: "Deniz kayağı deneyimim olmasa da katılabilir miyim?",
      en: "Can I join if I have no sea kayaking experience?",
      fr: "Puis-je participer sans expérience en kayak de mer ?",
    },
    a: {
      tr: "Evet! Kekova Classic turu tamamen başlangıç dostudur. Suya girmeden önce kapsamlı bir kürek ve güvenlik brifingi yapıyoruz. Deneyimli rehberlerimiz tüm tur boyunca yanınızda.",
      en: "Yes! The Kekova Classic tour is fully beginner-friendly. We give a comprehensive paddling and safety briefing before you set off. Our experienced guides stay with you throughout the entire tour.",
      fr: "Oui ! L'excursion Kekova Classic est entièrement accessible aux débutants. Nous donnons un briefing complet sur la pagaie et la sécurité avant le départ. Nos guides expérimentés restent avec vous tout au long de l'excursion.",
    },
  },
  {
    q: {
      tr: "Yüzme bilmek zorunlu mu?",
      en: "Do I need to know how to swim?",
      fr: "Est-il nécessaire de savoir nager ?",
    },
    a: {
      tr: "Yüzme bilmeniz gerekmez, ancak kendinizi suda rahat hissedebilmeniz önerilir. Tüm katılımcılara can yeleği verilir ve can yeleklerinizi tüm tur boyunca giymeniz zorunludur.",
      en: "You don't need to be a strong swimmer, but feeling comfortable in the water is recommended. All participants receive a life jacket and must wear it throughout the tour.",
      fr: "Vous n'avez pas besoin d'être un nageur confirmé, mais être à l'aise dans l'eau est recommandé. Tous les participants reçoivent un gilet de sauvetage et doivent le porter tout au long de l'excursion.",
    },
  },
  {
    q: {
      tr: "Tura ne getirmeliyim?",
      en: "What should I bring on the tour?",
      fr: "Que dois-je apporter pour l'excursion ?",
    },
    a: {
      tr: "Güneş kremi, güneş gözlüğü, hafif uzun kollu giysi (güneş koruması için), şapka, spor sandalet veya su ayakkabısı, ıslak giysiler için yedek kıyafet ve su şişesi getirmenizi öneririz. Su geçirmez çantalar tarafımızca sağlanır.",
      en: "We recommend sunscreen, sunglasses, a light long-sleeved top for sun protection, a hat, sport sandals or water shoes, a change of clothes for after swimming, and a water bottle. Dry bags are provided by us.",
      fr: "Nous recommandons de la crème solaire, des lunettes de soleil, un haut léger à manches longues pour la protection solaire, un chapeau, des sandales de sport ou des chaussures aquatiques, des vêtements de rechange et une bouteille d'eau. Les sacs étanches sont fournis par nos soins.",
    },
  },
  {
    q: {
      tr: "Tura neler dahildir?",
      en: "What is included in the tour price?",
      fr: "Qu'est-ce qui est inclus dans le prix de l'excursion ?",
    },
    a: {
      tr: "Tüm turlarda: lisanslı rehber, kayak ve tam ekipman (can yeleği, kask, su geçirmez çanta, kürek, şnorkel), Kaş'tan gidiş-dönüş transfer ve öğle yemeği (Classic & West'te restoran, East'te piknik kutusu) dahildir.",
      en: "All tours include: a licensed guide, kayak and full equipment (life jacket, helmet, dry bag, paddle, snorkel gear), return transfers from Kaş, and lunch (restaurant for Classic & West, picnic box for East).",
      fr: "Toutes les excursions comprennent : un guide agréé, le kayak et l'équipement complet (gilet de sauvetage, casque, sac étanche, pagaie, matériel de snorkeling), les transferts aller-retour depuis Kaş et le déjeuner (restaurant pour Classic & West, panier-repas pour East).",
    },
  },
  {
    q: {
      tr: "Buluşma noktası neresi?",
      en: "Where is the meeting point?",
      fr: "Quel est le point de rendez-vous ?",
    },
    a: {
      tr: "Buluşma noktası Kaş Kral Mezarı (Kaş merkezinde, otoparklara yakın). Sabah 07:30'da buluşuyoruz. Kaş Yarımadası'ndaki oteller için transfer ayarlanabilir; ek ücret yoktur. Kalkan'dan transfer de mevcut (+€10).",
      en: "The meeting point is the Kaş King's Tomb in the town centre (close to the car parks). We meet at 07:30. Transfers can be arranged from hotels on the Kaş Peninsula at no extra cost. Kalkan transfers are also available (+€10).",
      fr: "Le point de rendez-vous est le tombeau du roi de Kaş, au centre-ville (près des parkings). Nous nous retrouvons à 07h30. Des transferts peuvent être organisés depuis les hôtels de la péninsule de Kaş sans frais supplémentaires. Les transferts depuis Kalkan sont également disponibles (+10 €).",
    },
  },
  {
    q: {
      tr: "Hava koşulları kötüyse tur iptal olur mu?",
      en: "What happens if the weather is bad?",
      fr: "Que se passe-t-il en cas de mauvais temps ?",
    },
    a: {
      tr: "Misafirlerimizin güvenliği her şeyden önce gelir. Deniz koşullarının tura uygun olmadığını düşündüğümüzde turu erteleriz veya iptal ederiz ve tam ücret iadesi yaparız. Kaş bölgesinde yıl boyunca güneşli hava hâkimdir; iptal oldukça nadirdir.",
      en: "Guest safety is our top priority. If we judge that sea conditions are unsuitable for the tour, we will reschedule or cancel and issue a full refund. The Kaş region enjoys excellent weather throughout the year — cancellations are very rare.",
      fr: "La sécurité de nos clients est notre priorité absolue. Si nous jugeons que les conditions en mer ne sont pas adaptées à l'excursion, nous la reprogrammons ou l'annulons avec un remboursement intégral. La région de Kaş bénéficie d'un temps excellent tout au long de l'année — les annulations sont très rares.",
    },
  },
  {
    q: {
      tr: "Çocuklar katılabilir mi? Yaş sınırı var mı?",
      en: "Can children join? Is there an age limit?",
      fr: "Les enfants peuvent-ils participer ? Y a-t-il une limite d'âge ?",
    },
    a: {
      tr: "Kekova Classic turuna 6 yaş ve üzeri çocuklar ebeveynleriyle birlikte katılabilir. Kekova West ve East turları orta/ileri seviye rotalar olduğu için 12 yaş ve üzeri önerilir. Tüm çocuklara uygun boyutta can yeleği sağlanır.",
      en: "Children aged 6 and above can join the Kekova Classic tour with their parents. The Kekova West and East tours are intermediate/advanced routes and are recommended for ages 12 and above. Correctly sized life jackets are provided for all children.",
      fr: "Les enfants de 6 ans et plus peuvent participer à l'excursion Kekova Classic avec leurs parents. Les excursions Kekova West et East sont des itinéraires intermédiaires/avancés et sont recommandées aux 12 ans et plus. Des gilets de sauvetage adaptés sont fournis pour tous les enfants.",
    },
  },
  {
    q: {
      tr: "Vejetaryen veya vegan seçeneğiniz var mı?",
      en: "Do you cater for vegetarians or vegans?",
      fr: "Proposez-vous des options végétariennes ou véganes ?",
    },
    a: {
      tr: "Evet. Rezervasyon sırasında diyet tercihlerinizi belirtmenizi rica ederiz. Classic ve West turlarında restoran öğle yemeğinde vejetaryen ve vegan seçenekler mevcuttur. East turunda piknik kutusunu da diyet tercihlerinize göre hazırlıyoruz.",
      en: "Yes. Please let us know your dietary requirements at the time of booking. Vegetarian and vegan options are available at the restaurant lunch on the Classic and West tours. For the East tour picnic box we can accommodate dietary preferences.",
      fr: "Oui. Veuillez nous communiquer vos préférences alimentaires au moment de la réservation. Des options végétariennes et véganes sont disponibles au déjeuner au restaurant pour les excursions Classic et West. Pour le panier-repas de l'excursion East, nous pouvons adapter selon vos préférences alimentaires.",
    },
  },
  {
    q: {
      tr: "İptal politikanız nedir?",
      en: "What is your cancellation policy?",
      fr: "Quelle est votre politique d'annulation ?",
    },
    a: {
      tr: "Tur tarihinden en az 48 saat önce yapılan iptallerde tam iade yapılır. 48 saatten az süre kala yapılan iptallerde ücretin %50'si iade edilir. Hava koşullarından kaynaklanan iptallerde tam iade yapılır.",
      en: "Cancellations made at least 48 hours before the tour date receive a full refund. Cancellations within 48 hours receive a 50% refund. Cancellations due to weather conditions receive a full refund.",
      fr: "Les annulations effectuées au moins 48 heures avant la date de l'excursion donnent lieu à un remboursement intégral. Les annulations dans les 48 heures donnent lieu à un remboursement de 50 %. Les annulations dues aux conditions météorologiques donnent lieu à un remboursement intégral.",
    },
  },
  {
    q: {
      tr: "Otelden veya havalimanından transfer sağlıyor musunuz?",
      en: "Do you offer hotel or airport transfers?",
      fr: "Proposez-vous des transferts depuis l'hôtel ou l'aéroport ?",
    },
    a: {
      tr: "Kaş merkezindeki oteller ve Kaş Yarımadası'ndaki konaklama yerleri için ücretsiz transfer sunuyoruz. Kalkan'dan transfer +€10 karşılığında mevcuttur. Havalimanı transferleri için lütfen önceden iletişime geçin.",
      en: "We offer complimentary transfers from hotels in central Kaş and the Kaş Peninsula. Transfers from Kalkan are available for an additional €10. For airport transfers, please contact us in advance.",
      fr: "Nous proposons des transferts gratuits depuis les hôtels du centre de Kaş et de la péninsule de Kaş. Les transferts depuis Kalkan sont disponibles pour 10 € supplémentaires. Pour les transferts aéroport, veuillez nous contacter à l'avance.",
    },
  },
];

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({ question, answer, isOpen, onToggle, index }: AccordionItemProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-teal/10 bg-white shadow-[0_4px_16px_rgba(1,68,57,0.06)]">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-teal-deep transition-colors hover:bg-foam"
        aria-expanded={isOpen}
        id={`faq-btn-${index}`}
        aria-controls={`faq-panel-${index}`}
      >
        <span>{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-teal transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div
          id={`faq-panel-${index}`}
          role="region"
          aria-labelledby={`faq-btn-${index}`}
          className="px-6 pb-5 text-sm leading-relaxed text-teal/70"
        >
          {answer}
        </div>
      )}
    </div>
  );
}

export default function Faq() {
  const { t, pick } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <Seo title={t("faq.title")} description={t("faq.subtitle")} />

      <Section>
        <SectionHeading
          eyebrow={t("faq.eyebrow")}
          title={t("faq.title")}
          subtitle={t("faq.subtitle")}
        />

        <div className="mt-2 max-w-3xl space-y-3">
          {FAQS.map((item, i) => (
            <AccordionItem
              key={i}
              index={i}
              question={pick(item.q)}
              answer={pick(item.a)}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
