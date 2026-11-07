# Dragoman web sitesi yenileme projesi

Müşteri gereksinimleri, review kararları ve mevcut durum

**Güncelleme:** 25 Ekim 2026  
**Geliştirici:** UBT — Umut Barış Terzioğlu  
**Müşteri tarafındaki karar vericiler:** Müşteri ve Murat Draman  
**Hedef ilk yayın:** 1 Aralık 2026  
**Çalışma dosyası:** Markdown (`.md`)

## 1. Şu anda neredeyiz

Projenin amacı, marka yönü ve temel işlev beklentileri belirlenmiş durumda. Müşterinin ilk görüşmedeki 50 soruya verdiği yanıtlar kayıtlı. UBT ile geliştirme ayrıntılarını netleştirdiğimiz review devam ediyor. Ürünlerin satış yönteminin panelden seçilmesi onaylandı; rezervasyon, ödeme ve katılımcı formlarındaki bazı kurallar henüz açık.

Bu dosyadaki **onaylandı** ifadesi bir gereksinimin veya kararın netleştiğini gösterir. Geliştirmede tamamlandığı ve test edildiği anlamına gelmez. Güncel kod için yeniden uygulama doğrulaması yapılmadığından tamamlanma yüzdesi verilmemiştir.

| Alan | Mevcut durum | Kalan konu |
| --- | --- | --- |
| Proje ve hedef tarih | WordPress sitesinin yeniden yazılması; hedef 1 Aralık 2026 | İlk yayının ayrıntılı kabul listesi |
| Marka ve tasarım | Logo korunacak; sade, samimi, kurumsal ve premium yaklaşım | Ana tasarımın müşteri onayı |
| Diller | TR, EN, FR ve DE onaylı | Çeviri hizmeti ve dil bazında onay işleyişi |
| Satış yöntemleri | Üç yöntem panelden ürün bazında seçilecek ve değiştirilebilecek | İlk yayındaki her ürünün yönteminin belirlenmesi |
| Tarih teyidi | Kesin tarihi Dragoman teyit edecek | Teyit ile ödemenin sırası müşteriye sorulacak |
| Katılımcı formları | Ürüne göre bilgi ve katılım formu isteniyor | Grup rezervasyonunda kişi bazında form konusu yanıtsız |
| Ödeme | Kart ve havale isteniyor; kapora değerlendirilecek | POS uygunluğu, tahsilat kuralları ve ticari ayrıntılar |
| İçerik taşıma | UBT mevcut WordPress içeriğini alacak | Nihai seçim, düzeltmeler ve eksik materyaller |
| Bildirimler | Kurumsal e-posta ve mümkünse “İşleme Aldım” bağlantısı | Güvenli uygulama yöntemi ve yetkili kişiler |
| Yayına geçiş | Gerçek alan adı ve kurumsal e-postalar korunacak | Hosting, yönlendirmeler, DNS ve yayın kontrolleri |

**Review özeti:** Bir ürün işlevi kararı onaylandı, bir konu müşteriye geri sorulmak üzere ayrıldı, son sorulan katılımcı formu sorusu henüz yanıtlanmadı. Ayrıca çalışma formatının bundan sonra yalnızca Markdown olması kararlaştırıldı.

## 2. Projenin kapsamı ve bağlantılar

Mevcut WordPress sitesi, içerikleri kaynak alınarak UBT tarafından yeniden yazılacak. Amaç yalnızca sayfaların tasarımını değiştirmek değil; bilgi edinme, iletişim, uygun ürünlerde satın alma, rezervasyon talebi ve işletme yönetimi süreçlerini uçtan uca hazırlamak.

| Kaynak | Adres | Kullanım |
| --- | --- | --- |
| Yenilenecek site | [dragoman-turkey.com](https://dragoman-turkey.com/) | İçerik ve mevcut adreslerin kaynağı; yayındaki ana alan adı |
| Mevcut şablonun deposu | [ubterzioglu/dragoman](https://github.com/ubterzioglu/dragoman) | Geliştirmenin mevcut başlangıç noktası |
| Geçici site | [notyetbro.club/en](https://notyetbro.club/en) | Şablonun geçici gösterim adresi |
| Tasarım ve kullanım referansı | [dragomanseakayak.com/tr](https://dragomanseakayak.com/tr/) | Sadelik, renkler, kullanım kolaylığı ve bazı panel örnekleri |

SeaKayak sitesi bu yenileme kapsamına dahil değildir. Yeni sitenin ayrıntılı sayfa haritası henüz müşteri tarafından sayfa sayfa onaylanmış değildir.

## 3. Müşteriden gelen marka ve iş hedefleri

### İşletmenin anlatımı

Dragoman; Kaş ve Kekova çevresinde dalış, deniz kanosu ve doğa etkinlikleri sunan, müşteri anlatımında 25 yılı aşan deneyime sahip bir alternatif turizm işletmesidir. Doğaya saygı, güvenlik, uzun süredir birlikte çalışan uzman ekip, dürüstlük ve güvenilirlik öne çıkarılacak. A sınıfı acente olarak uygun paketlerde havalimanından havalimanına organizasyon yapabilmesi anlatılacak.

Hizmet başlıkları dalış ve dalış eğitimleri, deniz kanosu, coasteering, yürüyüş, bisiklet, kültür turları, kamplı turlar, kişiye özel haftalık programlar ve dalışla bağlantılı yurtdışı turlarıdır. Ulaşım ve konaklamanın bağımsız hizmet olarak sunulması açık konudur.

Coasteering için kullanılan “Türkiye’de ilk ve tek” ifadesi, yayın öncesinde güncellik ve doğruluk açısından teyit edilecek.

### Hedef kitle ve erişim kanalları

- Türkiye’deki seyahat acenteleri.
- Dalış kulüpleri ve üniversite dalış kulüpleri.
- Bireysel müşteriler ve Kaş’ta bulunan ziyaretçiler.
- Öncelikle Türkiye, ardından Fransa ve İngiltere; daha sınırlı Almanya ve Amerika pazarları.
- Başlıca erişim kanalları Google, tanıdık tavsiyeleri, Instagram, acenteler ve daha düşük oranda oteller.

### Beklenen sonuç

Mevcut sitenin eski ve kullanıcı dostu olmayan yapısı değiştirilecek. Kısa ve öz bilgiyle başlayan, isteyenin ayrıntıya ilerleyebildiği bir deneyim kurulacak. Web kaynaklı iletişim ve satış artacak; profesyonellik ve uzmanlık daha görünür olacak. Telefon, tablet ve masaüstünde WhatsApp ve e-postaya erişim kolay olacak.

Müşteri sayısal başarı hedefi vermedi. Web kaynaklı iletişim, rezervasyon talebi, sipariş, ödeme tamamlanma oranı, organik trafik ve mobil form tamamlama gibi ölçümlerin yöntemi UBT ile belirlenecek.

## 4. Kesinleşen kararlar

### Müşteri briefinden gelen kararlar

| Konu | Karar | Kaynak |
| --- | --- | --- |
| Mevcut içerik | Kaynak olarak korunacak ve yeniden düzenlenecek; bloglar taşınacak | Soru 12, 28 ve 41 |
| Logo | Mevcut logo korunacak | Soru 23 |
| Tasarım | Sade, dinamik, samimi, kurumsal, premium ve kolay kullanılabilir | Soru 21–24 |
| Diller | Türkçe, İngilizce, Fransızca ve Almanca | Soru 7 ve Almanca teyidi |
| Kitaplar | Mevcut mağazadaki kitaplar satış kapsamına alınacak | Soru 25 |
| Satış yaklaşımı | Bazı ürünlerde doğrudan satın alma, koşullu ürünlerde form, diğerlerinde iletişim | Soru 14–15 ve 25 |
| Tarih | Müşteri tercih ettiği tarihi seçer; nihai teyit Dragoman’da kalır | Soru 26 |
| Ayrı müsaitlik takvimi | Ekibin ayrıca takvim güncellemesi zorunlu tutulmayacak | Soru 26 |
| İletişim | WhatsApp ve e-posta her sayfada ve tüm cihazlarda kolay görünür olacak | Soru 14 ve 50 |
| Bildirim adresi | Satış ve rezervasyon bildirimleri info@dragoman-turkey.com adresine gidecek | Soru 49 ve briefteki kurumsal adres |
| Çeviriler | Otomatik çevrilecek; yetkili kişi onayladıktan sonra yayınlanacak | Soru 45 |
| Dinamik vitrin | Tur, teklif, duyuru ve blog seçilebilen haberler/öne çıkanlar alanı olacak | Soru 28 |
| Google yorumları | Sitede gösterilecek; aktarım yöntemi UBT tarafından değerlendirilecek | Soru 20 |
| Revizyon ve kılavuz | Panelde revizyon talebi ve kısa, pratik yönetim kılavuzu isteniyor | Soru 46 ve 48 |
| Üyelik | İlk sürüm için gerekli değil; ileride eklenebilmesi düşünülüyor | Soru 28 ve 50 |
| Kurumsal e-postalar | Mevcut adresler korunacak | Soru 31 |

### UBT ile review sırasında alınan kararlar

| Kayıt | Tarih | Konu | Karar |
| --- | --- | --- | --- |
| R01 | 25 Ekim 2026 | Tarih teyidi ve ödeme sırası | Şimdi seçilmeyecek; müşteriye sorulacak açık konu olarak tutulacak |
| R02 | 25 Ekim 2026 | Ürün bazında satış yöntemi | Yönetim panelinden seçilecek ve sonradan değiştirilebilecek; seçenekler Doğrudan satın al, Form doldurarak satın al, İletişime geç |
| R03 | 25 Ekim 2026 | Doküman formatı | Bundan sonra güncellemeler yalnızca Markdown üzerinden yürütülecek |
| R04 | 25 Ekim 2026 | Müşteriye geri soruların başlığı | “Müşteriye sorulacaklar review sonrası” kullanılacak |

UBT review kararları, müşteri adına verilmiş yeni ticari kararlar olarak kaydedilmemiştir. Özellikle ödeme sırası, ürün fiyatları ve katılımcı kuralları hâlâ kendi karar durumlarıyla izlenir.

## 5. Satış ve rezervasyon gereksinimleri

### Panelden seçilecek üç yöntem

Yetkili kullanıcı her ürün veya hizmeti eklerken/düzenlerken satış yöntemini seçebilecek; seçimi sonradan değiştirebilecek. Ürün sayfasındaki temel işlem seçilen yönteme göre gösterilecek.

| Yöntem | Ziyaretçinin izleyeceği yol | Örnek |
| --- | --- | --- |
| Doğrudan satın al | Sepete ekler ve ödeme adımına ilerler | Kitap |
| Form doldurarak satın al | Ürüne bağlı formu doldurur; gerekli uygunluk değerlendirmesinin ardından satın alma adımına ilerleyebilir | Katılım koşulları olan dalış veya tur |
| İletişime geç | WhatsApp veya e-postayla işletmeye ulaşır | Görüşülerek planlanan hizmet |

Bu seçimin panelden yapılması **UBT tarafından onaylandı**. İlk yayındaki bütün ürünlerin hangi yöntemi kullanacağı henüz liste halinde kesinleşmedi.

### İlk satış ürünleri

Kitapların satışı müşteri tarafından isteniyor. Deneme dalışı, Kekova Klasik Kano Turu ve Kekova Tekne Turu ilk çevrimiçi satış için müşteri tarafından örnek olarak önerildi; ham yanıtta “olabilir” ifadesi kullanıldı. Bu üç hizmetin kesin ilk satış listesi olduğu varsayılmayacak. Hizmet içerikleri ve satın alınabilir ürün listesi ayrı ayrı netleştirilecek.

Önceki briefte kitap örnekleri olarak Méditerranée tropicale, The Diving Guide – Kaş, Tropical Mediterranean ve Tropikal Akdeniz kayıtlı. Nihai stok, dil/baskı, fiyat ve ürün listesi envanterde doğrulanacak.

### Form ve uygunluk kuralları

Ürünün gerektirdiği kişisel bilgi, sağlık veya katılım soruları gösterilecek. Hangi soruların sorulacağı ve hangi yanıtların ekip incelemesi gerektireceği ürün bazında belirlenmeli. İnsan incelemesi gereken yanıtlar otomatik uygunluk kararıyla geçiştirilmeyecek.

**Henüz yanıtlanmayan review sorusu:** Bir kişi üç kişilik dalış satın alırsa katılım formu her katılımcı için ayrı mı doldurulacak, yoksa rezervasyonu yapan kişinin formu yeterli mi? Bu konuda karar alınmadı ve henüz “müşteriye sorulacak” diye sınıflandırılmadı; UBT’nin yanıtı bekleniyor.

Çocuklar/veli onayı, grup bilgilerinin nasıl toplanacağı ve eksik formun rezervasyonu nasıl etkileyeceği ayrıca netleştirilecek.

### Tarih teyidi

Kesin rezervasyon tarihi Dragoman tarafından teyit edilecek; ayrı bir müsaitlik takvimi güncellemesi zorunlu tutulmayacak. **Ödemenin tarih teyidinden önce mi sonra mı alınacağı kararlaştırılmadı.** Müşteriye sorulacak kayıt Bölüm 12’de.

## 6. Ödeme ve kitap teslimatı

### Müşterinin istediği ödeme seçenekleri

- Kredi kartı ile ödeme.
- IBAN’a havale.
- Teknik ve ticari olarak mümkünse kapora; hangi ürünlerde uygulanacağı açık.

İlk tercih Yapı Kredi Sanal POS/POSNET’in uygunluğunun araştırılması; uygun olmazsa iyzico değerlendirilmesi. Ödeme sağlayıcısı kesinleşmiş değil. Havale gönderildiğinin bildirilmesi, siparişi tek başına ödenmiş saydırmayacak; ödeme teyidi gerekecek.

### Açık kalan ayrıntılar

| Alan | Netleştirilecek konu | Sorumluluk |
| --- | --- | --- |
| POS | Başvuru, entegrasyon erişimi, komisyon, para birimleri, yabancı kartlar, 3D Secure ve iadeler | UBT teknik inceleme; müşteri/banka ticari bilgi |
| Fiyat | Kişi veya grup fiyatı, sezon, çocuk, ekipman, transfer ve diğer ekstralar | Müşteri |
| Para birimi | Gösterilecek ve tahsil edilecek para birimi | Müşteri ve ödeme altyapısı incelemesi |
| Kapora | Ürünler, oran/tutar, kalan ödeme zamanı ve yöntemi | Müşteri; teknik uygulama UBT |
| Havale | Siparişin bekleme süresi, kontrol yetkisi ve teyit biçimi | Müşteri işleyişi; teknik uygulama UBT |
| Tarih uygun değilse | Alternatif tarih, iptal, iade ve müşteriye gösterilecek açıklama | Müşteri |
| Kitap gönderimi | Ülkeler, kargo bedeli, teslim süresi ve ofisten teslim | Müşteri |
| Kitap stokları | Stok takibi, dil/baskı seçenekleri ve tükenen ürün davranışı | Müşteri kuralı; teknik uygulama UBT |

## 7. İçerik yönetimi, çeviri ve bildirimler

### Yönetim paneli

İşletme teknik bilgi gerektirmeden ürün ekleyebilmeli, düzenleyebilmeli ve yayından kaldırabilmeli. Ürünün satış yöntemi seçilebilmeli; koşullu ürünlerde form türü ayarlanabilmeli. Fotoğraf oranları ve yerleşim tutarlı kalmalı.

Blog oluşturma/düzenleme, eski blogları taşıma, haberler ve öne çıkanlar alanında içerik seçme, SeaKayak paneline benzer revizyon talebi ve kısa yönetim kılavuzu kapsamda.

Ana yöneticinin kullanıcılara alan bazında yetki verebilmesi isteniyor. Teknik uygunluk veya ilk yayın takvimi buna elvermezse belirli yöneticilerin erişimiyle başlama seçeneği müşteri yanıtında var. Nihai yetki modeli ve kişiler kesinleşmedi.

### Diller ve çeviri onayı

Onaylı diller TR, EN, FR ve DE. İçerikler otomatik çevrilecek; çeviriler yetkili kişi onayından sonra yayınlanacak. Müşterinin çevirileri kendisinin üretmesi beklenmiyor.

Kaynak dil, çeviri hizmeti/maliyeti, her dilin onaylayıcısı ve ana metin değişince eski çevirilerin nasıl ele alınacağı açık. Rusça site sürümü onaylanmış değil; Rusça arama kelimelerinin araştırılması ayrı bir pazarlama konusu.

### İletişim ve işletmeye devir

Her sayfada masaüstü, tablet ve telefondan WhatsApp ve e-posta erişimi bulunacak. Satış/rezervasyon bildirimleri info@dragoman-turkey.com adresine gidecek; mevcut kurumsal e-postalar korunacak.

Müşteri, e-postada güvenli bir **“İşleme Aldım”** bağlantısı istiyor. İşlemi kimin üstlendiği kaydedilmeli ve diğer yetkililer görebilmeli. Ayrı “Tamamlandı” düğmesiyle ek iş yükü istenmiyor. Bağlantının güvenli uygulanabilirliği UBT tarafından değerlendirilecek.

Yetkili çalışanlar, talep üstlenilmezse yapılacaklar ve bilgilerin mevcut rezervasyon işleyişine elle mi entegrasyonla mı aktarılacağı henüz netleşmedi.

## 8. Tasarım, içerik taşıma ve sayfa yapısı

### Tasarım yönü

Mevcut logo korunacak. Logo ve SeaKayak renkleri başlangıç alınacak; denizi, doğayı ve güveni çağrıştıran tasarım önerilerine müşteri açık. SeaKayak’taki sadelik ve kolaylık örnek alınacak. Ana tasarım hazır olduğunda müşteri görecek; gösterim aşamalarını UBT önerecek.

### İçerik taşıma ve sorumluluklar

UBT WordPress erişimini almış durumda. Sayfa, hizmet, ürün, blog, görsel ve eski URL dökümünü çıkaracak. Müşteri ekleme/çıkarma/düzeltmeleri takip edecek. **Soru 17–18’deki içerik seçimi ve metin uzunluğu kararı UBT’ye devredilmedi; müşteri daha sonra bildirecek.**

Yeni fotoğraf/video ihtiyacını UBT önce mevcut materyali değerlendirerek listeleyecek. Müşterinin materyal için zamanı sınırlı; yeni teslim tarihi belirlenmedi.

### Önerilen sayfa grupları

Aşağıdaki yapı planlama önerisidir; nihai menü ve URL onayı değildir.

| Sayfa grubu | İçerik | Kapsam durumu |
| --- | --- | --- |
| Ana sayfa | Marka, deneyimler, haberler ve hızlı iletişim | Temel beklenti |
| Hakkımızda | Hikâye, değerler, ekip ve uzmanlık | Önerilen sunum |
| Dalış | Dalış hizmetleri, deneme dalışı ve kurslar | Hizmet kapsamı belli; ürün/sayfa ayrıntıları açık |
| Deniz kanosu ve tekne turları | Kekova ve ilgili programlar | İçerik ve ürün akışları netleştirilecek |
| Diğer etkinlikler | Coasteering, yürüyüş, bisiklet, kültür, kamplı ve kişiye özel turlar | Hizmet kapsamı |
| Yurtdışı dalış turları | Dalışla bağlantılı uluslararası programlar | Hizmet kapsamı |
| Mağaza | Kitaplar ve kararlaştırılacak diğer ürünler | Satış beklentisi belli; envanter açık |
| Sepet ve ödeme | Uygun ürünlerin satın alınması | Satış kapsamının parçası; ayrıntılar açık |
| Blog ve haberler | Eski/yeni yazılar ve seçilebilir öne çıkanlar | Müşteri isteği |
| İletişim | WhatsApp, e-posta ve işletme bilgileri | Müşteri isteği |
| Yasal sayfalar | Gizlilik, satış, katılım, iptal/iade ve gerekli izin metinleri | Yayın öncesi hazırlanacak |
| Sık sorulan sorular | Tekrarlanan sorular | Karar bekliyor |
| Ulaşım ve konaklama | Bağımsız hizmet sayfası | Karar bekliyor |
| Üyelik ve avantajlar | Hesap ve üye indirimi | Sonraki aşama |

## 9. Teknik hazırlık ve önceki şablon incelemesi

### UBT’nin değerlendireceği teknik işler

| Konu | Gereken çalışma |
| --- | --- |
| Barındırma | Mevcut Flywheel’den sonraki altyapı, hesap sahipliği, masraflar ve geçiş planı |
| Alan adı ve e-posta | Gerçek alana geçiş, DNS/posta kayıtları ve kurumsal e-postaların korunması |
| Ödeme | POS uygulanabilirliği, ödeme bildirimleri ve sipariş/ödeme durumları |
| Yetkiler | Yönetici erişiminin uygulama ve veri katmanında sınırlandırılması |
| Çeviri | Otomatik çeviri ve dil bazında onay düzeni |
| Bildirim | E-posta gönderimi, güvenli işleme alma bağlantısı ve sahiplenme kaydı |
| İçerik | WordPress envanteri, medya aktarımı, ürün yönetimi ve revizyon talepleri |
| İşletim | Yedekleme/geri yükleme, hata takibi ve gerekirse yayın sonrası bakım |
| Arama ve ölçüm | Eski URL yönlendirmeleri, kalıcı QR hedefleri, canonical, sitemap, dil ilişkileri ve ölçüm |
| Kullanım | Telefon, tablet, masaüstü, erişilebilirlik ve performans kontrolleri |

### Önceki incelemeden kalan kontrol notları

Önceki görüşmede yapılan kod ve sayfa incelemesinde React/Vite ve Supabase tabanlı bir şablon, rezervasyon talep formu ile blog/galeri/yorum/revizyon alanları görüldüğü aktarılmıştı. Aşağıdaki bulgular o incelemenin notlarıdır; bu doküman hazırlanırken repo veya canlı site yeniden test edilmedi. Güncel uygulama durumu UBT tarafından doğrulanacak.

| Önceki bulgu | Gereksinime etkisi |
| --- | --- |
| EN/TR/FR vardı; DE görünmüyordu | Almanca sürümü ve dört dil kapsamı kontrol edilecek |
| Mağaza listeleme ve iletişime yönlendirme yapıyordu | Sepet, ödeme ve sipariş akışı doğrulanacak/tamamlanacak |
| Ürün/tur içeriği kodda tutuluyordu | Panelden ürün ve satış yöntemi yönetimi kontrol edilecek |
| Form temel iletişim/tarih/kişi sayısı topluyordu | Ürüne özel katılım ve uygunluk formları tamamlanacak |
| Gönderimde Supabase kaydı ve WhatsApp görülmüştü | E-posta bildirimi ve işleme alma akışı kontrol edilecek |
| Genel dört dil çeviri/onay akışı görünmüyordu | İçerik türleri için çeviri ve onay süreci kurulacak |
| İçerik ve ana sayfa kano ağırlıklıydı; kitap envanteri farkı vardı | Hizmet dengesi ve tam içerik/ürün envanteri gözden geçirilecek |
| Geçici alan adı, tarama engeli ve farklı e-posta adresi vardı | Gerçek alan adıyla yayın ayarları ve kurumsal adresler doğrulanacak |
| Rezervasyon veri yetkileri ve panel durum raporu için kontrol gerekiyordu | Canlı yetkiler ve “tamamlandı” kayıtları gereksinim bazında doğrulanacak |

## 10. Ticari çerçeve ve yayın hedefi

| Konu | Müşteri kaydındaki durum |
| --- | --- |
| İlk geliştirme | Site yayına girene kadar 250 € + masraflar kararlaştırılmış |
| Yayın sonrası bakım/ek hizmet | 25 €/saat önerilmiş; müşteri yeniden görüşülebileceğini belirtmiş, son onay açık |
| Masraflar | Kalemleri henüz kesinleştirilmemiş |
| Hedef ilk yayın | 1 Aralık 2026 |
| İlk yayın gerekçesi | Temel sayfalar ve bağlantılar çalışmalı; QR kodlu materyaller hazırlanabilmeli |
| Karar vericiler | Müşteri ve Draman |
| Tasarım onayı | Genel tasarım hazır olduğunda müşteri görmek istiyor |

Banka/POS onayı, içerikler veya gerekli metinler gecikirse ilk yayında hangi özelliklerin ertelenebileceği belirlenmedi. İletişim/rezervasyon talebiyle sınırlı bir yayın, onaylanmış alternatif plan olarak kabul edilmeyecek; ayrıca kararlaştırılmalı.

## 11. Müşteriden beklenen karar ve materyaller

Bu liste ilk briefte açık kalanlarla önceki değerlendirmede belirlenen ayrıntıları toplar. Tamamının müşteriye yeni soru olarak iletildiği veya yanıtlandığı anlamına gelmez. Review’de açıkça müşteriye ayrılan kayıt Bölüm 12’dedir.

| Beklenen | Durum | İlgili kaynak |
| --- | --- | --- |
| Taşınacak/güncellenecek/çıkarılacak içerikler ve detay düzeyi | Müşteri daha sonra bildirecek | Soru 17–18, 41 |
| Güncel tur, kurs, kitap, fiyat ve satış listesi | Ürün bazında tamamlanacak | Soru 25, 41–42 |
| Yeni fotoğraf/video ve gerekirse uygun logo dosyası | Eksik listesi ve teslim zamanı açık | Soru 19, 23, 42 |
| Katılım/sağlık formu soruları ve değerlendirme kuralları | Açık | Soru 25–26 |
| Tarih, ödeme, kapora, havale ve iade kuralları | Açık | Soru 26–27 |
| Kitap kargo, teslim, stok ve dil/baskı kuralları | Açık | Satış akışını tamamlama ihtiyacı |
| İptal/iade ve katılım koşulları | Kısmen belli; müşteri gözden geçirecek | Soru 32 |
| İşletme adına onaylı yasal metinler | Hazır değil; gerektiğinde hukuki destekle tamamlanacak | Soru 32–33 |
| Bildirim/işleme alma yetkilileri ve içerik onaylayıcıları | İsim ve yetki listesi açık | Soru 34, 45, 49 |
| Sosyal medya bağlantıları ve Google kaynağı/erişimi | Kesin bağlantılar doğrulanacak | Soru 20, 35–36 |
| Ulaşım ve konaklama ile SSS kararı | Açık | Soru 2, 28 |
| İlk yayın kabul listesi ve erteleme koşulları | Açık | Soru 43 |
| Bakım ücreti ve masraf kalemleri | Son onay/ayrıntı açık | Soru 39 |

Gizlilik, gerekli aydınlatma/izinler, satış ve hizmet koşulları işletme adına hazırlanıp onaylanacak. Sağlık bilgisi toplanacaksa kapsam, erişim, saklama ve silme kuralları da belirlenmeli. UBT’nin görevi teknik uygulamadır; hukuki içerik uygunluğu kendiliğinden UBT’ye devredilmiş değildir. Çerez izin sisteminin teknik çözümü Soru 33’te UBT’ye bırakılmıştır.

## 12. Müşteriye sorulacaklar review sonrası

Bu bölüm review sırasında müşteriye geri sorulmasına açıkça karar verilen konuları izler.

### Geri soru 01 — Tarih teyidi ve ödeme sırası

**Durum:** Müşteriye sorulacak; yanıt alınmadı.  
**Soruyu iletecek:** UBT.  
**Karar verecek:** Müşteri ve Draman.  
**Dayanak:** Soru 26–27 ve UBT review kararı R01.

**Soru:** Tarih seçilerek alınan etkinliklerde önce ekip tarihi ve katılım koşullarını değerlendirip onayladıktan sonra mı ödeme alınacak, yoksa müşteri önce ödeme yapıp ekip tarihi daha sonra mı teyit edecek? İşleyiş ürüne göre değişecek mi?

**Tamamlayıcı soru:** Ödeme tarih teyidinden önce alınacaksa istenen tarih sağlanamadığında alternatif tarih, iptal ve iade nasıl yönetilecek?

**Review sonucu:** Şimdilik bir akış seçilmeyecek. Müşteri yanıtından sonra satış ve rezervasyon gereksinimleri güncellenecek. Önce teyit/sonra ödeme yaklaşımı önceki değerlendirmede bir öneriydi; kabul edilmiş karar değildir.

## 13. Review’de sıradaki açık soru

**Konu:** Grup rezervasyonlarında katılımcı formu.

**UBT’ye sorulan ve henüz yanıtlanmayan soru:** Bir kişi üç kişilik dalış satın alıyorsa katılım formu her katılımcı için ayrı ayrı mı doldurulmalı, yoksa rezervasyonu yapan kişinin formu yeterli mi?

Bu konuda “kişi başına form” veya “tek rezervasyon formu” kararı alınmadı. Yanıt geldiğinde Bölüm 5 güncellenecek; müşteriye sorulması istenirse Bölüm 12’ye ayrıca kaydedilecek.

## 14. Yayın için kontrol edilecekler ve sonraki adımlar

### Önerilen yayın kontrol listesi

Aşağıdakiler gereksinimlerden türetilen kontrol başlıklarıdır. Kontrollerin geçtiği veya ayrıntılı kabul listesinin müşteri tarafından onaylandığı kaydı değildir.

- [ ] İlk yayın ürün listesi ve her ürünün satış yöntemi belirlenmiş.
- [ ] Ürün ekleme, düzenleme, yayından kaldırma ve satış yöntemi değiştirme çalışıyor.
- [ ] Dört dilde içerik ve çeviri onayı kontrol edilmiş.
- [ ] Formlar, grup/katılımcı kuralları ve gerekli insan incelemesi tanımlanmış.
- [ ] Tarih teyidi ile ödeme sırası müşteriyle kesinleştirilmiş.
- [ ] Sepet, ödeme başarı/başarısızlık, tekrarlanan ödeme bildirimi, havale ve varsa kapora akışları kontrol edilmiş.
- [ ] Kitap stok, kargo ve teslim kuralları uygulanmış.
- [ ] E-posta teslimi ve seçilen işleme alma yöntemi kontrol edilmiş.
- [ ] Yönetici yetkileri ve veri erişimi doğrulanmış.
- [ ] İçerik envanteri, görseller ve müşteri düzeltmeleri tamamlanmış.
- [ ] Hukuki metinler ve gerekli izinler onaylanıp yerleştirilmiş.
- [ ] Telefon, tablet ve masaüstü kullanım kontrolleri yapılmış.
- [ ] Gerçek alan adı, kurumsal e-posta, sitemap, canonical ve tarama ayarları kontrol edilmiş.
- [ ] Eski URL yönlendirmeleri ve QR kod hedefleri doğrulanmış.
- [ ] Yedekleme ve geri yükleme düzeni belirlenmiş.
- [ ] Tasarım, ilk yayın kapsamı ve kısa yönetim kılavuzu teslimi onaylanmış.

### Önerilen ilerleme sırası

1. Review’deki katılımcı formu sorusundan devam et.
2. Ürün ve hizmet listesini satış yöntemi, fiyat, form, tarih ve ödeme kuralıyla tamamla.
3. Müşteriye ayrılan tarih–ödeme sorusunu netleştir; diğer açık kararları review’de ele al.
4. WordPress içerik/URL envanterini ve müşteri düzeltmelerini tamamla.
5. Teknik incelemelerle kesin uygulama kapsamını ve yayın kabul listesini oluştur.
6. Geliştirme ve doğrulamayı bu kararlar üzerinden takip et.

## 15. Müşterinin ilk görüşmedeki yanıtları

Aşağıda cevapların **özlü ham kayıtları** bulunur: mümkün olan yerlerde müşterinin kendi sözleri korunmuştur; birden fazla mesajla tamamlanan cevaplar birleştirilmiştir. **Soru 3 bir görselle yanıtlandığı için** kabul edilen görüşme özetinden aktarılmıştır. Bu bölüm tasarım kararlarının yerine değil, kararların izlenebilirliği için eklenmiştir.

- **Soru 1:** “Dragoman; yaklaşık 25 yıldır, bireysel birikimlerini alternatif turizm alanına taşımayı amaçlayan; emek verdiğimiz Kaş-Kekova Deniz Koruma Alanı'nda, su altında veya Likya patikalarında, Akdeniz'in kucağında sizlere tecrübelerini ve doğa sevgilerini sunarak en yüksek ve emniyetli standartlarda hizmet vermeyi bir yaşam şekli olarak seçenlerden oluşuyor… Dalış, Deniz Kanosu, türkiyede tek ve ilk Coasteering, bisiklet ve yürüyüs turları, kültür turları ve kamplı turlar, haftalık tailor made turlar, yurtdısı dalıs turları hepsini yapıyor.”

- **Soru 2:** “dalıs seakayak, doga sporları, yurtdısı turlar ama dalısa baglı, belki transport ve konaklama”

- **Soru 3:** Görselle verilen ve bölüm özetinde kabul edilen içerik: 25 yılı aşan bölge deneyimi; lisanslı/profesyonel rehberler; güvenlik; küçük gruplar; konforlu organizasyon; deneyim seviyesine uygun yaklaşım.

- **Soru 4:** “yaz kıs hizmet vermesi, uzun süredir calısan güvenilir, işini seven ve isinde uzman personel, a sınıfı seyahat acentesi olarak havalimanından havalimanına tüm hizmetleri verebilmesi, dürüst ve güvenilir bir işletme olması”

- **Soru 5:** “daha cok türkiye den acenteler, dalış ve universite dalıs klüpleri, bireysel müşteriler ve kapı müsterileri”

- **Soru 6:** “once türkiye sonra fransa ingiltere cok az almanya ve amerika”

- **Soru 7:** “tr eng fr ve bence de”; Almanca kastedildiği sorularak netleştirildi: “evet”.

- **Soru 8:** “genellikle google, bazen istagram, tanıdıklar da agırlıklı oluyor, otellerden daha az , acenteler de var tabii”

- **Soru 9:** “yok.”

- **Soru 10:** “her seyi”

- **Soru 11:** “wp nin eski bir sistem olması, user friendly olmaması, sitenin kötü olması ve düzeltilememesi.”

- **Soru 12:** “icerik korunacak, fakat tasarım degisecek, daha user friendly kısa ve oz, kolay okunacak ve isteyenin ilerlemesine müsade edecek, adfmin panelinde herkesin rahatca ürün ekleyip cıkarabileceği, ve standart olcülerin de korunabileceği bir tasarım. Daha aktif.”

- **Soru 13:** “kesinlikle iletisimi hızlandırmalı, rezervasyon ve bazı ürünlerin satısını kolaylastırmalı, profesyonelliğimizi, cagı yakaladığımızı ve isimizin en iyisi oldugumuzu gostermeli.”

- **Soru 14:** “yueterli bilgiyi edinerek rezervasyon asamasında formlarını da doldurmasını ve gerekli bilgileri bize göndererek odemesini de yapıp hemen ürünü satın alabilmesini, ya da yazmak istiyorsa sadece bize yazmasını, kolayca bizimle iletişim kurabilmesini whatsapp ve mail ne isterse”

- **Soru 15:** “evet bazı ürünleri dogrudan satabilmek bazıları için de sadece bize yazmalarını istiyoruz”

- **Soru 16:** “web sitesinden iletişimin ya da satısların artması, su anda neredeyse hic yok”

- **Soru 17:** “bunları degerlendirip barıs a soyleyeceğiz.” Sonradan açık düzeltme: “ubte ye bırakılacak degil sonra verilecek”.

- **Soru 18:** “bunu da barıs a soyleyeceğiz, zaten kayak sitesinden biliyor.” Sonradan açık düzeltme: “ubte ye bırakılacak degil sonra verilecek”.

- **Soru 19:** “hazır olanlar da var yeni vermemiz gerekenler de”

- **Soru 20:** “yorumlar olacak google a baglanacak”

- **Soru 21:** “daha dinamik, samimi, kurumsal ve elbette premium, kafa karıstırmayan, acık, hızlıca cevap veren”

- **Soru 22:** “[https://dragomanseakayak.com/tr](https://dragomanseakayak.com/tr) burada kullandıgımız renkler, logomuzun renkleri öncelikli kullanacağız tabii. Bunun dısında profesyonel bir tasarımcı gözüyle vereceğin fikirlere açıgım, denizi, dogayı, güveni çagrıstıran renkler seçilmeli.”

- **Soru 23:** “mevcut logomuzu koruyacagız.”

- **Soru 24:** “özellikle aklıma gelen bir site yok, seakayak sitesini de yeni yaptık onu begeniyorum sadelik ve kolaylık acısından”

- **Soru 25:** “su an burada [https://dragoman-turkey.com/shop/](https://dragoman-turkey.com/shop/) yer alan kitaplara ek olarak deneme dalışı, kekova klasik kano turu ve kekova tekne turu olabilir. Burada istediğimiz zaman yeni bir ürün kolaylıkla ekleyebilmemiz lazım.” Ek açıklama: Kitap sepete doğrudan girebilmeli; turlar/dalışta koşula göre bilgi ve sağlık formları doldurulmalı, uygun müşteri sonrasında satın alabilmeli.

- **Soru 26:** “Tarihi biz teyid ederiz ama. çünkü girip sitede ayrı ayrı işlememiz gerekiyorsa biz onu unuturuz.”

- **Soru 27:** “kredi kartıyla ödeme, iban a gönderme,mümkünse sadece kapora ödeme seçeneği de olabilir. Yapı kredi kullanıyoruz, online ödeme sistemi var sanki sanal pos gibi bir şey yapılabiliyorsa (araştır) bununla yapmak istiyorum, yoksa iyzico kullanacagız”

- **Soru 28:** “blog kesillikle olacak. Halihazırdaki sitedekiler de tasınacak oraya. belki sık sorulan sorular eklenebilir, düşünürüz belki de gereksiz. Üyelik sistemi isterim mesela özel indirimler veririz vs. ama belki hemen değil de sistem bunu yapmak için uygun hazırlanabiliyorsa harika olur. kampanyalar değil ama haberler gibi dinamik bir alan, öne cıkarmak istediğimiz turları, teklifleri, ya da blog yazılarını koyabileceğimiz bir yer olmalı.”

- **Soru 29:** “bizde var, ubt de aldı” (hangi soruya ait olduğu daha sonra açıkça “29” olarak düzeltildi).

- **Soru 30:** “flywheel, ubt devamını bize soyler”

- **Soru 31:** “evet” (mevcut kurumsal e-postalar korunacak).

- **Soru 32:** “hazır degil, iptel koşulları biraz bellli ama üstünden geçmem gerekiyor.”

- **Soru 33:** “ubt ye bırakıyorum”

- **Soru 34:** “mümkün olsa belli kişilerin belli yerlere erişimini bir admin in yönetmesini elbette isterim. yok olmuyorsa belirli yöneticiler yani cogunlukla ben”

- **Soru 35:** “evet” (Google İşletme Profili var).

- **Soru 36:** “instagram facebook youtube”

- **Soru 37:** “evet” (ücretli reklam düşünülüyor).

- **Soru 38:** “Kaş'ta dalış, Kaş tatil, Kekova seakayak ya da deniz kanosu, kaş ta yürüyüş turları, tekne turları, Kaş open water kursu, Kaş deneme Dalışı vs vs liste uzun tabii nigilizceleri almancaları, fransızcaları ruscaları”

- **Soru 39:** “ubt ile kararlaştırıldı. başlangıc olarak site hizmete girene kadar çalışmaları için 250 eur + masraflar. sonrasında vereceği düzenli bakım, ekstra hizmetler vs için 25 Eur / saat ama bu belki biraz fazla bakıcaz.”

- **Soru 40:** “ben ve draman”

- **Soru 41:** “eski siteden kendisi çekecek, ekleme cıkarma ve düzeltmeleri ben takip edeceğim.”

- **Soru 42:** “giriş yetkilerini aldı, word press e girebiliyor, onun dışında ihtiyacları nedir bilmiyorum, mümkünse fotograf vs cok zaman ben harcayamayabilirim su anda”

- **Soru 43:** “temel özellikler ve sayfalarıyla hazır olması önemli, linklerin çalışır olması lazım ki karekodlar vs yapılabilsin.”

- **Soru 44:** “kendisi karar versin. ama tasarım hazır olduğunda genel hatlara bankmak isterim tabii.”

- **Soru 45:** “belirlediğimiz kişiler çoğunlukla ben. ama dil desteği olmalı, ben çevirmeyeceğim yani.” Açıklama: “evet. cevirsin ancak biz onaylayalım.”

- **Soru 46:** “tabii ki”. Açıklama: “kılavuzun sayfa sayfa olmasına gerek yok, kısaca acıklamalar olması yeterli”.

- **Soru 47:** “ğer düzenli bir bakım gerekiyorsa ubt.”

- **Soru 48:** “seakayak admin panelinde de revizyon talebi oluşturuyoruz o güzel.”

- **Soru 49:** “info adresine direk düşmeli. mümkünse o mailde bir onay olabilir miydi acaba gördüm işlem yapıyorum gibi. kayakta siteye koymustu barıs ama o cok aktif kullanılamıyor. Bunu konusalım nasıl yapabiliriz.” Öneri sonrası: “harika bu yapılabiliyorsa işleme alsa zaten gerisi rezervasyondan devam eder. sanki ekstradan tamamlandı yüküne gerek yok.”

- **Soru 50:** “üyelik sistemi düşüneceklerimiz arasında ilk seferde olmasına gerek yok. Bütün bunların yanında bir de konustuk mu bilemedim ama direk satın alınamyan seyler için direk e mail at whatsapptan son vs gibi seceneklerin her sayfada kolayca görünür olması lazım, hem bilgisayar hem de telefondan tabletten girişlerde”
