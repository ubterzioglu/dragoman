import type { Locale } from "@/lib/site";

export type Localized<T> = Record<Locale, T>;

/** A single label/value fact (e.g. Duration → "5 nights 6 days"). */
export interface ServiceFact {
  label: Localized<string>;
  value: Localized<string>;
}

/**
 * One offering (a tour, hotel or transfer). `facts` are the short label/value
 * pairs shown in a grid; `price` is the published figure as a string
 * ("50 €" or "Please contact us"); `body` is the long description.
 */
export interface ServiceItem {
  title: Localized<string>;
  facts?: ServiceFact[];
  price?: Localized<string>;
  body?: Localized<string>;
}

/** A titled group of related offerings (e.g. "Hiking", "Biking Tours"). */
export interface ServiceCategory {
  title: Localized<string>;
  items: ServiceItem[];
  /** Optional footnotes shown under the category (min participants, etc.). */
  notes?: Localized<string>[];
}

const T = (tr: string, en: string, fr: string): Localized<string> => ({ tr, en, fr });

/** "Please contact us" price, reused across items without a fixed price. */
const CONTACT = T("Lütfen bizimle iletişime geçin", "Please contact us", "Veuillez nous contacter");

/**
 * Outdoor activities content, sourced verbatim from dragoman-turkey.com
 * (/outdoor-activities). English is as published; Turkish and French are
 * translations. Prices in EUR as published — never invented.
 */
export const OUTDOOR_ACTIVITIES: ServiceCategory[] = [
  {
    title: T("Çoklu Aktivite Turları", "Multi-sports Activities", "Activités multisports"),
    items: [
      {
        title: T("Doğaya Dönüş", "Back to Nature", "Retour à la nature"),
        facts: [
          {
            label: T("Aktiviteler", "Activities", "Activités"),
            value: T("Yürüyüş, Bisiklet, Deniz Kayağı", "Hiking, Biking, Sea Kayaking", "Randonnée, vélo, kayak de mer"),
          },
          {
            label: T("Süre", "Duration", "Durée"),
            value: T("3 gece 4 gün", "3 nights 4 days", "3 nuits 4 jours"),
          },
        ],
        price: CONTACT,
        body: T(
          "Akdeniz kıyısındaki bu güzel bölgenin en çarpıcı kesimlerinde yürüyerek, bisiklet sürerek ve kürek çekerek kendi motorunuz olun. Antik Likya uygarlığı kalıntılarının yanında kamp kuracağınız, gündüzün sıcağında olduğu gibi gecenin en sakin anında da kristal berraklığındaki denizin tadını çıkaracağınız 4 günlük çoklu aktivite macerasıyla tarihe dalın. İki tanesi sular altında olan beş farklı Likya kentini keşfedin: Kekova'nın antik batık şehri boyunca kürek çekin ya da ailenizle veya arkadaşlarınızla güzel bir yürüyüşün ardından Aperlai kalıntıları boyunca şnorkelle dalış yapın. Şehir hayatının koşuşturmasından kaçış garanti.",
          "Be your own engine hiking, biking and paddling your way through the most stunning parts of this beautiful region on the Mediterranean Sea. Immerse yourself in history with our 4-day multi-activity outdoor adventure where you will camp next to ancient Lycian civilization sites and enjoy the refreshing crystal-clear sea during the heat of the day as well as at its calmest at night. Explore five different Lycian cities, two of which are sunken: paddle along the ancient sunken city of Kekova or treat yourself to a snorkel along the ruins of Aperlai after a beautiful hike with your family or friends. Seclusion and refuge from the hustle and bustle of city life and modern-day civilization is guaranteed.",
          "Soyez votre propre moteur en randonnée, à vélo et en pagayant à travers les plus beaux endroits de cette magnifique région bordant la mer Méditerranée. Plongez dans l'histoire avec notre aventure multi-activités de 4 jours où vous camperez près de sites antiques de la civilisation lycienne et profiterez de la mer cristalline et rafraîchissante pendant la chaleur du jour comme dans son calme nocturne. Explorez cinq cités lyciennes différentes, dont deux englouties : pagayez le long de l'ancienne cité engloutie de Kekova ou offrez-vous une session de snorkeling le long des ruines d'Aperlai après une belle randonnée en famille ou entre amis. L'isolement et le refuge loin de l'agitation de la vie urbaine sont garantis.",
        ),
      },
      {
        title: T("Işık Diyarı", "Land of Light", "Le pays de la lumière"),
        facts: [
          {
            label: T("Aktiviteler", "Activities", "Activités"),
            value: T(
              "Yürüyüş, Bisiklet, Deniz Kayağı, Coasteering, Dalış",
              "Hiking, Biking, Sea Kayaking, Coasteering, Diving",
              "Randonnée, vélo, kayak de mer, coasteering, plongée",
            ),
          },
          {
            label: T("Süre", "Duration", "Durée"),
            value: T("5 gece 6 gün", "5 nights 6 days", "5 nuits 6 jours"),
          },
        ],
        price: CONTACT,
        body: T(
          "“Işık diyarı” Likya'nın güzelliklerini birinci elden keşfederek pek azının yaşayabildiği bir özgürlüğün tadını çıkarın. Adrenalin dolu üç gün boyunca açık hava etkinlikleri ve uygarlıktan uzak, tamamen doğanın içinde üç gece kamp yapın; ardından Kaş'taki şirin bir butik otelde iki gece geçirerek Türkiye'nin en cazip tatil beldelerinden birini keşfedin. Yürüyüş, bisiklet, deniz kayağı, coasteering ve tüplü dalış yaparken Likya'nın doğal harikalarını keşfedin. Likya'nın muhteşem manzaraları, kristal berraklığındaki Akdeniz suları ve heybetli dağları sizi unutulmaz bir deneyim için karşılayacak.",
          "Taste freedom few are fortunate enough to experience by discovering first-hand the beauties of Lycia, “the land of light”. Enjoy three fun-filled days of adrenaline-pumping outdoor activities and three nights camping away from civilization and fully immersed in nature, followed by two nights in a charming boutique hotel in Kaş, discovering one of the most attractive holiday destinations in Turkey. Explore the natural wonders of Lycia, the “land of light”, while hiking, biking, sea kayaking, coasteering and scuba diving. Lycia's stunning views, crystal clear Mediterranean waters and almighty mountains will welcome you for an unforgettable experience.",
          "Goûtez à une liberté que peu ont la chance de vivre en découvrant de première main les beautés de la Lycie, « le pays de la lumière ». Profitez de trois journées pleines d'activités de plein air gorgées d'adrénaline et de trois nuits de camping loin de la civilisation, en pleine nature, suivies de deux nuits dans un charmant hôtel-boutique à Kaş, à la découverte de l'une des plus belles destinations de vacances de Turquie. Explorez les merveilles naturelles de la Lycie en randonnée, à vélo, en kayak de mer, en coasteering et en plongée sous-marine. Les vues époustouflantes de la Lycie, les eaux cristallines de la Méditerranée et ses puissantes montagnes vous accueilleront pour une expérience inoubliable.",
        ),
      },
    ],
  },
  {
    title: T("Yürüyüş", "Hiking", "Randonnée"),
    items: [
      {
        title: T("Felen (Phellos) – Kaş (Antiphellos)", "Felen (Phellos) – Kaş (Antiphellos)", "Felen (Phellos) – Kaş (Antiphellos)"),
        facts: [
          { label: T("Transfer süresi", "Transfer Time", "Temps de transfert"), value: T("25 dk", "25 min", "25 min") },
          { label: T("Yükseklik", "Altitude", "Altitude"), value: T("850-0 m", "850-0 m", "850-0 m") },
        ],
        price: T("50 €", "50 €", "50 €"),
        body: T(
          "Yürüyüş, küçük köy yerleşimleri içinden ulaşılan küçük bir orman evinin yanından başlar. Birkaç yüz metre yürüdükten hemen sonra, ağaçlarla kaplı ve bulutlar ile gökyüzünün yücelttiği vadi panoramasının keyfini çıkarmak için duruyoruz… Antik Phellos kenti, ağaçların ve çalıların arasına gizlenmiş etkileyici nekropolü ve mezarlarıyla kendini gösterir. Çukurbağ köyüne doğru indikten sonra, iyi korunmuş mimarisi ve eski evleri görülmeye değer bir manzara olacak. Yürüyüşün son bölümünde, Kaş'a doğru inerken, Kaş Çukurbağ yarımadasını çevreleyen koyların muhteşem panoramasının arka planında Yunan adası Meis görünecek.",
          "The hike starts by a small forest house reached through small village settlements. Just after hiking for a few hundred meters, we stop to enjoy the view of the valley panorama covered with trees and glorified by the clouds and the sky…The ancient city of Phellos presents itself with its impressive necropolis and tombs hidden in the trees and bushes. After going down towards Çukurbağ village, the well-preserved architecture and the old houses will be a worth seeing view. On the final part of the hike, walking down towards Kaş, the Greek island Meis will be on the background of the amazing panorama of the bays surrounding Kas Cukurbag peninsula.",
          "La randonnée débute près d'une petite maison forestière atteinte à travers de petits hameaux. Après seulement quelques centaines de mètres, nous nous arrêtons pour admirer le panorama de la vallée couverte d'arbres et sublimée par les nuages et le ciel… L'ancienne cité de Phellos se révèle avec son impressionnante nécropole et ses tombeaux cachés parmi les arbres et les buissons. En descendant vers le village de Çukurbağ, l'architecture bien préservée et les vieilles maisons offrent une vue remarquable. Dans la dernière partie de la randonnée, en descendant vers Kaş, l'île grecque de Meis apparaît en arrière-plan du superbe panorama des baies entourant la péninsule de Kaş-Çukurbağ.",
        ),
      },
      {
        title: T("Ufakdere – Kaş", "Ufakdere – Kaş", "Ufakdere – Kaş"),
        facts: [
          { label: T("Transfer süresi", "Transfer Time", "Temps de transfert"), value: T("25 dk", "25 min", "25 min") },
          { label: T("Tur derecesi", "Tour Grade", "Niveau"), value: T("A-B", "A-B", "A-B") },
          { label: T("Yükseklik", "Altitude", "Altitude"), value: T("5 m", "5 m", "5 m") },
        ],
        price: T("55 €", "55 €", "55 €"),
        body: T(
          "Okçuöldüğü bölgesinden başlayarak Ufakdere koyuna ulaşıyor ve Likya Yolu üzerinde yürüyüşe başlıyoruz. Sahil şeridi patikasının manzaraları, Likya yolunun çarpıcı güzelliği ve Likya mezarları yürüyüşün keyfini artıracak. Limanağzı koyunda öğle yemeğinden sonra, yüzmek isteyenler için Kaş'ın kristal berraklığındaki suları bekliyor olacak. Sebeda nekropolüne tırmandıktan sonra yürüyüş ılımlı bir tempoyla devam edecek ve patika sizi Kaş'a kadar aşağıya götürecek.",
          "Starting from Okçuöldüğü district, we reach Ufakdere bay and start hiking on the Lycian way. The views of the coastline trail and the striking beauty of the Lycian path and the Lycian tombs will enhance the the pleasure of the hike. After having lunch in Limanağzı bay, if anyone wants to swim crystal clear water of Kaş will be waiting. After hiking up to the necropolis of Sebeda, the hike will continue on a moderate pace and the path will take you all the way down to Kaş.",
          "En partant du district d'Okçuöldüğü, nous rejoignons la baie d'Ufakdere et commençons la randonnée sur la Voie lycienne. Les vues du sentier côtier, la beauté saisissante du chemin lycien et les tombeaux lyciens rehausseront le plaisir de la marche. Après le déjeuner dans la baie de Limanağzı, ceux qui le souhaitent pourront se baigner dans les eaux cristallines de Kaş. Après avoir grimpé jusqu'à la nécropole de Sebeda, la randonnée se poursuit à un rythme modéré et le sentier vous mène jusqu'à Kaş.",
        ),
      },
      {
        title: T("Kekova Macerası", "Kekova Adventure", "Aventure de Kekova"),
        facts: [
          { label: T("Rota", "Route", "Itinéraire"), value: T("Appolonia – Andriake", "Appolonia – Andriake", "Appolonia – Andriake") },
          { label: T("Süre", "Duration", "Durée"), value: T("4 gece 5 gün", "4 Nights 5 Days", "4 nuits 5 jours") },
        ],
        price: CONTACT,
        body: T(
          "Bu tur, üç yürüyüş gününde Likya'nın tarihi ve coğrafi güzelliklerini keşfetmeniz için harika bir fırsat sunar. Turun öne çıkanları arasında Aperlai kalıntıları, antik Simena kentinde bir gece geçirmek ve Aziz Nikolaos kilisesine ev sahipliği yapan Myra'nın limanı Andriake'yi ziyaret etmek yer alır. Aperlai'deki kalıntıların hemen yanında kamp yapmak turun çekiciliğini daha da artırır. Bölgenin çok özel mikro iklimi ve ekosistemi her an sizi şaşırtmaya hazır.",
          "This tour offers you a great chance to discover the historical and geographical beauties of Lycia in three hiking days. The highlights of the tour include the ruins of Aperlai, spending a night in the ancient city of Simena and visiting Andriake, the harbour of Myra that is home to the Saint Nicholas church. Camping just beside the ruins in Aperlai adds even more to the attraction of the tour. The very singular microclimate and ecosystem of the region is ready to surprise you at any moment.",
          "Ce circuit vous offre une excellente occasion de découvrir les beautés historiques et géographiques de la Lycie en trois jours de randonnée. Les points forts comprennent les ruines d'Aperlai, une nuit dans l'ancienne cité de Simena et la visite d'Andriake, le port de Myra qui abrite l'église Saint-Nicolas. Camper juste à côté des ruines d'Aperlai ajoute encore à l'attrait du circuit. Le microclimat et l'écosystème très singuliers de la région sont prêts à vous surprendre à tout moment.",
        ),
      },
      {
        title: T("Kuruova-Susuz Dağ-Üçoluk Yaylası", "Kuruova-Susuz Dağ-Üçoluk Yaylası", "Kuruova-Susuz Dağ-Üçoluk Yaylası"),
        facts: [
          { label: T("Transfer süresi", "Transfer Time", "Temps de transfert"), value: T("60 dk", "60 min", "60 min") },
          { label: T("Tur derecesi", "Tour Grade", "Niveau"), value: T("A-B", "A-B", "A-B") },
          { label: T("Yükseklik", "Altitude", "Altitude"), value: T("1550 – 1850 – 1500 m", "1550 – 1850 – 1500 m", "1550 – 1850 – 1500 m") },
        ],
        price: CONTACT,
        body: T(
          "Yürüyüş, Gömbe yolunun en yüksek noktasından, Kuruova geçidinin (1550 m) hemen yakınındaki kokulu sedir ormanlarından başlar. Bölge her zaman Kaş'tan 5-10 derece daha soğuktur ve kışın çok istisnai kar yağışının tadını çıkarmak isteyen piknikçilerin gözde yerlerinden biridir. Rota bizi dağın 1850 metre yüksekliğine kadar çıkarır; buradan Toros dağlarının zirvelerini görebilirsiniz. Sedir ağaçlarının manzarasını geride bırakınca, tamamen farklı bir bitki örtüsü bizi pek çok sürprizle karşılayacak; keçilerini otlatan göçebeler, yabani atlar…",
          "The hike starts from the highest point of the road to Gömbe just near Kuruova passage (1550m) in the fragrant cedar forests. The area is always around 5-10 degrees colder than Kaş and it is one of the favourite places for picnickers to enjoy very exceptional snowfall in winter. The route takes us up all the way to 1850 meter high on the mountain from where you can see the peaks of Taurus mountains. Leaving the views of the cedar trees behind, a completely different vegetation cover will be waiting for us to offer lots of different surprises; nomads feeding their goats, wild horses…",
          "La randonnée débute au point le plus haut de la route de Gömbe, tout près du passage de Kuruova (1550 m), dans des forêts de cèdres parfumées. La zone est toujours de 5 à 10 degrés plus fraîche que Kaş et c'est l'un des lieux favoris des pique-niqueurs pour profiter de chutes de neige exceptionnelles en hiver. L'itinéraire nous mène jusqu'à 1850 mètres d'altitude, d'où l'on aperçoit les sommets des monts Taurus. Laissant derrière nous les cèdres, une végétation totalement différente nous réserve de nombreuses surprises ; des nomades faisant paître leurs chèvres, des chevaux sauvages…",
        ),
      },
    ],
    notes: [
      T(
        "Günlük turlar için minimum katılımcı sayısı 4'tür.",
        "The minimum number of participants for the daily tours is 4.",
        "Le nombre minimum de participants pour les tours journaliers est de 4.",
      ),
      T(
        "A. kolaydır – her yaştan herkes için. B. orta seviyedir – düzenli yürüyüş yapan herkes için.",
        "A. is easy – for anyone of any age. B. is moderate – for anyone who is a ’regular walker’.",
        "A. : facile – pour tous les âges. B. : modéré – pour tout marcheur régulier.",
      ),
      T(
        "Haftalık turlar için minimum katılımcı sayısı 2'dir. Fiyatlar kişi başıdır; daha büyük gruplar ve daha fazla bilgi için lütfen ofisimizle iletişime geçin.",
        "The minimum number of participants for weekly tours is 2. The prices are per person and for pricing of bigger groups and for more information please contact our office.",
        "Le nombre minimum de participants pour les tours hebdomadaires est de 2. Les prix sont par personne ; pour les groupes plus importants et plus d'informations, veuillez contacter notre bureau.",
      ),
    ],
  },
  {
    title: T("Bisiklet Turları", "Biking Tours", "Circuits à vélo"),
    items: [
      {
        title: T("Sarılar-Belenli", "Sarılar-Belenli", "Sarılar-Belenli"),
        facts: [
          {
            label: T("Toplam mesafe", "Total Distance", "Distance totale"),
            value: T("22 km + 12 km (opsiyonel)", "22 km + 12 km (optional)", "22 km + 12 km (optionnel)"),
          },
        ],
        price: T("50 €", "50 €", "50 €"),
        body: T(
          "Bu bisiklet gününde sizi pek çok meşe ağacı, eski köy evleri ve antik Korba kentinin kalıntılarını içeren bir manzara karşılıyor. Yaklaşık 450 metrede pedal çevirmeye başlıyoruz ve tur boyunca ortalama yükseklik 355 metre civarında olacak; rota çoğunlukla düz. Mevsime bağlı olarak, bir meşe ağacının gölgesinde ya da eski bir okul bahçesinde öğle yemeği yiyebilirsiniz.",
          "A view including lots of oak trees, old village houses and the ruins of the ancient city Korba welcomes you on this cycling day. We start pedaling around 450 metres and throughout the tour the average altitude will be around 355 metres and the route is mostly flat. Depending on the season, you can have lunch under the shade of an oak tree or in an old school yard.",
          "Une vue composée de nombreux chênes, de vieilles maisons de village et des ruines de l'ancienne cité de Korba vous accueille lors de cette journée à vélo. Nous commençons à pédaler vers 450 mètres et, tout au long du parcours, l'altitude moyenne avoisine les 355 mètres sur un itinéraire majoritairement plat. Selon la saison, vous pourrez déjeuner à l'ombre d'un chêne ou dans une ancienne cour d'école.",
        ),
      },
      {
        title: T("Gürsu – Dirgenler", "Gürsu – Dirgenler", "Gürsu – Dirgenler"),
        facts: [{ label: T("Toplam mesafe", "Total Distance", "Distance totale"), value: T("28 km", "28 km", "28 km") }],
        price: T("60 €", "60 €", "60 €"),
        body: T(
          "Bir minibüsle dağ yolundan 1200 metreye, Susuz Dağı sırasındaki Gürsu köyüne çıkıyoruz – Orta Likya'nın en çarpıcı kaya oluşumlarından bazılarına ve destansı manzaralı sedir ormanına ev sahipliği yapan bir yer. Turun ilk 20 kilometresi inişli ve ilk bölümden sonra rota bir dere yatağını takip ediyor. Bir köy evinde öğle yemeğinizi yedikten sonra biraz dinlenip taze köy havasını içinize çekebilirsiniz. Öğle yemeğinden sonra minibüsümüze binip Kaş'a geri dönüyoruz ve tur limanda sona eriyor.",
          "We drive in a van up on a mountain road to 1200m, Gursu village in the range of Susuz Mountain – home to some of Central Lycia's most stunning rock formations and cedar forest with epic views. The first 20 kilometres of the tour is downhill and after the first part the route follows a creek bed. After having your lunch in a village house you can rest for a bit and breath in the fresh village air. After lunch we get on our van and drive back to Kaş and the tour finishes in the harbour.",
          "Nous montons en minibus par une route de montagne jusqu'à 1200 m, au village de Gürsu dans le massif du mont Susuz – qui abrite certaines des formations rocheuses les plus spectaculaires de la Lycie centrale et une forêt de cèdres aux vues épiques. Les 20 premiers kilomètres sont en descente et, après cette première partie, l'itinéraire suit le lit d'un ruisseau. Après le déjeuner dans une maison de village, vous pourrez vous reposer un peu et respirer l'air frais. Après le repas, nous reprenons le minibus pour rentrer à Kaş et le circuit se termine au port.",
        ),
      },
      {
        title: T("Sütleğen – Kemerköy", "Sütleğen – Kemerköy", "Sütleğen – Kemerköy"),
        facts: [{ label: T("Toplam mesafe", "Total Distance", "Distance totale"), value: T("36 km", "36 km", "36 km") }],
        price: T("60 €", "60 €", "60 €"),
        body: T(
          "Kıbrıs Kanyonu Özel Çevre Koruma Bölgesi'ne paralel yol, yüksekliğiyle size büyüleyici bir manzara sunacak. Rota Beldibi köyünde 1200 metreden başlar ve sedir ormanları ile göçebe köyleri arasından Katran dağ-orman yolunu izleyerek 1478 metreye kadar çıkar. Kızılkaya köyüne ulaştıktan sonra muhteşem bir iniş başlayarak sizi öğle yemeği yeriniz Kemer vadisine götürür. Öğle yemeğinizden sonra bisiklete devam etmek isterseniz tur, bağlantı yolları izlenerek uzatılabilir.",
          "The road parallel to the Specially Protected Area of Cyprus Canyon will be offering you a ravishing view with its height. The route starts at 1200 meters in Beldibi village and goes up to 1478 meters following the Katran mountain&forest road through the cedar forests and nomad villages. After reaching Kızılkaya village a splendid downhill part will start taking you to your lunch place Kemer valley. After your lunch if you wish to continue cycling the tour can be extended following access roads.",
          "La route parallèle à la zone spécialement protégée du canyon de Chypre vous offrira une vue ravissante par sa hauteur. L'itinéraire débute à 1200 mètres au village de Beldibi et monte jusqu'à 1478 mètres en suivant la route forestière du mont Katran à travers les forêts de cèdres et les villages nomades. Après le village de Kızılkaya, une magnifique descente vous mène vers votre lieu de déjeuner, la vallée de Kemer. Après le repas, si vous souhaitez continuer à pédaler, le circuit peut être prolongé par des chemins d'accès.",
        ),
      },
      {
        title: T("Likya Patikaları", "Lycian Lanes", "Chemins lyciens"),
        facts: [{ label: T("Süre", "Duration", "Durée"), value: T("7 gece / 8 gün", "7 nights / 8 days", "7 nuits / 8 jours") }],
        price: CONTACT,
        body: T(
          "Likya Patikaları size, Anadolu Alevilerinin en önemli merkezlerinden biri olan Elmalı kasabasından başlayan 5 günlük bir bisiklet turu sunar. Birkaç gün boyunca derin mavi göllerin yanında, yüksek yaylalarda, arka planda karlı dağlarla pedal çevirip ardından sedir ormanlarına, çam ve köknar ağaçlarına doğru iniyorsunuz. Kaş'a yaklaştığınızda Akdeniz'in nefes kesen manzarası ufukta belirir.",
          "Lycian Lanes offers you 5 days of cycling starting from Elmalı town which is one of the most significant centers of Anatolian Alevis. Pedaling for few days next to deep blue lakes, in high plateaus snowy mountains in the background and then going downhill towards the cedar forests, pine and fir trees. When you get close to Kaş the breathtaking view of the Mediterranean appears on the horizon.",
          "Les Chemins lyciens vous proposent 5 jours de vélo au départ de la ville d'Elmalı, l'un des centres les plus importants des Alévis d'Anatolie. Pendant quelques jours, vous pédalez le long de lacs d'un bleu profond, sur de hauts plateaux avec des montagnes enneigées en toile de fond, puis descendez vers les forêts de cèdres, de pins et de sapins. À l'approche de Kaş, la vue à couper le souffle de la Méditerranée apparaît à l'horizon.",
        ),
      },
    ],
    notes: [
      T(
        "Günlük turlarımızın tamamı kolaydır; yalnızca birkaç rotamızın orta seviye bölümleri vardır.",
        "All of our daily tours are easy except only few of our routes has parts that are moderate.",
        "Tous nos tours journaliers sont faciles, hormis quelques itinéraires comportant des sections modérées.",
      ),
      T(
        "Haftalık turlar için minimum katılımcı sayısı 2'dir. Fiyatlar kişi başıdır; daha büyük gruplar ve daha fazla bilgi için lütfen ofisimizle iletişime geçin.",
        "The minimum number of participants for weekly tours is 2. The prices are per person and for pricing of bigger groups and for more information please contact our office.",
        "Le nombre minimum de participants pour les tours hebdomadaires est de 2. Les prix sont par personne ; pour les groupes plus importants et plus d'informations, veuillez contacter notre bureau.",
      ),
    ],
  },
  {
    title: T("Coasteering", "Coasteering", "Coasteering"),
    items: [
      {
        title: T("Büyükçakıl – Limanağzı", "Büyükçakıl – Limanağzı", "Büyükçakıl – Limanağzı"),
        facts: [{ label: T("Mesafe", "Distance", "Distance"), value: T("3 km", "3 km", "3 km") }],
        price: T("70 €", "70 €", "70 €"),
        body: T(
          "Coasteering, Türkiye'de açık hava etkinlikleri arasında yerini yeni alan oldukça yeni bir spordur ve bunu yapan TEK ajans biziz!!! Coasteering temel olarak kayalık kıyı şeridinde, suya çok yakın ilerlemekten oluşur. Herhangi bir teknik tırmanış ekipmanına veya ileri tırmanış tekniklerine gerek yok: sadece yürür, tırmanır, atlar, yüzer ve tekrar atlarsınız! Yol boyunca bu toprakların jeolojik ve ekolojik oluşumlarını keşfetme şansına sahip olacak; deniz kuşları, balıklar, yengeçler ve deniz kaplumbağaları gözlemleyebileceksiniz… Çok şanslıysanız, neden olmasın, çok nadir bir Akdeniz foku bile?",
          "Coasteering is a fairly new sport just taking its place in outdoor activities in Turkey, and we are the ONLY agency doing it!!! Coasteering consists basicly of traversing the rocky coastline, very close to the water. No need for any technical climbing equipment and advanced climbing techniques: you just walk, climb, jump and swim and jump again! Along your path you will have the chance to explore the geological and ecological formations of this land, and you may observe marine birds, fish,crabs and sea turtles… Why not an elusive and very rare Mediterranean seal, if you are very lucky?",
          "Le coasteering est un sport relativement nouveau qui prend tout juste sa place parmi les activités de plein air en Turquie, et nous sommes la SEULE agence à le proposer !!! Le coasteering consiste essentiellement à parcourir le littoral rocheux, au plus près de l'eau. Aucun équipement technique d'escalade ni technique avancée n'est nécessaire : vous marchez, grimpez, sautez, nagez et sautez à nouveau ! En chemin, vous aurez l'occasion d'explorer les formations géologiques et écologiques de cette terre et d'observer oiseaux marins, poissons, crabes et tortues de mer… Et pourquoi pas, avec beaucoup de chance, un insaisissable et très rare phoque moine de Méditerranée ?",
        ),
      },
    ],
    notes: [
      T(
        "Minimum katılımcı sayısı 4'tür. Fiyatlar kişi başıdır.",
        "The minimum number of the participants is 4. The prices are per person.",
        "Le nombre minimum de participants est de 4. Les prix sont par personne.",
      ),
      T(
        "Etkinlik 16-55 yaş grubu için uygundur ve katılımcıların iyi bir kondisyona sahip olmasını gerektirir.",
        "The activity is suitable for 16-55 age group and requires the participants to have a good level of fitness.",
        "L'activité convient aux 16-55 ans et requiert une bonne condition physique.",
      ),
    ],
  },
  {
    title: T("Mavi Turlar ve Günlük Tekne Turları", "Blue Cruises and Daily Boat Tours", "Croisières bleues et excursions journalières en bateau"),
    items: [
      {
        title: T("Kaş Adaları", "Kaş Islands", "Îles de Kaş"),
        price: T("45 €", "45 €", "45 €"),
        body: T(
          "Güneşin, doğanın ve kristal berraklığındaki suların buluştuğu Kaş adaları çevresinde yüzerek ve şnorkelle dalış yaparak unutulmaz bir gün geçireceksiniz… Tur sizi Kaş ile Kekova arasındaki kıyı şeridindeki küçük koylara ve Yunan adalarıyla doğal bir sınır oluşturan takımadaya götürecek… İstediğiniz kadar yüzebilir, su altını keşfetmek için şnorkelle dalabilir ya da güneşlenmenin tadını çıkarabilirsiniz.",
          "You will spend an unforgettable day swimming and snorkeling around Kaş islands where the sun, the nature and crystal clear waters meet… The tour will take you to small coves on the coastline between Kaş and Kekova, and to the archipelago that defines a natural border with the Greek islands…You can enjoy swimming as much as you want, or snorkel to discover the underwater, or simply make the most of sunbathing.",
          "Vous passerez une journée inoubliable à nager et à faire du snorkeling autour des îles de Kaş, là où le soleil, la nature et les eaux cristallines se rencontrent… Le circuit vous emmène dans de petites criques du littoral entre Kaş et Kekova, ainsi que dans l'archipel qui forme une frontière naturelle avec les îles grecques… Vous pourrez nager à volonté, faire du snorkeling pour découvrir les fonds marins ou simplement profiter du soleil.",
        ),
      },
      {
        title: T("Kaş – Kekova – Kaş", "Kaş – Kekova – Kaş", "Kaş – Kekova – Kaş"),
        price: T("55 €", "55 €", "55 €"),
        body: T(
          "Tur toplamda yaklaşık 9 saat sürer ve Kaş-Kekova bölgesinin Özel Çevre Koruma Alanı'nı keşfedebilecek, Likya'dan Roma kentlerine kadar 3000 yıl öncesine dayanan antik yerleşimlerin kalıntılarının güzelliklerini görebileceksiniz. Gün boyunca Kaş takımadasını, Limanağzı plajını, Kekova adasını, Batık şehri ve Simena kalesini (Kaleköy) ziyaret edeceksiniz.",
          "The tour in total takes around 9 hours and you will be able to explore the Specially Protected Area of Kaş-Kekova region and discover the beauties of the ruins of the ancient settlements dating back to 3000 years ago from Lycian to Roman cities. Throughout the day, you will visit the Kaş archipelago, Limanağzı beach, Kekova island, the Sunken city, Simena castle (Kaleköy).",
          "Le circuit dure environ 9 heures au total et vous permettra d'explorer la zone spécialement protégée de la région de Kaş-Kekova et de découvrir la beauté des ruines de cités antiques vieilles de 3000 ans, des Lyciens aux Romains. Au cours de la journée, vous visiterez l'archipel de Kaş, la plage de Limanağzı, l'île de Kekova, la cité engloutie et le château de Simena (Kaleköy).",
        ),
      },
      {
        title: T("Kekova Batısı", "Kekova West", "Kekova Ouest"),
        price: T("50 €", "50 €", "50 €"),
        body: T(
          "Güneşin, doğanın ve kristal berraklığındaki suların bir araya geldiği Kaş-Kekova bölgesinde unutulmaz bir gün geçirecek ve bu tur sayesinde Likya'nın iki batık kentini keşfetme şansı bulacaksınız! Öğle yemeğinden önce, “kraliyet moru” boyasının elde edilmesiyle ve eşsiz lahdiyle ünlü antik Aperlai kentine 2 kilometrelik bir yürüyüş yapın, kalıntıları keşfedin ya da daha ileri gidip batık liman kalıntılarında şnorkelle dalış yapın! Yerel bir balıkçı lokantasında balık ve patates kızartmasından oluşan harika bir öğle yemeğinin ardından Kekova adasının, batık şehrin, yüzeyin hemen altındaki kalıntıların ve sarp kayalara oyulmuş gizemli odaların güzelliğinin tadını çıkarın!",
          "You will spend an unforgettable day around Kaş-Kekova area where the sun, nature and the crystal clear waters meet all together and you will have the chance to discover the two sunken cities of Lycian thanks to this tour! Before the lunch take a 2 kilometer-walk to the ancient city of Aperlai famous for the extraction of the dye “royal purple” and its unique sarcophagus, explore the ruins or even go further and snorkel on the sunken port ruins! After a great lunch of fish and chips at a local fisherman's restaurant, enjoy the beauty of the Kekova island and the sunken city and the ruins just below the surface and the mysterious rooms carved out of sheer rock!",
          "Vous passerez une journée inoubliable autour de la région de Kaş-Kekova, où le soleil, la nature et les eaux cristallines se rejoignent, et vous aurez la chance de découvrir les deux cités englouties de Lycie grâce à ce circuit ! Avant le déjeuner, faites une marche de 2 kilomètres jusqu'à l'ancienne cité d'Aperlai, célèbre pour l'extraction de la teinture « pourpre royale » et son sarcophage unique ; explorez les ruines ou allez plus loin en faisant du snorkeling sur les ruines du port englouti ! Après un excellent déjeuner de poisson-frites dans un restaurant de pêcheurs local, profitez de la beauté de l'île de Kekova, de la cité engloutie et des ruines juste sous la surface, ainsi que des chambres mystérieuses creusées dans la roche !",
        ),
      },
      {
        title: T("Kekova Adaları", "Kekova Islands", "Îles de Kekova"),
        price: T("50 €", "50 €", "50 €"),
        body: T(
          "Güneşin, doğanın ve Akdeniz'in turkuaz sularının buluştuğu Kekova adaları çevresinde unutulmaz bir gün geçireceksiniz… Üçağız köyüne 45 dakikalık bir yolculuğun ardından, sizi Kekova körfezinin gizli koylarına götürecek teknemize bineceğiz. Yüzeyin hemen altındaki Batık Şehir ve kalıntılarını, kayaya oyulmuş merdivenleri göreceksiniz, bir zamanlar korsanların ani baskınlar düzenlemek için kullandığı tuhaf bir deniz mağarasını keşfedecek ve berrak sularda deniz kaplumbağalarıyla yüzeceksiniz. Bu tur, bir gününüzü teknede geçirmek ve kıyı boyunca Likya mirasını keşfederken küçük adaları gezmek için harika bir fırsat.",
          "You will spend an unforgettable day around Kekova islands, where meet the Sun, Nature and turquoise waters of the Med… After a 45-min drive to Üçağız village, we will get on our boat that will take you hidden bays of Kekova sound. You will get the chance to see the Sunken City and its ruins just below the surface ansd stairs carved in the roc, explore a peculiar marine cave that was once by pirates to execute surprise attacks, and swim with seaturtles in clear waters. This tour is a great chance to spend your day on a boat and explore small islands while exploring the Lycian heritage all over the coastline.",
          "Vous passerez une journée inoubliable autour des îles de Kekova, là où se rencontrent le soleil, la nature et les eaux turquoise de la Méditerranée… Après 45 minutes de route jusqu'au village d'Üçağız, nous monterons à bord de notre bateau qui vous emmènera dans les baies cachées du détroit de Kekova. Vous verrez la Cité engloutie et ses ruines juste sous la surface, des escaliers taillés dans la roche, explorerez une curieuse grotte marine jadis utilisée par les pirates pour des attaques surprises et nagerez avec les tortues de mer dans des eaux claires. Ce circuit est une excellente occasion de passer la journée en bateau et d'explorer de petites îles tout en découvrant le patrimoine lycien le long du littoral.",
        ),
      },
      {
        title: T("Kekova Klasik", "Kekova Classic", "Kekova Classique"),
        price: T("65 €", "65 €", "65 €"),
        body: T(
          "45 dakikalık bir transfer sizi teknenizin beklediği Üçağız'a (Teimioussa) götürür. Eşsiz su altı kalıntılarıyla Kekova Batık Şehri'nde tarihle dolu unutulmaz bir gün geçireceksiniz. Bölgenin sessiz koylarında deniz kaplumbağalarıyla yüzerek Akdeniz'in kristal berraklığındaki sularının tadını eşsiz bir şekilde çıkarma fırsatı bulacaksınız. Yüzeyin hemen altındaki batık şehri ve kalıntılarını da göreceksiniz (bazı teknelerin “cam tabanı” vardır). Öğle yemeği, antik dar sokakları ve Haçlı Seferleri döneminde Malta Şövalyeleri tarafından inşa edilen ünlü kalesiyle pitoresk Simena köyünde servis edilir. Bu tur, eşsiz Likya mirasını keşfederek bir gününüzü teknede geçirmek için harika bir fırsat.",
          "A 45 minute transfer takes you to Üçağız (Teimioussa), where your boat awaits for you. You will spend an unforgettable day charged with history in the Sunken City of Kekova with unique immerged ruins. You will have a chance to enjoy the crystal clear waters of the Mediterranean in a unique way, swimming with sea turtles in the silent bays of the area. You will also get the chance to see the sunken city and its ruins just below the surface (some boats have “glass bottoms”). Lunch is served in the picturesque village of Simena, with its ancient narrow streets and famous castle built by the Knights of Malta during Crusaders' times. This tour is a great chance to spend your day on a boat and explore the unique Lycian heritage.",
          "Un transfert de 45 minutes vous conduit à Üçağız (Teimioussa), où votre bateau vous attend. Vous passerez une journée inoubliable chargée d'histoire dans la Cité engloutie de Kekova et ses ruines immergées uniques. Vous pourrez profiter des eaux cristallines de la Méditerranée d'une manière unique, en nageant avec les tortues de mer dans les baies silencieuses de la région. Vous verrez aussi la cité engloutie et ses ruines juste sous la surface (certains bateaux ont un « fond de verre »). Le déjeuner est servi dans le pittoresque village de Simena, avec ses ruelles anciennes et son célèbre château bâti par les Chevaliers de Malte à l'époque des Croisades. Ce circuit est une belle occasion de passer la journée en bateau et d'explorer le patrimoine lycien unique.",
        ),
      },
      {
        title: T("Kekova Charter", "Kekova Charter", "Kekova Charter"),
        price: T("45 €", "45 €", "45 €"),
        body: T(
          "Tur, Kaş'tan 45 dakikalık transfer mesafesindeki Üçağız köyünden başlar. Tekneye bindikten sonra, M.S. 141-240'a dayanan sonu gelmeyen depremler sırasında deniz yüzeyinin altına batan Kekova'nın eşsiz Batık Şehir kalıntılarını keşfetmek için Kekova körfezinin güzel dünyasına götürüleceksiniz. Teknemizin cam tabanından su altındaki kalıntıları keşfedecek ve sarp kayalara oyulmuş, su altına inen basamakları fark edeceksiniz. Tekne sizi korsanların kullandığı bir mağaraya, güzel Simena köyüne ve Haçlılar tarafından inşa edilen kalesine götürecek; ayrıca caretta caretta'larla yüzebileceğiniz küçük koylarda sık sık molalar verecek!",
          "The tour starts from Üçağız village at a 45-minute transfer from Kaş. After getting on the boat, you will be taken into the beautiful world of Kekova sound to explore the unique Sunken City ruins of Kekova, which sunk under the surface of the sea during endless earthquakes dating back to 141-240 A.D. You will discover ruins under the water thru the glass bottom of our boat and notice steps carved into sheer rock going down underwater. The boat will take you into a cave used by pirates, to the beautiful Simena village and its castle built by Crusaders, and will have frequent breaks in small bays where you may find carettas to swim with!",
          "Le circuit débute au village d'Üçağız, à 45 minutes de transfert de Kaş. Une fois à bord, vous serez emmené dans le bel univers du détroit de Kekova pour explorer les ruines uniques de la Cité engloutie de Kekova, qui a sombré sous la surface lors d'innombrables séismes datant de 141-240 ap. J.-C. Vous découvrirez les ruines sous-marines à travers le fond de verre de notre bateau et remarquerez des marches taillées dans la roche descendant sous l'eau. Le bateau vous emmènera dans une grotte utilisée par les pirates, au beau village de Simena et à son château bâti par les Croisés, avec de fréquentes pauses dans de petites baies où vous pourrez nager avec des tortues caouannes !",
        ),
      },
    ],
    notes: [
      T(
        "Kekova Charter için minimum katılımcı sayısı 8, maksimum 12'dir.",
        "The minimum number of the participants is 8 and the max number is 12.",
        "Le nombre minimum de participants est de 8 et le maximum de 12.",
      ),
    ],
  },
  {
    title: T("Kültür Turları", "Culture Tours", "Tours culturels"),
    items: [
      {
        title: T("Elmalı ve Arikanda", "Elmalı ve Arikanda", "Elmalı et Arykanda"),
        price: CONTACT,
        body: T(
          "Bu tur, antik Likya'nın güzelliklerini yüzlerce yıllık ardıç ormanları üzerindeki panoramalarla birleştiriyor. Homeros, Likya'yı denizinin yedi farklı renge sahip olduğu ülke olarak tanımlar. Likya'nın çok sarp kayalıklarının yanında yer alan görkemli Arikanda kenti, diğer Luvi yerleşimleri arasında önemli bir yerleşimdir. Sedir ağaçları, zengin bitki örtüsü, kuş çeşitliliği ve Alvan gölü bölgenin doğal güzelliklerinden sadece birkaçı. Abdal Musa türbesi, Ömer Paşa camii ve Kırık camii ise tarihin nispeten yeni tanıklarından bazıları.",
          "This tour combines the beauties of the ancient Lycia and panoramas over hundred-years-old juniper tree forests. Homer describes Lycia as the country whose sea has seven different colours. The glorious city of Arikanda located by the very steep rocks of Lycia is a significant settlement among other Luvian settlements. Cedar trees, rich vegetation and bird diversity and the lake Alvan are just some of the natural beauties of the region. The shrine of Abdal Musa, Ömer Pasha mosque, Broken mosque are some of the relatively recent witnesses of history.",
          "Ce circuit associe les beautés de l'ancienne Lycie aux panoramas sur des forêts de genévriers centenaires. Homère décrit la Lycie comme le pays dont la mer a sept couleurs différentes. La glorieuse cité d'Arykanda, située près des falaises très escarpées de Lycie, est un établissement majeur parmi les sites louvites. Les cèdres, la végétation riche, la diversité ornithologique et le lac Alvan ne sont que quelques-unes des beautés naturelles de la région. Le sanctuaire d'Abdal Musa, la mosquée Ömer Pasha et la mosquée Brisée comptent parmi les témoins relativement récents de l'histoire.",
        ),
      },
      {
        title: T("Myra (Demre)", "Myra (Demre)", "Myra (Demre)"),
        price: CONTACT,
        body: T(
          "M.Ö. 4. yüzyıldan beri yerleşim yeri olarak kullanılan Kyaenai kentinden başlayan gezimiz, Aziz Nikolaos'un zamanının çoğunu geçirdiği Myra yakınındaki Aya Nikola kilisesini, Likya dönemine ait kaya mezarlarını ve Myra'daki muhteşem antik tiyatroyu ziyaret etmeyi içeriyor. Sülüklü plajının kristal berraklığındaki sularında yüzmek için bir mola verecek ve öğle yemeğimizi plajda yiyeceğiz. Andriake'yi ziyaret ettikten sonra otobüsümüz bizi, Frigyalılara dayanan ana tanrıça kenti Hoyran'a götürecek ve kaya mezarlarını keşfetme fırsatı bulacaksınız.",
          "Starting from Kyaenai, a city that has been used as a settlement since the 4th century B.C, our trip includes visiting the Aya Nikola church close to Myra where the Saint Nicholas spent most of his time and the rock tombs from the Lycian times and the gorgeous ancient theatre in Myra. We will give a break to swim in the crystal clear waters of Sülüklü beach and get our lunch in the beach. After visiting Andriake our bus will take us to Hoyran, the city of mother goddess, dating back to Phrygians and you will have the chance to explore the rock tombs.",
          "En partant de Kyaenai, cité habitée depuis le IVe siècle av. J.-C., notre excursion comprend la visite de l'église Aya Nikola près de Myra, où saint Nicolas passa l'essentiel de son temps, des tombeaux rupestres de l'époque lycienne et du magnifique théâtre antique de Myra. Nous ferons une pause pour nager dans les eaux cristallines de la plage de Sülüklü et y déjeuner. Après la visite d'Andriake, notre bus nous mènera à Hoyran, la cité de la déesse-mère remontant aux Phrygiens, où vous pourrez explorer les tombeaux rupestres.",
        ),
      },
    ],
    notes: [
      T(
        "Minimum katılımcı sayısı 2, maksimum 22'dir.",
        "The minimum number of the participants is 2 and the maximum number is 22.",
        "Le nombre minimum de participants est de 2 et le maximum de 22.",
      ),
    ],
  },
  {
    title: T("Özel Turlar", "Special Tours", "Tours spéciaux"),
    items: [
      {
        title: T("Likya Bitkileri ve Botanik Turu", "Plants of Lycia and Botany Tour", "Plantes de Lycie et tour botanique"),
        facts: [
          {
            label: T("Katılımcılar", "Participants", "Participants"),
            value: T("minimum 6 – maksimum 14", "minimum 6 – maximum 14", "minimum 6 – maximum 14"),
          },
          { label: T("Süre", "Duration", "Durée"), value: T("5 gün", "5 Days", "5 jours") },
        ],
        price: CONTACT,
        body: T(
          "Tur boyunca en az 200 farklı bitki ve Likya bölgesinin en güzel çiçeklerini görebileceksiniz… Bütün gün doğanın içinde yürüyecek, bitkilerle ilgili mitolojik hikâyeleri dinleyecek ve yerel tarih boyunca, hatta şimdi nasıl kullanıldıklarını öğreneceksiniz… Ophrys Lycia orkidesi gibi çok nadir ve endemik türlerle karşılaşabilirsiniz… Orchis Anatolica, Orchis Italica, Safran, Adaçayı, Glayöl, Çiriş otu, Sütleğen, Kekik, Pırnal meşesi, Quercus Coccifera bu gezide koklayıp fotoğraflayabileceğiniz pek çok bitkiden sadece birkaçı. Günlük botanik gezilerinde katılımcılar ayrıca Antik Likya'nın doğal, tarihi ve arkeolojik zenginliklerini keşfedebilecek…",
          "Within the tour you will be able to see at least 200 different plants and the most beautiful flowers of the Lycia region…You will be out in the wild during the whole day walking and listening to the mythical stories about the plants and learn how they have been used during the course of local history, and now… You may encounter very rare and endemical species such as the orchid Ophrys Lycia… Orchis Anatolica, Orchis Italica, Saffron, Clary, Gladiola, Asphodelus, Euphorbia, Thymus, Evergreen Oak, Quercus Coccifera are only few of the many that you will be able to smell and photograph during this trip. During the daily botany trips the participants will also be able to explore natural, historical and archaeological riches of Ancient Lycia…",
          "Au cours du circuit, vous pourrez voir au moins 200 plantes différentes et les plus belles fleurs de la région de Lycie… Vous passerez la journée entière en pleine nature, à marcher et à écouter les histoires mythiques liées aux plantes, et à apprendre comment elles ont été utilisées au fil de l'histoire locale, et aujourd'hui encore… Vous pourrez rencontrer des espèces très rares et endémiques comme l'orchidée Ophrys Lycia… Orchis Anatolica, Orchis Italica, safran, sauge sclarée, glaïeul, asphodèle, euphorbe, thym, chêne vert, Quercus Coccifera ne sont que quelques-unes des nombreuses que vous pourrez sentir et photographier. Lors des sorties botaniques journalières, les participants pourront aussi explorer les richesses naturelles, historiques et archéologiques de l'ancienne Lycie…",
        ),
      },
      {
        title: T("Jeep Safari", "Jeep Safari", "Safari en jeep"),
        price: CONTACT,
        body: T(
          "Saklıkent Kanyonu, buz gibi su akıntısıyla muhteşem bir doğal parktır ve Türkiye'nin en uzun geçididir. Yürüyüşten sonra, ayaklarınız buz gibi suda, su kenarında hak ettiğiniz öğle yemeğinin tadını çıkarın. Rahatlatıcı çamur banyosundan sonra, Likya'nın ilk başkenti Xanthos'ta bir başka yürüyüşe hazırsınız. Xanthos'tan sonraki durak, eşsiz Likya Meclis Binası kalıntıları ve kuzey Akdeniz'in en uzun, güzel plajıyla Patara Milli Parkı'dır. Dönüş yolunda Kaş'a dönmeden önce ya Kalkan'da harika bir dondurma için ya da Kaputaş plajında son bir yüzme molası için duracağız.",
          "Saklıkent Canyon is a splendid natural park with its ice-cold water stream and it is the longest passage in Turkey. After the hike, enjoy your well-deserved lunch by the water, your feet in the ice-cold stream. After the relaxing mud-bath you are ready for another hike in the first capital of Lycia, Xanthos. After Xanthos, the next stop is the National Park of Patara with its unique Lycian Parliament House ruins and its beatiful beach, longest in the northern Mediterranean. On the way back we will either stop in Kalkan for a great ice-cream or another swim at Kaputaş beach for our last break before returning to Kas.",
          "Le canyon de Saklıkent est un splendide parc naturel doté d'un torrent glacé ; c'est le plus long passage de Turquie. Après la randonnée, savourez un déjeuner bien mérité au bord de l'eau, les pieds dans le torrent glacé. Après un bain de boue relaxant, vous êtes prêt pour une nouvelle randonnée dans la première capitale de la Lycie, Xanthos. Après Xanthos, le prochain arrêt est le parc national de Patara, avec ses ruines uniques de la Chambre du Parlement lycien et sa belle plage, la plus longue de la Méditerranée nord. Sur le chemin du retour, nous nous arrêterons soit à Kalkan pour une délicieuse glace, soit à la plage de Kaputaş pour une dernière baignade avant de rentrer à Kaş.",
        ),
      },
      {
        title: T("At Binme", "Horse Riding", "Équitation"),
        price: CONTACT,
        body: T(
          "Turlar Gedefe'den başlar ve Likya patikasını takip eder. İki saat süren bu turu günün herhangi bir saatinde düzenleyebiliriz. At çiftliği Kaş'a yalnızca 8 km uzaklıkta… Önceden deneyim gerekmez; 10 dakikalık bir bilgilendirme alırsınız ve gerisi, güvenliğiniz ve keyfiniz için tüm önlemleri alacak profesyonel tur rehberlerimize kalmıştır. Tek yapmanız gereken sürüşün tadını çıkarmak!",
          "The tours starts from Gedefe and follows the Lycian trail. We can organize this tour that takes two hours at any time of the day. The horse farm is only 8 kms away from Kaş… No previous experience is necessary, you are given a briefing for 10 mins and the rest is on our professional tour guides who will take all the precautions for your safety and enjoyment. All you have to do is enjoy the ride!",
          "Les tours partent de Gedefe et suivent le sentier lycien. Nous pouvons organiser cette excursion de deux heures à tout moment de la journée. La ferme équestre n'est qu'à 8 km de Kaş… Aucune expérience préalable n'est nécessaire ; un briefing de 10 minutes vous est donné et le reste revient à nos guides professionnels qui prendront toutes les précautions pour votre sécurité et votre plaisir. Il ne vous reste plus qu'à profiter de la balade !",
        ),
      },
    ],
  },
];

/**
 * Transportation and accommodation content from dragoman-turkey.com
 * (/transportation-and-accomodation). Prices on request as published.
 */
export const TRANSPORT_ACCOMMODATION: ServiceCategory[] = [
  {
    title: T("Konaklama", "Accomodation", "Hébergement"),
    items: [
      {
        title: T("3★ Otel", "3 *** Hotel", "Hôtel 3 ***"),
        facts: [
          { label: T("Konum", "Location", "Emplacement"), value: T("Küçükçakıl Mevkii", "Küçükçakıl Mevkii", "Küçükçakıl Mevkii") },
          {
            label: T("Yarım pansiyon farkı", "Half-board supplement", "Supplément demi-pension"),
            value: T("10 €/gün", "10 €/day", "10 €/jour"),
          },
        ],
        price: CONTACT,
        body: T(
          "Özel plajı ve havuzuyla deniz kenarında; limanın ve gün batımına karşı Meis (Castellorizo) adasının güzel manzarasına sahip. Eski şehir merkezine ve limana çok yakın (400 m). 2 veya 3 yataklı, balkonlu (deniz manzaralı) odalar; TV, klima, duş & WC, telefon ve saç kurutma makinesi, 24 saat oda servisi, jeneratör. Açık büfe kahvaltı. Teras, 3 bar/snack, restoran ve otopark. Dragoman'ın sunduğu açık hava etkinlikleri: tüplü dalış, deniz kayağı, yürüyüş, bisiklet, coasteering. İki yetişkine eşlik eden 0-6 yaş çocuklar ücretsizdir; 7-12 yaş çocuklar Dbl + Çocuk odasında konaklar. Güncel fiyatlar ve müsaitlik için lütfen bizimle iletişime geçin.",
          "Waterfront with private beach and pool, with a beautiful view of the harbour and the Castellorizo (Meis) island against the sunset. Very close to old city centre and to the harbour (400 m). Rooms with balcony (sea view) with 2 or 3 beds, TV, A/C, shower & WC, phone and hair dryer, 24-hr room service, generator. Open buffet breakfasts. Terrace, 3 bar/snacks, restaurant and parking. Outdoor activities offered by Dragoman: SCUBA diving, sea kayak, hiking, biking, coasteering. Free for children 0-6 years of age accompanying two adults; 7-12 years stay at a room with Dbl + Chld. Please contact us for up to date prices and availability.",
          "En bord de mer avec plage privée et piscine, avec une belle vue sur le port et l'île de Castellorizo (Meis) au coucher du soleil. Très proche du vieux centre-ville et du port (400 m). Chambres avec balcon (vue mer) de 2 ou 3 lits, TV, climatisation, douche & WC, téléphone et sèche-cheveux, service en chambre 24 h/24, générateur. Petits-déjeuners buffet. Terrasse, 3 bars/snacks, restaurant et parking. Activités de plein air proposées par Dragoman : plongée, kayak de mer, randonnée, vélo, coasteering. Gratuit pour les enfants de 0 à 6 ans accompagnés de deux adultes ; 7-12 ans en chambre Dbl + enfant. Veuillez nous contacter pour les tarifs et disponibilités à jour.",
        ),
      },
      {
        title: T("1★ Otel", "1 * Hotel", "Hôtel 1 *"),
        facts: [{ label: T("Konum", "Location", "Emplacement"), value: T("Kaş merkez", "Kaş Centrum", "Centre de Kaş") }],
        price: CONTACT,
        body: T(
          "Otel, eski şehir merkezine, limana ve dalış teknemize çok yakın (100 m). Güzel bahçe manzaralı tek, çift ve aile odaları. Özel banyolar, internet, klima. Aile odaları 3 kişiliktir ve fiyat 2 veya 3 kişilik konaklama içindir. Tek kişilik konaklamada oda fiyatı 5 Euro düşürülür.",
          "Hotel is very close to old city centre and to the harbour and our diving boat (100 m). Single, Double and Family rooms with beautiful garden view. Private bathrooms, internet, air-conditioning. Accommodation in family rooms are for 3 people and the price is for 2 or 3 people accommodation. For single accommodation the room price is reduced for 5 Euros.",
          "L'hôtel est très proche du vieux centre-ville, du port et de notre bateau de plongée (100 m). Chambres simples, doubles et familiales avec une belle vue sur le jardin. Salles de bains privées, internet, climatisation. Les chambres familiales sont pour 3 personnes et le prix est pour 2 ou 3 personnes. Pour une occupation simple, le prix de la chambre est réduit de 5 euros.",
        ),
      },
    ],
  },
  {
    title: T("Ulaşım", "Transportation", "Transport"),
    items: [
      {
        title: T("Dalaman Havalimanı – Kaş", "Dalaman Airport – Kaş", "Aéroport de Dalaman – Kaş"),
        facts: [
          {
            label: T("Rota", "Route", "Itinéraire"),
            value: T(
              "Dalaman Havalimanı – Göcek – Fethiye – Kalkan – Kaş",
              "DALAMAN Airport – Gocek – Fethiye – Kalkan – KAS",
              "Aéroport de DALAMAN – Göcek – Fethiye – Kalkan – KAŞ",
            ),
          },
          { label: T("Mesafe", "Distance", "Distance"), value: T("155 km", "155 km", "155 km") },
          { label: T("Transfer süresi", "By transfer", "Par transfert"), value: T("2 saat", "2 hours", "2 heures") },
        ],
        price: CONTACT,
      },
      {
        title: T("Antalya Havalimanı – Kaş", "Antalya Airport – Kaş", "Aéroport d'Antalya – Kaş"),
        facts: [
          {
            label: T("Rota", "Route", "Itinéraire"),
            value: T(
              "Antalya Havalimanı – Kemer – Tekirova – Kumluca – Finike – Kale (Demre) – Kaş",
              "ANTALYA Airport – Kemer – Tekirova – Kumluca – Finike – Kale (Demre) – KAS",
              "Aéroport d'ANTALYA – Kemer – Tekirova – Kumluca – Finike – Kale (Demre) – KAŞ",
            ),
          },
          { label: T("Mesafe", "Distance", "Distance"), value: T("195 km", "195 km", "195 km") },
          { label: T("Transfer süresi", "By transfer", "Par transfert"), value: T("3,5 saat", "3.5 hours", "3,5 heures") },
        ],
        price: CONTACT,
      },
    ],
    notes: [
      T(
        "Tüm fiyatlar araç başına ve tek yön transfer içindir.",
        "All prices are per vehicle and per one-way transfer.",
        "Tous les prix sont par véhicule et par transfert aller simple.",
      ),
      T("Tüm araçlarda klima vardır.", "All vehicles have air conditionning.", "Tous les véhicules sont climatisés."),
    ],
  },
];
