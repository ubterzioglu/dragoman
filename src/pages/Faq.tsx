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
  {
    q: {
      tr: "Dalış yapmak için sertifikam olması gerekiyor mu?",
      en: "Do I need a certification to go diving?",
      fr: "Ai-je besoin d'une certification pour plonger ?",
    },
    a: {
      tr: "Hayır. Hiç deneyimi olmayanlar için SSI Deneme Dalışı (€50) ile bir eğitmen eşliğinde güvenle ilk dalışınızı yapabilirsiniz. Sertifika almak isteyenler için SSI Open Water Diver kursu (€395) sunuyoruz. Sertifikalı dalgıçlar tek dalış veya 6/10/20'li dalış paketlerinden yararlanabilir.",
      en: "No. Beginners with no experience can take an SSI Try Scuba dive (€50) with an instructor for a safe first dive. For those who want to get certified, we offer the SSI Open Water Diver course (€395). Certified divers can choose single dives or 6/10/20-dive packages.",
      fr: "Non. Les débutants sans expérience peuvent faire un baptême SSI Try Scuba (50 €) avec un instructeur pour une première plongée en toute sécurité. Pour ceux qui souhaitent se certifier, nous proposons le cours SSI Open Water Diver (395 €). Les plongeurs certifiés peuvent choisir des plongées simples ou des forfaits de 6/10/20 plongées.",
    },
  },
  {
    q: {
      tr: "Dalış merkeziniz lisanslı ve sertifikalı mı?",
      en: "Is your dive center licensed and certified?",
      fr: "Votre centre de plongée est-il agréé et certifié ?",
    },
    a: {
      tr: "Evet. Dragoman, TSSF yetkili dalış merkezi (#32) ve SSI Diamond Center (#729285) statüsündedir. Eğitimlerimiz Türkçe, İngilizce, Fransızca ve Almanca olarak verilir. 21 metrelik Dragoman teknemiz ve Dragoman Junior emniyet teknemizle hizmet veriyoruz.",
      en: "Yes. Dragoman is a TSSF authorized dive center (#32) and an SSI Diamond Center (#729285). Our courses are offered in Turkish, English, French and German. We operate with our 21-metre Dragoman boat and our Dragoman Junior safety boat.",
      fr: "Oui. Dragoman est un centre de plongée agréé TSSF (#32) et un SSI Diamond Center (#729285). Nos cours sont proposés en turc, anglais, français et allemand. Nous opérons avec notre bateau Dragoman de 21 mètres et notre bateau de sécurité Dragoman Junior.",
    },
  },
  {
    q: {
      tr: "Dalış ekipmanı kiralayabilir miyim, yoksa kendi ekipmanımı mı getirmeliyim?",
      en: "Can I rent diving equipment, or should I bring my own?",
      fr: "Puis-je louer du matériel de plongée ou dois-je apporter le mien ?",
    },
    a: {
      tr: "İkisi de mümkün. Tüm ekipmanı bizden kiralayabilirsiniz; ekipmanlı dalış fiyatlarımız buna göre belirlenmiştir (örneğin ekipmanlı tek dalış €39). Kendi ekipmanınızı getirirseniz ekipmansız fiyatlardan yararlanırsınız (tek dalış €30). Nitrox tüp +€5 olarak mevcuttur.",
      en: "Both are possible. You can rent all equipment from us; our with-equipment dive prices reflect this (e.g. a single dive with equipment is €39). If you bring your own gear you benefit from our without-equipment prices (single dive €30). Nitrox tanks are available for +€5.",
      fr: "Les deux sont possibles. Vous pouvez louer tout le matériel chez nous ; nos tarifs avec équipement en tiennent compte (par exemple, une plongée simple avec équipement coûte 39 €). Si vous apportez votre propre matériel, vous bénéficiez de nos tarifs sans équipement (plongée simple 30 €). Les bouteilles Nitrox sont disponibles pour +5 €.",
    },
  },
  {
    q: {
      tr: "Kayak dışında hangi açık hava aktivitelerini sunuyorsunuz?",
      en: "What outdoor activities do you offer besides kayaking?",
      fr: "Quelles activités de plein air proposez-vous en plus du kayak ?",
    },
    a: {
      tr: "Kaş çevresinde rehberli yürüyüşler (Likya Yolu dahil), doğa içinde bisiklet turları, kayalık kıyıda coasteering (tırmanma, atlama ve yüzme) ve bunları birleştiren çoklu aktivite paketleri sunuyoruz. Ayrıca mavi turlar, günlük tekne turları ve kültür turları da düzenliyoruz.",
      en: "Around Kaş we offer guided hikes (including the Lycian Way), cycling tours through nature, coasteering along the rocky coast (climbing, jumping and swimming), and multi-sport packages combining these. We also run blue cruises, daily boat tours and culture tours.",
      fr: "Autour de Kaş, nous proposons des randonnées guidées (dont la Voie lycienne), des circuits à vélo en pleine nature, du coasteering le long de la côte rocheuse (escalade, sauts et nage) et des forfaits multisports combinant ces activités. Nous organisons également des croisières bleues, des excursions en bateau et des tours culturels.",
    },
  },
  {
    q: {
      tr: "Coasteering için özel bir kondisyon gerekiyor mu?",
      en: "Do I need to be especially fit for coasteering?",
      fr: "Faut-il une condition physique particulière pour le coasteering ?",
    },
    a: {
      tr: "Coasteering kayalık kıyı boyunca tırmanma, atlama ve yüzmeyi içerir; bu nedenle suda rahat olmanız ve makul bir kondisyona sahip olmanız önerilir. Rehberlerimiz rotayı grubun seviyesine göre ayarlar ve tüm güvenlik ekipmanını sağlar. Emin değilseniz, rezervasyondan önce bizimle iletişime geçin.",
      en: "Coasteering involves climbing, jumping and swimming along the rocky coast, so being comfortable in the water and reasonably fit is recommended. Our guides adapt the route to the group's level and provide all safety equipment. If you're unsure, contact us before booking.",
      fr: "Le coasteering implique de l'escalade, des sauts et de la nage le long de la côte rocheuse ; il est donc recommandé d'être à l'aise dans l'eau et raisonnablement en forme. Nos guides adaptent l'itinéraire au niveau du groupe et fournissent tout l'équipement de sécurité. En cas de doute, contactez-nous avant de réserver.",
    },
  },
  {
    q: {
      tr: "Konaklama ayarlıyor musunuz?",
      en: "Do you arrange accommodation?",
      fr: "Organisez-vous l'hébergement ?",
    },
    a: {
      tr: "Evet. Kaş merkezinde 3 yıldızlı otel konaklaması ile daha ekonomik 1 yıldızlı otel ve pansiyon seçenekleri ayarlayabiliyoruz. Aktivite ve konaklamayı birlikte planlamak isterseniz size uygun bir paket hazırlayalım.",
      en: "Yes. We can arrange 3-star hotel accommodation in central Kaş as well as more budget-friendly 1-star hotel and pension options. If you'd like to plan activities and accommodation together, we'll put together a package that suits you.",
      fr: "Oui. Nous pouvons organiser un hébergement en hôtel 3 étoiles au centre de Kaş ainsi que des options plus économiques en hôtel 1 étoile et pension. Si vous souhaitez planifier les activités et l'hébergement ensemble, nous vous préparerons un forfait adapté.",
    },
  },
  {
    q: {
      tr: "Dalaman veya Antalya havalimanından Kaş'a nasıl ulaşırım?",
      en: "How do I get to Kaş from Dalaman or Antalya airport?",
      fr: "Comment rejoindre Kaş depuis l'aéroport de Dalaman ou d'Antalya ?",
    },
    a: {
      tr: "Hem Dalaman Havalimanı – Kaş hem de Antalya Havalimanı – Kaş arası transfer hizmeti sunuyoruz. Uçuş bilgilerinizi paylaşırsanız sizin için transfer ayarlayalım. Lütfen havalimanı transferleri için önceden iletişime geçin.",
      en: "We provide transfer services for both Dalaman Airport – Kaş and Antalya Airport – Kaş. Share your flight details and we'll arrange the transfer for you. Please contact us in advance for airport transfers.",
      fr: "Nous proposons des services de transfert depuis l'aéroport de Dalaman – Kaş et l'aéroport d'Antalya – Kaş. Communiquez-nous vos informations de vol et nous organiserons le transfert pour vous. Veuillez nous contacter à l'avance pour les transferts aéroport.",
    },
  },
  {
    q: {
      tr: "Grupların büyüklüğü ne kadar ve hangi diller konuşuluyor?",
      en: "How big are the groups and what languages are spoken?",
      fr: "Quelle est la taille des groupes et quelles langues sont parlées ?",
    },
    a: {
      tr: "Grup büyüklüğümüz genellikle 8–12 kişidir; bu sayede güvenli ve kişisel bir deneyim sunarız. Tüm rehberlerimiz T.C. Kültür ve Turizm Bakanlığı lisanslıdır. Hizmetlerimiz Türkçe, İngilizce, Fransızca ve Almanca dillerinde verilebilir.",
      en: "Our groups are typically 8–12 people, allowing a safe and personal experience. All our guides are licensed by the Turkish Ministry of Culture and Tourism. Our services can be delivered in Turkish, English, French and German.",
      fr: "Nos groupes comptent généralement 8 à 12 personnes, ce qui permet une expérience sûre et personnalisée. Tous nos guides sont agréés par le ministère turc de la Culture et du Tourisme. Nos services peuvent être assurés en turc, anglais, français et allemand.",
    },
  },
  {
    q: {
      tr: "Özel veya kişiye özel turlar düzenliyor musunuz?",
      en: "Do you organise private or custom tours?",
      fr: "Organisez-vous des excursions privées ou sur mesure ?",
    },
    a: {
      tr: "Evet. Aileler, gruplar, kurumsal etkinlikler veya romantik kaçamaklar için tamamen size özel rotalar tasarlıyoruz. Özel rehber, esnek tarih ve süre seçenekleriyle bir günlük gezilerden çok günlü expedisyonlara kadar her isteğe uygun program hazırlıyoruz. Teklif için bizimle iletişime geçin.",
      en: "Yes. We design fully personalised routes for families, groups, corporate events or romantic getaways. With a private guide and flexible dates and duration, we create programmes for every request — from day trips to multi-day expeditions. Contact us for a quote.",
      fr: "Oui. Nous concevons des itinéraires entièrement personnalisés pour les familles, les groupes, les événements d'entreprise ou les escapades romantiques. Avec un guide privé et des dates et durées flexibles, nous créons des programmes pour chaque demande — des excursions d'une journée aux expéditions de plusieurs jours. Contactez-nous pour un devis.",
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
