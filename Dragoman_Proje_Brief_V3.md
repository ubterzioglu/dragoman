# Dragoman web sitesi yenileme projesi — Brief V3

**Tarih:** 26 Ekim 2026  
**Hedef MVP yayını:** 1 Aralık 2026  
**Geliştirici ve teknik işletim:** UBT (Umut Barış Terzioğlu)  
**İşletme ve nihai yayın kararı:** Dragoman; müşteri ve Murat Draman  
**Belge durumu:** Kapsam ve karar kaydı. Bir özelliğin burada yer alması, geliştirildiği veya testten geçtiği anlamına gelmez.

## 1. Amaç, kaynaklar ve karar dili

Dragoman'ın mevcut WordPress sitesi yeniden hazırlanacak. Site Kaş ve Kekova çevresindeki dalış, deniz kanosu, doğa ve kültür etkinliklerini açık biçimde tanıtacak; ziyaretçilerin doğru ürüne ulaşmasını, iletişim kurmasını ve uygun ürünlerde rezervasyon talebi veya satın alma başlatmasını sağlayacak. İçerik kısa bir özetle başlayacak, ayrıntı isteyenler ilerleyebilecek. Telefon, tablet ve masaüstü kullanımı birlikte tasarlanacak.

Bu belge, müşterinin ilk 50 yanıtını içeren [önceki brief](./Dragoman_Proje_Brief.md), yüklenen `Dragoman_Proje_Brief_V2(1).md` temelinin bu çalışma alanına aktarılmış V3 taslağı ve **BRIEF EXTENTIONS** görüşmesinde erişilebilen review kararları birleştirilerek hazırlanmıştır. Önceki görüşmenin son dört yanıtı doğrudan görülebilmiştir: dış servis sahipliği (22/25), aşamalı yayın (23/25), test ve kabul (24/25), bakım ve değişiklik yönetimi (25/25). 1–21 arasındaki soru metinleri bu oturumda tek tek geri getirilemediği için bu sorulara hayalî alıntı veya numara atanmamıştır; önceki taslaktaki somut kararlar konu bazında korunmuştur. Bu kaynak sınırı, aşağıdaki açık kararların onaylanmış gibi yorumlanmaması için kaydedilmiştir.

**Durum terimleri:** **Karar** müşteri briefinde veya UBT review'unda açıkça kabul edilen kuraldır. **MVP** 1 Aralık'ta hedeflenen kapsamdır. **Sonraki faz** ilk yayından sonra ayrıca hazırlanıp etkinleştirilecek iştir. **Açık** müşteri, UBT veya hizmet sağlayıcısından bilgi/onay bekleyen konudur. Teknik tercih ve hukuki uygunluk, ticari kararın yerini almaz.

## 2. Marka, hedef kitle ve tasarım

Dragoman, Kaş ve Kekova'da 25 yılı aşan bölge deneyimi, güvenlik, doğaya saygı, uzman ve uzun süredir birlikte çalışan ekip, dürüstlük ve güvenilirlik üzerinden anlatılacak. A sınıfı seyahat acentesi olarak uygun paketlerde havalimanından havalimanına organizasyon yeteneği gösterilecek. Dalış ve eğitim, deniz kanosu, coasteering, yürüyüş, bisiklet, kültür ve kamplı turlar, kişiye özel haftalık programlar ve dalış bağlantılı yurtdışı turları hizmet envanteridir. Ulaşım ve konaklamanın bağımsız satış ürünü olup olmayacağı açık kalır. “Türkiye'de ilk ve tek” gibi üstünlük ifadeleri yayından önce Dragoman tarafından doğrulanır.

Hedefler Türkiye'deki seyahat acenteleri, dalış ve üniversite kulüpleri, bireysel müşteriler ve Kaş ziyaretçileridir. Türkiye ilk pazar; Fransa ve İngiltere sonraki öncelikler, Almanya ve ABD daha sınırlı pazarlardır. Google, tavsiyeler, Instagram, acenteler ve oteller mevcut erişim kanallarıdır. Mevcut logo korunur. Tasarım sade, dinamik, samimi, kurumsal ve premium olur; SeaKayak sitesinin kullanım kolaylığı ve marka renkleri referanstır. Nihai ana tasarım Dragoman'a gösterilip onaylanır.

## 3. Faz ve yayın kapsamı

| Alan | 1 Aralık 2026 MVP | Sonraki faz / etkinleştirme koşulu |
| --- | --- | --- |
| Kurumsal site | Temel sayfalar, hizmet/ürün tanıtımları, blog/haberler, iletişim, çalışan kalıcı bağlantılar | Yeni içerik türleri ve genişletilmiş kampanya işlevleri ayrı talep |
| Dil | Türkçe, İngilizce, Fransızca, Almanca; yayınlanan metinler yetkili onayından geçmiş | Ek dil ancak ayrı karar; Rusça arama terimi çalışması Rusça site sürümü demek değildir |
| SEO | Teknik temel, indekslenebilir sayfalar, dil ilişkileri, yönlendirmeler, site haritası, QR hedefleri | İçerik büyütme, kampanyalar ve ileri analiz sürekli iş |
| İletişim | Her sayfada kolay erişilen WhatsApp ve e-posta, çalışan iletişim formları | Gelişmiş CRM/otomasyon ayrıca değerlendirilir |
| Ürün ve rezervasyon | Ürünler ve satış yöntemi görünür; tarih tercihli rezervasyon **talebi** alınır ve Dragoman tarafından teyit edilir | POS açıldığında uygun ürünlerde çevrimiçi tahsilat; otomatik rezervasyon/kapora yalnızca kuralları onaylanınca |
| Ödeme | POS hazır değilse yayında ödeme alınıyormuş izlenimi verilmeyecek; onaylı iletişim veya talep akışı kullanılır | Yapı Kredi POSNET öncelikle araştırılır, uygun değilse iyzico; güvenli canlı test ve ticari onayla açılır |
| Fatura | Sipariş/rezervasyon verileri faturaya elverişli biçimde tutulur; zorunlu bilgiler netleştirilir | e-Fatura entegrasyonu sağlayıcı, mali süreç ve testler hazır oldukça açılır |
| Gelişmiş yönetim | İlk yayına gerekli içerik ve talep yönetimi | Gelişmiş yetki, üyelik/indirim, ek bildirim ve otomasyonlar önceliklendirilerek açılır |

MVP, doğrudan ödeme alınmadan da ürün ve rezervasyon talebinin çalışabildiği **aşamalı yayın** olarak kararlaştırılmıştır (23/25). Önceki taslakta “iletişim/rezervasyonla sınırlı yayın ayrıca onaylanmalı” kaydı vardı; 23/25 yanıtı bu faz ayrımını günceller. Bununla birlikte MVP'de hangi ürünün hangi işlem düğmesiyle açılacağı ve müşteriye hangi ödeme vaadinin gösterileceği ürün listesinde onaylanmalıdır. Yasal metinler, veri izinleri ve güvenli talep toplama olmadan ilgili akış yayına alınmaz.

## 4. Sayfalar ve içerik göçü

MVP sayfa grupları: ana sayfa; Dragoman/hakkımızda ve ekip; dalış ve eğitimler; deniz kanosu/Kekova; diğer doğa ve kültür etkinlikleri; yurtdışı dalış turları; kitaplar ve diğer ürünler; blog/haberler; iletişim; gerekli yasal metinler. Kesin menü, URL listesi ve her hizmetin ayrı sayfa olup olmayacağı içerik envanterinde belirlenir. Haberler/öne çıkanlar alanında tur, teklif, duyuru veya blog yazısı panelden seçilebilir. SSS bölümü henüz karar değildir.

UBT mevcut WordPress'ten sayfa, ürün, blog, görsel ve URL envanteri çıkarır; mevcut bloglar taşınır. Müşteri eklenecek, kaldırılacak veya düzeltilecek içerikleri bildirir. İlk briefin 17–18. sorularındaki seçim ve metin uzunluğu **müşteriden sonradan gelecek karardır**; UBT'ye devredilmiş sayılmaz. Eski adreslerin yeni karşılıkları haritalanır ve gerekli yönlendirmeler kurulur. QR kodlu materyaller için yayınlanan hedef URL'ler kararlı tutulur. Google yorumları gösterilecektir; veri kaynağı, kullanım koşulu ve teknik yöntem UBT tarafından doğrulanır.

## 5. Ürün, fiyat ve stok

### 5.1 Ürün bazında işlem yöntemi

Yönetim panelinde her ürün/hizmet için yöntem seçilip sonradan değiştirilebilir: **Doğrudan satın al**, **Form doldurarak satın al**, **İletişime geç**. Kitap doğrudan satın alma için örnektir. Deneme dalışı, Kekova Klasik Kano Turu ve Kekova Tekne Turu müşterinin ilk çevrimiçi satış için önerdiği adaylardır; “olabilir” ifadesi nedeniyle kesin ürün listesi değildir. 1 Aralık'ta POS henüz etkin değilse “satın al” düğmesi çalışmayan ödeme adımına bağlanmaz; o ürün için açıkça rezervasyon/sipariş talebi veya iletişim seçeneği gösterilir. Panelin satış yöntemi kararı ile faza göre etkin işlem birbirinden ayrı izlenir.

### 5.2 Fiyat ve para birimi

Panelde ürünün **EUR ana fiyatı** tutulur; sitede EUR ve kurdan hesaplanan TL karşılığı birlikte görünür. TL bağımsız ikinci fiyat olarak girilmez. Ürün başına kişi/grup fiyatı, sezonsallık, çocuk indirimi, ekipman, transfer ve ekstralar müşteri ürün cetvelinde tanımlanır. Kur kaynağı, güncelleme sıklığı, yuvarlama, ödeme anında kilitleme ve tahsilat para birimi açık karardır. Gösterilen TL tutarı, otomatik olarak TL tahsil edileceği anlamına gelmez. Ödeme açıldığında toplam tutar ve para birimi ödeme öncesinde açık gösterilir.

### 5.3 Kitap teslimatı ve stok

Kitaplarda Kaş ofisinden teslim, Türkiye içine kargo ve yurtdışına kargo seçenekleri bulunur. Kargo ücreti ödeme/talep öncesinde görünür; ülke veya bölge bazındaki ücret panelden tanımlanıp değiştirilebilir. Gönderilecek ülkeler, somut ücretler ve teslim süreleri müşteri envanterinde netleşir. Kitap stoku izlenir ve sıfıra indiğinde satın alma otomatik kapanır. Baskı/dil varyantlarının ayrı stoklanması ve başlangıç miktarları ayrıca doğrulanır. Eşzamanlı son stok siparişinde çift satış yapılmaması kabul testine dahildir.

## 6. Rezervasyon ve katılımcı iş akışı

1. Ziyaretçi ürünü, açıklamasını, fiyatını ve varsa koşullarını görür; tercih ettiği tarihi ve kişi sayısını girer.
2. Ürünün satış yöntemi ve fazdaki etkin işlemine göre doğrudan işlem, koşullu form veya iletişim yolu açılır.
3. Katılım formu gereken grup rezervasyonunda **her katılımcı için ayrı** bilgi ve yanıt alınır. Rezervasyonu yapan kişinin formu diğerlerinin yerine geçmez.
4. Ürüne özel sağlık/katılım yanıtlarından insan değerlendirmesi gerektirenler otomatik “uygun” sayılmaz. Çocuk ve veli onayı, eksik formun rezervasyona etkisi ve formu kimin doldurabileceği ayrıca belirlenir.
5. Tarih seçimi kesin müsaitlik veya onay vaadi değildir. Dragoman tarihi ve gerekiyorsa katılım koşullarını teyit eder; personelin ayrıca müsaitlik takvimi tutması zorunlu değildir.
6. Talep, iletişim bilgileri ve ürün/tarih/katılımcı sayısıyla yetkili ekibe ulaşır; kayıt ve durum işletme tarafından görülebilir.
7. **Ödemenin teyitten önce mi sonra mı alınacağı müşteri kararı bekler.** Bu karar gelmeden tahsilatla kesin rezervasyon sonucu veren akış açılmaz.

Talebin alınması, tarih teyidi, uygunluk onayı, ödeme ve kesin rezervasyon ayrı durumlardır. Ziyaretçiye her adımda mevcut durum ve sonraki adım anlaşılır biçimde bildirilir. Yanlış tarih, eksik form, reddedilen uygunluk veya ulaşılamayan müşteri için işletme akışı müşteri tarafından kararlaştırılır.

## 7. Ödeme, iptal/iade ve fatura

Dragoman kredi kartı ve IBAN havalesi ister; mümkünse bazı ürünlerde kapora da düşünülür. Öncelik Yapı Kredi Sanal POS/POSNET uygunluğunu araştırmaktır; uygun değilse iyzico değerlendirilir. POS sağlayıcısı ve canlı açılış tarihi henüz kesin değildir. Banka/sağlayıcı hesabı Dragoman adına açılır. Komisyon, desteklenen para birimleri, yabancı kartlar, 3D Secure, iade ve mutabakat koşulları incelenir. Kart bilgileri uygulamada saklanmaz; ödeme sağlayıcısının güvenli akışı kullanılır. Başarı, başarısızlık ve tekrarlanan sağlayıcı bildirimi siparişte tutarlı tek sonuç üretmelidir.

Havale bildirimi tek başına “ödendi” durumu yaratmaz; Dragoman'ın banka teyidi gerekir. Havale bekleme süresi, IBAN gösterimi ve teyit yetkisi müşteri kararıdır. Kaporanın geçerli olduğu ürünler, oran/tutar, kalan bedelin zamanı ve ödeme yolu ayrıca kararlaştırılır. Tarih uygun değilse alternatif tarih, iptal ve iade seçenekleri müşterinin koşullarına bağlanır. İptal/iade politikasının hizmet ve kitap bazında nihai metni müşteri tarafından gözden geçirilip onaylanacaktır; otomatik iade kuralı uydurulmaz.

Fatura için fatura türü, işletmenin mali süreçleri, gerekli alıcı bilgileri, vergi/para birimi işleyişi, sağlayıcı ve e-Fatura yetkisi Dragoman/mali müşavir tarafından netleştirilir. e-Fatura **sonraki fazdır**; POS ile aynı tarihte hazır olacağı varsayılmaz. Fatura kesimi ve iade/iptal belgeleri için mali/hukuki kararlar UBT'nin tek başına belirleyeceği kurallar değildir. MVP'de kullanıcıya otomatik e-Fatura kesildiği söylenmez.

## 8. Yönetim paneli, çeviri ve bildirim

Yetkili ekip teknik yardım almadan ürün ekler/düzenler/yayından kaldırır; işlem yöntemi, EUR fiyatı, kitap stoku, kargo bölgesi/ücreti, blog ve öne çıkan içeriği yönetir. Fotoğraf oranları ve yerleşimler panel kullanımıyla bozulmamalıdır. Kısa, pratik yönetim kılavuzu teslim edilir. SeaKayak panelindekine benzer revizyon talebi oluşturma istenir. Ana yöneticinin alan bazında yetki vermesi tercih edilir; ilk yayında uygulanacak kesin rol listesi açık karardır.

Yayın dilleri TR, EN, FR, DE'dir. Otomatik çeviri için **DeepL** çalışma seçeneği olarak kapsamda tutulur; hesap, API erişimi, maliyet, dil/kota uygunluğu ve entegrasyon UBT tarafından doğrulanır. Kaynak dildeki içerik çevrilir; çeviri yetkili kişi tarafından **onaylanmadan yayınlanmaz**. Kaynak metin değiştiğinde ilgili çeviri yeniden gözden geçirme durumuna alınmalıdır. Çeviriyi kimin onaylayacağı ve DeepL aboneliği Dragoman adına netleştirilir. Eksik veya onaysız çeviri, başka dilde yanlış ya da ham metin yayınlamak için gerekçe değildir.

Her sayfada, her cihazda WhatsApp ve e-posta kolay bulunur. Satış ve rezervasyon bildirimleri `info@dragoman-turkey.com` adresine gider; mevcut kurumsal e-postalar korunur. Müşterinin istediği “İşleme Aldım” işlemi, kimin talebi üstlendiğini diğer yetkililere göstermelidir. E-postadan tek tıklamayla işlem yapılacaksa bağlantı yetkilendirmesi ve süresi güvenli biçimde tasarlanır; yetkisiz erişimle kayıt sahiplenilemez. Ayrı “Tamamlandı” düğmesi işletmeye zorunlu iş yükü olarak eklenmez. E-posta teslim edilemezse talep panelde kaybolmamalı; yetkili kişi kayıtları görüntüleyebilmelidir. Yetkili personel, tekrar bildirim ve üstlenilmeyen talep davranışı açık karardır.

## 9. SEO, ölçüm ve medya

MVP SEO temeli: eski URL envanteri ve 301 yönlendirme haritası; anlamlı dil bazlı URL; her dil için başlık/açıklama; canonical ve `hreflang` ilişkileri; XML site haritası; tarama/indeks ayarları; mobil performans ve temel erişilebilirlik. Canlı alanda geçici siteye ait `noindex` veya yanlış canonical kalmamalıdır. QR hedefleri ve önemli eski bağlantılar tek tek kontrol edilir. Kaş dalış, deneme dalışı, Open Water, Kekova deniz kanosu ve tekne turu, Kaş yürüyüş gibi hizmet/lokasyon aramaları içerik planına alınır. EN/FR/DE terimler doğrudan kelime çevirisi yerine doğal arama diliyle kontrol edilir. Rusça anahtar kelime araştırması Rusça site yayını kararı değildir.

Google İşletme Profili, Instagram, Facebook ve YouTube bağlantıları doğru hesaplara yönlenir. Google yorumlarının gösterimi veri doğruluğu ve sağlayıcı koşullarına uygun yöntemle yapılır. Form gönderimi, rezervasyon talebi, sipariş ve ödeme gibi olayların ölçümü izin/çerez kararlarıyla uyumlu kurulur; sayısal dönüşüm hedefleri müşteri tarafından henüz verilmedi. Ücretli reklam veya SEO performans garantisi MVP kapsamındaki teknik temel ile karıştırılmaz.

UBT mevcut medya arşivini değerlendirip eksik fotoğraf/video listesini çıkarır. Müşteri elindeki materyalleri ve kullanım hakkı/onayını sağlar. Görseller için uygun boyutlandırma, mobil yükleme, anlamlı alternatif metin ve kalite kontrolü yapılır. Eksik medya için telifsiz olduğu varsayılan rastgele görsel kullanılmaz; yayın sayfasında hangi görselin kullanılacağı Dragoman ile belirlenir.

## 10. Güvenlik, gizlilik, barındırma ve servis sahipliği

Alan adı `dragoman-turkey.com` kullanılır. Mevcut WordPress barındırması Flywheel'dir; yeni altyapı, geçiş planı, geri dönüş ve masraflar UBT tarafından hazırlanıp Dragoman'a bildirilir. DNS değişiminde mevcut kurumsal posta kutuları ve ilgili kayıtlar korunur. Geçici site ile canlı alanın yapılandırmaları ayrılır. Yayın öncesi yedek alınır; geri yükleme uygulanabilir biçimde doğrulanır. Düzenli yedek, erişim, hata kaydı ve güvenlik güncellemesi bakım planına girer.

**22/25 kararı:** Alan adı, hosting, ödeme, DeepL, e-posta, analitik ve diğer harici servis hesapları/abonelikleri Dragoman adına açılır veya Dragoman sahipliğinde kalır. UBT, işi yürütmek için gerekli teknik yönetim yetkisiyle çalışır. Yönetici erişimleri kişi bazlı ve asgari yetkiyle verilir; gizli anahtarlar kod deposuna veya belgeye yazılmaz. Sözleşme/abonelik ve faturalandırma sahipliği ile teknik yönetici rolü ayrı kaydedilir.

Form ve panel girişleri doğrulanır; yetki kontrolü yalnızca ekranda değil veri erişiminde de uygulanır. Yönetici oturumları ve “İşleme Aldım” bağlantıları yetkisiz kullanıma karşı korunur. Ödeme sağlayıcı bildirimleri doğrulanır ve tekrar işleme dayanıklıdır. Sağlık bilgisi yalnızca gerekli ürün ve gerekli alanlarda toplanır; erişim, saklama süresi ve silme yöntemi müşteri/hukuki değerlendirmeyle belirlenir. Gizlilik/KVKK aydınlatması, gerektiğinde GDPR, çerez tercihleri, mesafeli satış ve hizmete özgü katılım/iptal koşulları işletme adına onaylanır. Çerez/izin sisteminin teknik çözümü UBT'ye bırakılmıştır; hukuki metinlerin doğruluğu kendiliğinden UBT'ye devredilmiş değildir.

## 11. Kabul ölçütleri ve yayın kararı

**24/25 kararı:** UBT otomatik ve manuel uçtan uca testleri yapar. Dragoman gerçek kullanım senaryolarıyla kullanıcı kabul testini yapar ve **yayın onayını verir**. UBT'nin teknik test başarısı, Dragoman'ın işletme kabulünün yerine geçmez. Aşağıdaki liste MVP kabulünü somutlaştırır; ödeme ve e-Fatura sonraki fazda ayrıca kabul edilir.

| No | MVP kabul senaryosu | Geçme ölçütü |
| --- | --- | --- |
| K1 | Dört dil ve temel sayfalar | Onaylı TR/EN/FR/DE içerik açılır; menü, iç bağlantı, logo ve temel sayfalar telefon/tablet/masaüstünde çalışır |
| K2 | İletişim | Her sayfadan WhatsApp/e-posta açılır; form gönderimi kayda ve `info@dragoman-turkey.com` bildirimine ulaşır |
| K3 | Ürün ve rezervasyon talebi | Ürün, tarih tercihi ve kişi sayısıyla talep oluşturulur; ziyaretçi kesin rezervasyon/ödeme yapıldığına dair yanlış mesaj almaz |
| K4 | Katılımcı formları | Form gereken üründe her katılımcının ayrı kaydı alınır; eksik ve inceleme gerektiren yanıtlar uygunluk onayı olmadan geçmez |
| K5 | İçerik yönetimi | Yetkili kişi ürünü ve işlem yöntemini düzenler; değişiklik doğru sayfada görünür; yetkisiz kişi düzenleyemez |
| K6 | Çeviri onayı | Otomatik çevrilen içerik onay bekler; onaysız metin yayında görünmez; kaynak değişince yeniden inceleme gerekir |
| K7 | SEO ve URL | Önemli eski URL'ler yeni sayfalara gider; QR hedefleri, sitemap, canonical, dil ilişkileri ve canlı indeks ayarları kontrol edilir |
| K8 | Operasyon | Talep panelde bulunur; güvenli işleme alma varsa üstlenen kişi görünür; e-posta hatası kayıt kaybı yaratmaz |
| K9 | Güvenlik ve hukuk | Yetki sınırları, gerekli izin/metinler ve hassas veri akışı onaylanır; yedek ve geri dönüş adımları doğrulanır |
| K10 | İşletme kabulü | Dragoman örnek müşteri, grup katılımcısı, içerik düzenleme ve talep takip senaryolarını dener; açık kritik hata kalmadan yazılı yayın onayı verir |

**POS fazı kabulü:** gerçek sağlayıcıya yakın test ortamında başarılı/başarısız/iptal ödeme, tekrarlanan bildirim, havale teyidi, stok ve uygunluk sınırları, toplam bedel/para birimi ve onaylı iade akışı doğrulanır. **e-Fatura fazı kabulü:** doğru alıcı/sipariş verisi, fatura üretimi, hata ve düzeltme akışı mali süreç sahibi tarafından doğrulanır. Hata ve eksikler önceliklendirilir; kritik güvenlik, veri kaybı veya yanlış ödeme durumu açıkken ilgili özellik yayınlanmaz.

## 12. Bakım ve değişiklik yönetimi

**25/25 kararı:** UBT düzenli teknik bakımı üstlenir. Bakım; barındırma/sertifika/alan adı sağlığı, güvenlik ve bağımlılık güncellemeleri, yedekler, hata izleme, erişim ve entegrasyonların çalışmasının kontrolü ile gerekli teknik düzeltmeleri kapsar. Hatalar etkisine göre önceliklendirilip giderilir; bildirim, müdahale süresi, bakım sıklığı ve raporlama biçimi ayrıca yazılı anlaşmada netleştirilir. Yeni özellikler ve kapsam genişlemeleri ayrı talep olarak değerlendirilir, efor/masrafı belirtilir ve Dragoman onayıyla planlanır. Hata düzeltme ile yeni özellik aynı kaleme karıştırılmaz.

İlk geliştirme için önceki müşteri kaydı **250 € + masraflar**; yayın sonrası bakım/ek hizmet için **25 €/saat önerisi** vardır, ancak müşteri bu saat ücretinin yeniden görüşülebileceğini belirtmiştir. Nihai bakım bedeli, dahil saat, harici abonelikler, masraf onay süreci ve ödeme koşulları henüz kesin değildir. Bu brief tek başına yeni mali taahhüt oluşturmaz.

## 13. Müşteriye sorulacaklar review sonrası

Aşağıdaki sorular, uygulama veya ticari metin için gereken **açık kararları** toplar. Önceki review'da açıkça müşteriye ayrılan ilk konu tarih teyidi ve ödeme sırasıdır; diğerleri ürün/mali/hukuki veri tamamlama sorularıdır. Yanıtlar alındıkça bu tabloya karar tarihi ve sahibi eklenir.

| Öncelik | Soru / beklenen veri | Karar sahibi |
| --- | --- | --- |
| P0 | Tarih ve uygunluk Dragoman tarafından teyit edilmeden ödeme alınacak mı? Tarih uygun değilse alternatif tarih, iptal ve iade nasıl işleyecek? | Dragoman / Draman |
| P0 | 1 Aralık ürün listesi, her ürünün görünür işlem yöntemi ve rezervasyon talebi metni nedir? | Dragoman / Draman |
| P0 | Ürün başına EUR fiyat, kişi/grup/sezon/çocuk/ekstra kuralları ve kitap stokları nedir? | Dragoman |
| P0 | Form soruları, insan inceleme eşikleri, çocuk/veli onayı, eksik form ve sağlık verisinin saklanması nasıl olacak? | Dragoman; hukuki danışmanlık gerektiğinde |
| P0 | Taşınacak/çıkarılacak/güncellenecek içerikler, onaylı çeviriler, eksik fotoğraf/video ve kullanım hakları nedir? | Dragoman |
| P0 | Onaylı gizlilik, çerez, satış, katılım, iptal/iade metinleri ve yayın onaylayıcıları kimlerdir? | Dragoman; gerektiğinde hukuk/mali müşavir |
| P1 | Kur kaynağı, güncelleme, yuvarlama, ödeme anı kuru ve tahsilat para birimi nedir? | Dragoman; banka/UBT teknik inceleme |
| P1 | POSNET hesabı/koşulları uygun mu; değilse iyzico hesabı, komisyon ve iade koşulları kabul ediliyor mu? | Dragoman / banka; UBT teknik inceleme |
| P1 | Havale bekleme/teyit kuralı ve kapora uygulanacak ürün, oran, kalan ödeme zamanı nedir? | Dragoman |
| P1 | Kitap gönderim ülkeleri, bölge ücretleri, süreleri, baskı/dil varyantları ve ofis teslim talimatı nedir? | Dragoman |
| P1 | Fatura türü, zorunlu alıcı bilgisi, mali süreç sahibi ve e-Fatura sağlayıcısı kimdir? | Dragoman / mali müşavir |
| P1 | `info@` bildirimini kimler görür, talebi kim üstlenebilir, üstlenilmeyen talep nasıl izlenir? | Dragoman |
| P1 | DeepL hesabı/aboneliği, kaynak dil ve TR/EN/FR/DE onaylayıcıları kimlerdir? | Dragoman; UBT teknik inceleme |
| P1 | Hosting ve diğer servislerin Dragoman hesabı, teknik erişimleri ve masraf onay yetkisi nasıl düzenlenecek? | Dragoman / UBT |
| P2 | SSS, bağımsız ulaşım/konaklama, üyelik/özel indirim ve ileri otomasyonlardan hangileri sonraki talep olacak? | Dragoman / Draman |
| P2 | Bakım ücreti, servis seviyesi, masraf kalemleri ve yeni özellik onay yolu nasıl kesinleşecek? | Dragoman / UBT |

## 14. Teslim ve karar kayıtları

UBT teslimleri: içerik ve eski URL envanteri; sayfa/ürün matrisi; tasarım gösterimi; MVP uygulaması; dört dilin çeviri/onay akışı; yönetim kılavuzu; teknik test sonuçları; yönlendirme ve DNS geçiş planı; yedek/geri dönüş planı; açık hata listesi. Dragoman teslimleri: içerik ve medya kararları; ürün/fiyat/stok/koşul cetveli; gerekli hukuki ve mali onaylar; servis hesapları; gerçek senaryolarla kullanıcı kabul testi ve yazılı yayın onayı.

**Karar izi:** İlk briefin 50 müşteri yanıtı [kaynak belgede](./Dragoman_Proje_Brief.md#16-müşterinin-verdiği-ham-cevaplar-numaralı-ek) bulunur. UBT review'unda teyit edilen önceki kararlar: ürün başına panelden üç işlem yöntemi, her grup katılımcısı için ayrı form, Kaş ofisinden teslim/Türkiye ve yurtdışı kargo, bölgesel kargo ücretlerinin panelden yönetimi, stok sıfırsa satışın kapanması, EUR ana fiyat ile TL karşılığının birlikte gösterimi. Son dört detaylandırma kararı: Dragoman sahipliğinde harici servisler (22/25), 1 Aralık MVP ve sonraki fazlar (23/25), UBT E2E + Dragoman UAT/yayın onayı (24/25), UBT bakımı ve ayrı onaylı yeni özellik talepleri (25/25). Bunların dışındaki açık sorular, karar alınana kadar gereksinim olarak kesinleştirilmez.

## Ek A — Müşterinin ilk görüşmedeki 50 yanıtı

Aşağıdaki kayıtlar önceki briefteki müşteri yanıtlarının izlenebilirlik ekidir. Üstteki karar ve faz tabloları uygulama kapsamı için esas alınır.


Aşağıda cevapların özlü ham kayıtları bulunur: mümkün olan yerlerde müşterinin kendi sözleri korunmuştur; birden fazla mesajla tamamlanan cevaplar birleştirilmiştir. Soru 3 bir görselle yanıtlandığı için kabul edilen görüşme özetinden aktarılmıştır. Bu bölüm tasarım kararlarının yerine değil, kararların izlenebilirliği için eklenmiştir.

- Soru 1: “Dragoman; yaklaşık 25 yıldır, bireysel birikimlerini alternatif turizm alanına taşımayı amaçlayan; emek verdiğimiz Kaş-Kekova Deniz Koruma Alanı'nda, su altında veya Likya patikalarında, Akdeniz'in kucağında sizlere tecrübelerini ve doğa sevgilerini sunarak en yüksek ve emniyetli standartlarda hizmet vermeyi bir yaşam şekli olarak seçenlerden oluşuyor… Dalış, Deniz Kanosu, türkiyede tek ve ilk Coasteering, bisiklet ve yürüyüs turları, kültür turları ve kamplı turlar, haftalık tailor made turlar, yurtdısı dalıs turları hepsini yapıyor.”

- Soru 2: “dalıs seakayak, doga sporları, yurtdısı turlar ama dalısa baglı, belki transport ve konaklama”

- Soru 3: Görselle verilen ve bölüm özetinde kabul edilen içerik: 25 yılı aşan bölge deneyimi; lisanslı/profesyonel rehberler; güvenlik; küçük gruplar; konforlu organizasyon; deneyim seviyesine uygun yaklaşım.

- Soru 4: “yaz kıs hizmet vermesi, uzun süredir calısan güvenilir, işini seven ve isinde uzman personel, a sınıfı seyahat acentesi olarak havalimanından havalimanına tüm hizmetleri verebilmesi, dürüst ve güvenilir bir işletme olması”

- Soru 5: “daha cok türkiye den acenteler, dalış ve universite dalıs klüpleri, bireysel müşteriler ve kapı müsterileri”

- Soru 6: “once türkiye sonra fransa ingiltere cok az almanya ve amerika”

- Soru 7: “tr eng fr ve bence de”; Almanca kastedildiği sorularak netleştirildi: “evet”.

- Soru 8: “genellikle google, bazen istagram, tanıdıklar da agırlıklı oluyor, otellerden daha az , acenteler de var tabii”

- Soru 9: “yok.”

- Soru 10: “her seyi”

- Soru 11: “wp nin eski bir sistem olması, user friendly olmaması, sitenin kötü olması ve düzeltilememesi.”

- Soru 12: “icerik korunacak, fakat tasarım degisecek, daha user friendly kısa ve oz, kolay okunacak ve isteyenin ilerlemesine müsade edecek, adfmin panelinde herkesin rahatca ürün ekleyip cıkarabileceği, ve standart olcülerin de korunabileceği bir tasarım. Daha aktif.”

- Soru 13: “kesinlikle iletisimi hızlandırmalı, rezervasyon ve bazı ürünlerin satısını kolaylastırmalı, profesyonelliğimizi, cagı yakaladığımızı ve isimizin en iyisi oldugumuzu gostermeli.”

- Soru 14: “yueterli bilgiyi edinerek rezervasyon asamasında formlarını da doldurmasını ve gerekli bilgileri bize göndererek odemesini de yapıp hemen ürünü satın alabilmesini, ya da yazmak istiyorsa sadece bize yazmasını, kolayca bizimle iletişim kurabilmesini whatsapp ve mail ne isterse”

- Soru 15: “evet bazı ürünleri dogrudan satabilmek bazıları için de sadece bize yazmalarını istiyoruz”

- Soru 16: “web sitesinden iletişimin ya da satısların artması, su anda neredeyse hic yok”

- Soru 17: “bunları degerlendirip barıs a soyleyeceğiz.” Sonradan açık düzeltme: “ubte ye bırakılacak degil sonra verilecek”.

- Soru 18: “bunu da barıs a soyleyeceğiz, zaten kayak sitesinden biliyor.” Sonradan açık düzeltme: “ubte ye bırakılacak degil sonra verilecek”.

- Soru 19: “hazır olanlar da var yeni vermemiz gerekenler de”

- Soru 20: “yorumlar olacak google a baglanacak”

- Soru 21: “daha dinamik, samimi, kurumsal ve elbette premium, kafa karıstırmayan, acık, hızlıca cevap veren”

- Soru 22: “[https://dragomanseakayak.com/tr](https://dragomanseakayak.com/tr) burada kullandıgımız renkler, logomuzun renkleri öncelikli kullanacağız tabii. Bunun dısında profesyonel bir tasarımcı gözüyle vereceğin fikirlere açıgım, denizi, dogayı, güveni çagrıstıran renkler seçilmeli.”

- Soru 23: “mevcut logomuzu koruyacagız.”

- Soru 24: “özellikle aklıma gelen bir site yok, seakayak sitesini de yeni yaptık onu begeniyorum sadelik ve kolaylık acısından”

- Soru 25: “su an burada [https://dragoman-turkey.com/shop/](https://dragoman-turkey.com/shop/) yer alan kitaplara ek olarak deneme dalışı, kekova klasik kano turu ve kekova tekne turu olabilir. Burada istediğimiz zaman yeni bir ürün kolaylıkla ekleyebilmemiz lazım.” Ek açıklama: Kitap sepete doğrudan girebilmeli; turlar/dalışta koşula göre bilgi ve sağlık formları doldurulmalı, uygun müşteri sonrasında satın alabilmeli.

- Soru 26: “Tarihi biz teyid ederiz ama. çünkü girip sitede ayrı ayrı işlememiz gerekiyorsa biz onu unuturuz.”

- Soru 27: “kredi kartıyla ödeme, iban a gönderme,mümkünse sadece kapora ödeme seçeneği de olabilir. Yapı kredi kullanıyoruz, online ödeme sistemi var sanki sanal pos gibi bir şey yapılabiliyorsa (araştır) bununla yapmak istiyorum, yoksa iyzico kullanacagız”

- Soru 28: “blog kesillikle olacak. Halihazırdaki sitedekiler de tasınacak oraya. belki sık sorulan sorular eklenebilir, düşünürüz belki de gereksiz. Üyelik sistemi isterim mesela özel indirimler veririz vs. ama belki hemen değil de sistem bunu yapmak için uygun hazırlanabiliyorsa harika olur. kampanyalar değil ama haberler gibi dinamik bir alan, öne cıkarmak istediğimiz turları, teklifleri, ya da blog yazılarını koyabileceğimiz bir yer olmalı.”

- Soru 29: “bizde var, ubt de aldı” (hangi soruya ait olduğu daha sonra açıkça “29” olarak düzeltildi).

- Soru 30: “flywheel, ubt devamını bize soyler”

- Soru 31: “evet” (mevcut kurumsal e-postalar korunacak).

- Soru 32: “hazır degil, iptel koşulları biraz bellli ama üstünden geçmem gerekiyor.”

- Soru 33: “ubt ye bırakıyorum”

- Soru 34: “mümkün olsa belli kişilerin belli yerlere erişimini bir admin in yönetmesini elbette isterim. yok olmuyorsa belirli yöneticiler yani cogunlukla ben”

- Soru 35: “evet” (Google İşletme Profili var).

- Soru 36: “instagram facebook youtube”

- Soru 37: “evet” (ücretli reklam düşünülüyor).

- Soru 38: “Kaş'ta dalış, Kaş tatil, Kekova seakayak ya da deniz kanosu, kaş ta yürüyüş turları, tekne turları, Kaş open water kursu, Kaş deneme Dalışı vs vs liste uzun tabii nigilizceleri almancaları, fransızcaları ruscaları”

- Soru 39: “ubt ile kararlaştırıldı. başlangıc olarak site hizmete girene kadar çalışmaları için 250 eur + masraflar. sonrasında vereceği düzenli bakım, ekstra hizmetler vs için 25 Eur / saat ama bu belki biraz fazla bakıcaz.”

- Soru 40: “ben ve draman”

- Soru 41: “eski siteden kendisi çekecek, ekleme cıkarma ve düzeltmeleri ben takip edeceğim.”

- Soru 42: “giriş yetkilerini aldı, word press e girebiliyor, onun dışında ihtiyacları nedir bilmiyorum, mümkünse fotograf vs cok zaman ben harcayamayabilirim su anda”

- Soru 43: “temel özellikler ve sayfalarıyla hazır olması önemli, linklerin çalışır olması lazım ki karekodlar vs yapılabilsin.”

- Soru 44: “kendisi karar versin. ama tasarım hazır olduğunda genel hatlara bankmak isterim tabii.”

- Soru 45: “belirlediğimiz kişiler çoğunlukla ben. ama dil desteği olmalı, ben çevirmeyeceğim yani.” Açıklama: “evet. cevirsin ancak biz onaylayalım.”

- Soru 46: “tabii ki”. Açıklama: “kılavuzun sayfa sayfa olmasına gerek yok, kısaca acıklamalar olması yeterli”.

- Soru 47: “ğer düzenli bir bakım gerekiyorsa ubt.”

- Soru 48: “seakayak admin panelinde de revizyon talebi oluşturuyoruz o güzel.”

- Soru 49: “info adresine direk düşmeli. mümkünse o mailde bir onay olabilir miydi acaba gördüm işlem yapıyorum gibi. kayakta siteye koymustu barıs ama o cok aktif kullanılamıyor. Bunu konusalım nasıl yapabiliriz.” Öneri sonrası: “harika bu yapılabiliyorsa işleme alsa zaten gerisi rezervasyondan devam eder. sanki ekstradan tamamlandı yüküne gerek yok.”

- Soru 50: “üyelik sistemi düşüneceklerimiz arasında ilk seferde olmasına gerek yok. Bütün bunların yanında bir de konustuk mu bilemedim ama direk satın alınamyan seyler için direk e mail at whatsapptan son vs gibi seceneklerin her sayfada kolayca görünür olması lazım, hem bilgisayar hem de telefondan tabletten girişlerde”

