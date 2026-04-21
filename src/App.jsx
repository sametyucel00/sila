import { useEffect, useMemo, useState } from 'react'
import './App.css'

const anniversaryDate = new Date('2023-10-06T00:00:00')
const heroImage = '/sila-portrait.jpg'
const COUPON_STORAGE_KEY = 'sila-daily-coupons'
const DREAMS_STORAGE_KEY = 'sila-dreams'

const tabs = [
  { id: 'home', label: 'Bugün', icon: TodayIcon },
  { id: 'timeline', label: 'Anılar', icon: GalleryIcon },
  { id: 'moments', label: 'Zaman', icon: TimeIcon },
  { id: 'profile', label: 'Biz', icon: TogetherIcon },
  { id: 'lovelab', label: 'Mod', icon: MoodIcon },
]

const cityItems = [
  { name: 'Alanya', icon: '🌴', meta: 'İlk buluşma' },
  { name: 'Bolu', icon: '🍃', meta: 'Gezi' },
  { name: 'Ordu', icon: '🌊', meta: 'Anılar' },
]

const venueItems = [
  { name: 'Mcdonalds', icon: '🍔', meta: 'Yemek' },
  { name: 'Alanya Çay Bahçesi', icon: '🍵', meta: 'Çay' },
  { name: 'Shakespeare', icon: '🍽️', meta: 'Mekan' },
  { name: 'Starbucks', icon: '☕', meta: 'Kahve' },
]

const placeItems = [
  { name: 'Kızıl Kule', icon: '🧱', meta: 'Gezi' },
  { name: 'Alanya Kalesi', icon: '🏰', meta: 'Manzara' },
  { name: 'Yason Burnu', icon: '🌅', meta: 'Sahil' },
  { name: 'Boztepe', icon: '🌄', meta: 'Yukarıdan' },
]

const movieItems = [
  { name: 'Star Wars', icon: '⭐', meta: 'En önemlisi' },
  { name: 'Arabalar 1-3', icon: '🚗', meta: 'Film' },
  { name: 'Avrupa Yakası', icon: '📺', meta: 'Dizi' },
  { name: 'Modern Family', icon: '🎬', meta: 'Dizi' },
  { name: 'Stranger Things', icon: '🛸', meta: 'Dizi' },
]

const gameItems = [
  { name: 'It Takes Two', icon: '🎮', meta: 'Co-op' },
  { name: 'A Way Out', icon: '🚔', meta: 'Kaçış' },
  { name: 'Sea of Thieves', icon: '🎮', meta: 'Macera' },
  { name: 'V Rising', icon: '🧛', meta: 'Vampir' },
  { name: 'Portal 2', icon: '🎮', meta: 'Bulmaca' },
  { name: 'Cuphead', icon: '🎮', meta: 'Zor' },
]

const timelineItems = [
  {
    title: 'Sarılınca Dünya Yavaşlıyor',
    description:
      'Birbirinize bu kadar yakın durduğunuz kareler, fotoğraftan çok his bırakıyor. Sakin, sıcak ve tamamen size ait bir an.',
    category: 'Fotoğraflar',
    image: '/timeline-2.jpg',
  },
  {
    title: 'Geceye Yakışan Biz',
    description:
      'Plansız ama çok gerçek duran bir fotoğraf. Gece, ışık ve yüzlerdeki rahatlık birleşince ilişki kendini olduğu gibi gösteriyor.',
    category: 'Anı',
    image: '/timeline-3.jpg',
  },
  {
    title: 'Kırmızıyla Gelen O Büyük An',
    description:
      'En güçlü karelerden biri. Birbirinize bakışınız fotoğrafın bütün havasını tek başına kuruyor, geri kalan her şey fonda kalıyor.',
    category: 'Özel Gün',
    image: '/timeline-4.jpg',
  },
  {
    title: 'Masadaki Huzur',
    description:
      'Abartısız ama derin bir kare. Birbirinize böyle yaslandığınız anlar ilişkinin en güven veren tarafını hissettiriyor.',
    category: 'Sakin An',
    image: '/timeline-1.jpg',
  },
]

const importantDetails = [
  { label: 'Yüzük Ölçüsü', value: '14 beden / 54-60 mm', icon: '💍' },
  { label: 'Kan Grubu', value: 'A Rh+', icon: '🩸' },
  { label: 'En Sevdiği Çiçek', value: 'Lale', icon: '🌷' },
  { label: 'Burç', value: 'Yay', icon: '♐' },
  { label: 'Doğum Günü', value: '11 Aralık 2001', icon: '🎂' },
  { label: 'Favori Takı', value: 'Kolye', icon: '✨' },
]

const dailyNotes = [
  'Bugün yine iyi ki varsın dedirten günlerden biri.',
  'Seninle konuşunca günün yorgunluğu biraz daha hafif geliyor.',
  'Bazı insanlar huzur verir, sen direkt ev hissi veriyorsun.',
  'Küçük bir mesajın bile bütün günün havasını değiştirebiliyor.',
  'Seninle sıradan bir gün bile daha güzel hatırlanıyor.',
]

const loveReasons = [
  'Çünkü yanında kendimi kasmadan, olduğum gibi iyi hissediyorum.',
  'Çünkü gülüşün ortamın bütün sertliğini yumuşatıyor.',
  'Çünkü hem en yakın arkadaşım gibi hem de kalbimin evi gibisin.',
  'Çünkü seninle konuşmak hiçbir zaman görev gibi hissettirmiyor.',
  'Çünkü bazen hiçbir şey yapmadan bile mutlu olmamı sağlıyorsun.',
]

const favorites = [
  { label: 'En Sevdiği Yemek', value: 'Mantı ve hamburger', icon: '🍔' },
  { label: 'Tatlı', value: 'Dondurma', icon: '🍨' },
  { label: 'Çikolata', value: 'Her türlü olur', icon: '🍫' },
  { label: 'Müzik', value: 'Türkçe pop ve yabancı pop', icon: '🎶' },
  { label: 'Favori Kahve', value: 'Filtre kahve', icon: '☕' },
  { label: 'Favori İçecek', value: 'Su', icon: '💧' },
  { label: 'Favori Alkol', value: 'Tekila', icon: '🥂' },
  { label: 'Favori Aktivite', value: 'Onu mutlu edecek her şey', icon: '🤍' },
]

const sensitiveItems = [
  { label: 'Hassas Nokta', value: 'Kulağının arkası', icon: '🌸' },
  { label: 'Korkusu', value: 'Böcekler, karanlık, izlenmek', icon: '🕷️' },
]

const biggestWish = {
  label: 'En Büyük İsteği',
  value: 'Şu anda evlenmek',
  icon: '💒',
}

const futureItems = [
  { label: 'Kızımızın Adı', value: 'Elizabeth Ceylan', icon: '👶' },
  { label: 'Kedi Adları', value: 'Mırmır, Pamuk, Aşk, Kuzu', icon: '🐱' },
  { label: 'Köpek Adları', value: 'Deccal, Düşman, Nankör', icon: '🐶' },
]

const coupons = [
  { id: 1, title: 'Gece Dondurması', icon: '🍦', color: 'blue' },
  { id: 2, title: 'Sınırsız Masaj', icon: '💆', color: 'rose' },
  { id: 3, title: 'Film Seçme Hakkı', icon: '🎬', color: 'amber' },
  { id: 4, title: 'Sınırsız İltifat', icon: '✨', color: 'teal' },
]

const dreamListSeed = [
  { id: 1, title: 'Tatile gitmek', completed: false },
  { id: 2, title: 'Evlenmek', completed: false },
  { id: 3, title: 'Ev ve araba almak', completed: false },
  { id: 4, title: 'Zengin olmak', completed: false },
  { id: 5, title: 'Daha iyi bir Türkiye görmek', completed: false },
]

function daysSince(date) {
  const oneDay = 1000 * 60 * 60 * 24
  return Math.max(1, Math.floor((Date.now() - date.getTime()) / oneDay))
}

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [usedCoupons, setUsedCoupons] = useState(() => loadDailyCoupons())
  const [dreams, setDreams] = useState(() => loadDreams())
  const [selectedTimelineImage, setSelectedTimelineImage] = useState(null)
  const togetherDays = useMemo(() => daysSince(anniversaryDate), [])
  const birthdayCountdown = useMemo(() => daysUntilBirthday(11, 11), [])
  const noteOfDay = useMemo(() => pickDailyItem(dailyNotes), [])
  const reasonOfDay = useMemo(() => pickDailyItem(loveReasons, 7), [])

  useEffect(() => {
    document.title = 'Sıla'
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [activeTab])

  useEffect(() => {
    if (!selectedTimelineImage) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedTimelineImage(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedTimelineImage])

  useEffect(() => {
    persistDailyCoupons(usedCoupons)
  }, [usedCoupons])

  useEffect(() => {
    persistDreams(dreams)
  }, [dreams])

  const toggleDream = (id) => {
    setDreams((current) =>
      current.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    )
  }

  const handleCouponUse = (id) => {
    setUsedCoupons((current) => (current.includes(id) ? current : [...current, id]))
  }

  return (
    <div className="app-shell">
      <main className="app-container">
        <div className="page-stage" key={activeTab}>
          {activeTab === 'home' && (
            <HomePage
              birthdayCountdown={birthdayCountdown}
              noteOfDay={noteOfDay}
              reasonOfDay={reasonOfDay}
              togetherDays={togetherDays}
            />
          )}
          {activeTab === 'timeline' && <TimelinePage />}
          {activeTab === 'moments' && (
            <MomentsPage onOpenImage={setSelectedTimelineImage} />
          )}
          {activeTab === 'profile' && <ProfilePage />}
          {activeTab === 'lovelab' && (
            <LoveLabPage
              dreams={dreams}
              toggleDream={toggleDream}
              handleCouponUse={handleCouponUse}
              usedCoupons={usedCoupons}
            />
          )}
        </div>

        <nav className="bottom-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                className={tab.id === activeTab ? 'nav-item active' : 'nav-item'}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                <span className="nav-icon">
                  <Icon />
                </span>
                <span className="nav-label">{tab.label}</span>
              </button>
            )
          })}
        </nav>

        {selectedTimelineImage && (
          <div
            className="image-modal"
            onClick={() => setSelectedTimelineImage(null)}
            role="button"
            tabIndex={0}
          >
            <div className="image-modal-content" onClick={(event) => event.stopPropagation()}>
              <button
                className="image-modal-close"
                onClick={() => setSelectedTimelineImage(null)}
                type="button"
              >
                ×
              </button>
              <img src={selectedTimelineImage.src} alt={selectedTimelineImage.alt} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function HomePage({ birthdayCountdown, noteOfDay, reasonOfDay, togetherDays }) {
  return (
    <div className="page space-y-8 pb-12">
      <section className="hero glass-card">
        <div className="hero-backdrop" />
        <div className="hero-avatar large">
          <img src={heroImage} alt="Sıla portresi" />
        </div>
        <div className="hero-text">
          <span className="eyebrow">Sıla için</span>
          <h1>
            Sıla <HeartInlineIcon /> Seni Seviyorum
          </h1>
          <p>
            Birlikte geçen {togetherDays} günün, küçük notların ve en güzel
            anıların toplandığı özel yer.
          </p>
        </div>
        <div className="hero-summary">
          <article className="glass summary-card">
            <span className="fact-label">Birlikte geçen süre</span>
            <strong>{togetherDays} gün</strong>
          </article>
          <article className="glass summary-card">
            <span className="fact-label">İlk Sevgili Olma Günü</span>
            <strong>06.10.2023</strong>
          </article>
        </div>
      </section>

      <section className="glass-card upcoming-card">
        <div className="section-title-row">
          <h2>Yaklaşan Özel Günler</h2>
        </div>
        <article className="upcoming-item">
          <div className="upcoming-icon-wrap">
            <GiftIcon />
          </div>
          <div className="upcoming-copy">
            <span className="fact-label">Doğum Günü</span>
            <strong>11 Aralık</strong>
          </div>
          <div className="upcoming-days">
            <strong>{birthdayCountdown}</strong>
            <span>gün kaldı</span>
          </div>
        </article>
      </section>

      <section className="glass-card note-card-wide">
        <div className="note-heading">
          <span className="note-badge">
            <HeartInlineIcon />
          </span>
          <span className="fact-label">Günün Notu</span>
        </div>
        <p>{noteOfDay}</p>
      </section>

      <section className="glass-card note-card-wide">
        <div className="note-heading">
          <span className="note-badge star">
            <RoseIcon />
          </span>
          <span className="fact-label">Neden Seni Seviyorum</span>
        </div>
        <p>{reasonOfDay}</p>
      </section>
    </div>
  )
}

function TimelinePage() {
  return (
    <div className="page space-y-10 pb-10">
      <div className="page-head">
        <h1>Anılarımız</h1>
        <p>Birlikte yazdığımız hikayenin sayfaları...</p>
      </div>

      <MiniGrid title="Gittiğimiz Şehirler" items={cityItems} />
      <MiniGrid title="Gittiğimiz Mekanlar" items={venueItems} />
      <MiniGrid title="Gittiğimiz Yerler" items={placeItems} />
      <MiniGrid title="İzlediğimiz Filmler" items={movieItems} />
      <MiniGrid title="Oynadığımız Oyunlar" items={gameItems} />

    </div>
  )
}

function MomentsPage({ onOpenImage }) {
  return (
    <div className="page space-y-10 pb-10">
      <div className="page-head">
        <h1>Zaman Tüneli</h1>
        <p>Birlikte en güzel duran anların ayrı sayfası...</p>
      </div>

      <div className="timeline-list">
        {timelineItems.map((item) => (
          <article key={item.title} className="timeline-card glass-card">
            <button
              className="timeline-image-wrap timeline-image-button"
              onClick={() => onOpenImage({ alt: item.title, src: item.image })}
              type="button"
            >
              <img src={item.image} alt={item.title} />
            </button>
            <div className="timeline-content">
              <span className="timeline-category">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function ProfilePage() {
  return (
    <div className="page space-y-8 pb-10">
      <div className="page-head">
        <h1>Hakkında Her Şey</h1>
        <p>Unutmamak gereken o özel detaylar...</p>
      </div>

      <section className="glass-card partner-card">
        <div className="partner-avatar">
          <img src={heroImage} alt="Sıla" />
        </div>
        <div>
          <h2>Canım Partnerim</h2>
          <p>Seni En İyi Ben Tanırım</p>
        </div>
      </section>

      <section className="space-y-4">
        <h3>Önemli Detaylar</h3>
        <div className="detail-grid">
          {importantDetails.map((item) => (
            <article key={item.label} className="glass detail-box">
              <span className="detail-emoji">{item.icon}</span>
              <span className="detail-label">{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3>Favorileri</h3>
        <div className="favorites-list">
          {favorites.map((item) => (
            <article key={item.label} className="glass favorite-row">
              <div className="favorite-icon">{item.icon}</div>
              <div>
                <span className="detail-label">{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3>Sevmediği Şeyler</h3>
        <div className="detail-grid small">
          {sensitiveItems.map((item) => (
            <article key={item.label} className="glass detail-box">
              <span className="detail-emoji">{item.icon}</span>
              <span className="detail-label">{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3>Çok İstiyor</h3>
        <article className="glass-card wish-card">
          <span className="wish-icon">{biggestWish.icon}</span>
          <div>
            <span className="detail-label">{biggestWish.label}</span>
            <strong>{biggestWish.value}</strong>
          </div>
        </article>
      </section>

      <section className="space-y-4">
        <h3>Gelecek Hayallerimiz</h3>
        <div className="future-grid">
          {futureItems.map((item) => (
            <article key={item.label} className="glass-card future-card">
              <span className="future-icon">{item.icon}</span>
              <span className="detail-label">{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function LoveLabPage({
  dreams,
  toggleDream,
  handleCouponUse,
  usedCoupons,
}) {
  return (
    <div className="page space-y-8 pb-10">
      <div className="page-head">
        <h1>Mod</h1>
        <p>İlişkimizi canlandıran küçük oyunlar...</p>
      </div>

      <section className="space-y-4">
        <div className="section-title-row">
          <h3>Aşk Kuponları</h3>
          <span>
            {usedCoupons.length}/{coupons.length} Kullanıldı
          </span>
        </div>
        <div className="coupon-grid">
          {coupons.map((coupon) => {
            const used = usedCoupons.includes(coupon.id)
            return (
              <button
                key={coupon.id}
                className={`coupon-card ${coupon.color} ${used ? 'used' : ''}`}
                disabled={used}
                onClick={() => handleCouponUse(coupon.id)}
                type="button"
              >
                <span className="coupon-icon">{coupon.icon}</span>
                <div>
                  <strong>{coupon.title}</strong>
                  <span>{used ? 'Kullanıldı' : 'Hemen Kullan'}</span>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h3>Ortak Hayal Listesi</h3>
        <div className="glass-card checklist">
          {dreams.map((dream) => (
            <button
              key={dream.id}
              className={dream.completed ? 'check-row done' : 'check-row'}
              onClick={() => toggleDream(dream.id)}
              type="button"
            >
              <span>{dream.completed ? '✓' : '○'}</span>
              <span>{dream.title}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="glass-card song-card">
        <div className="song-icon">♫</div>
        <div>
          <span className="song-label">Bizim Şarkımız</span>
          <strong>American Pie</strong>
          <p>Bir de ekstra duygulandıran şarkı: Arkadaşım Eşek</p>
        </div>
      </section>
    </div>
  )
}

function MiniGrid({ title, items }) {
  return (
    <section className="space-y-4">
      <h2>{title}</h2>
      <div className="mini-grid">
        {items.map((item) => (
          <article key={item.name} className="glass-card mini-card">
            <span className="mini-icon">{item.icon}</span>
            <div>
              <h4>{item.name}</h4>
              <p>{item.meta}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function daysUntilBirthday(monthIndex, day) {
  const now = new Date()
  const year = now.getFullYear()
  const nextBirthday = new Date(year, monthIndex, day)
  if (nextBirthday < new Date(year, now.getMonth(), now.getDate())) {
    nextBirthday.setFullYear(year + 1)
  }
  const diff = nextBirthday.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function pickDailyItem(list, offset = 0) {
  const now = new Date()
  const daySeed = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  const index = Math.abs(Math.floor(daySeed / 86400000) + offset) % list.length
  return list[index]
}

function getTodayKey() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function loadDailyCoupons() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(COUPON_STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    if (parsed.dayKey !== getTodayKey() || !Array.isArray(parsed.usedCoupons)) {
      return []
    }

    return parsed.usedCoupons
  } catch {
    return []
  }
}

function persistDailyCoupons(usedCoupons) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(
    COUPON_STORAGE_KEY,
    JSON.stringify({
      dayKey: getTodayKey(),
      usedCoupons,
    }),
  )
}

function loadDreams() {
  if (typeof window === 'undefined') {
    return dreamListSeed
  }

  try {
    const raw = window.localStorage.getItem(DREAMS_STORAGE_KEY)
    if (!raw) {
      return dreamListSeed
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return dreamListSeed
    }

    return dreamListSeed.map((dream) => {
      const saved = parsed.find((item) => item.id === dream.id)
      return saved ? { ...dream, completed: Boolean(saved.completed) } : dream
    })
  } catch {
    return dreamListSeed
  }
}

function persistDreams(dreams) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(DREAMS_STORAGE_KEY, JSON.stringify(dreams))
}

function BaseIcon({ children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

function TodayIcon() {
  return (
    <BaseIcon>
      <path d="M7 3v3" />
      <path d="M17 3v3" />
      <rect x="4" y="5" width="16" height="15" rx="3" />
      <path d="M4 10h16" />
      <path d="m10 15 1.2 1.2L14.5 13" />
    </BaseIcon>
  )
}

function GalleryIcon() {
  return (
    <BaseIcon>
      <rect x="3.5" y="5" width="17" height="14" rx="3" />
      <circle cx="8" cy="10" r="1.2" fill="currentColor" stroke="none" />
      <path d="m7 16 3.2-3.2a1 1 0 0 1 1.4 0l2 2 1.4-1.4a1 1 0 0 1 1.4 0L18 15" />
    </BaseIcon>
  )
}

function TogetherIcon() {
  return (
    <BaseIcon>
      <circle cx="9" cy="9" r="2.5" />
      <circle cx="15.5" cy="10" r="2.2" />
      <path d="M4.5 18c1.2-2.7 3.4-4 6.2-4s5 1.3 6.2 4" />
    </BaseIcon>
  )
}

function MoodIcon() {
  return (
    <BaseIcon>
      <path d="M12 20s-6-3.9-8.2-7.2C2 10.2 3.2 6.5 6.7 5.6c1.9-.5 3.7.2 4.8 1.7 1.1-1.5 2.9-2.2 4.8-1.7 3.5.9 4.7 4.6 2.9 7.2C18 16.1 12 20 12 20Z" />
    </BaseIcon>
  )
}

function TimeIcon() {
  return (
    <BaseIcon>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5" />
      <path d="M12 12.5 15 15" />
    </BaseIcon>
  )
}

function RoseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21c0-4.5 1.8-7 5.5-9.5" />
      <path d="M12 21c0-4.5-1.8-7-5.5-9.5" />
      <path d="M12 11c2.6 0 4.5-1.8 4.5-4 0-2-1.4-3.5-3.4-3.5-1 0-1.8.4-2.4 1.2-.6-.8-1.4-1.2-2.4-1.2C6.9 3.5 5.5 5 5.5 7c0 2.2 1.9 4 4.5 4Z" />
      <path d="M12 11v3" />
      <path d="M9.5 18h5" />
    </svg>
  )
}

function HeartInlineIcon() {
  return (
    <svg className="heart-inline" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21s-6.7-4.35-9.24-8.1C.76 9.94 2.1 5.7 5.95 4.7c2.1-.55 4.2.2 5.32 1.86C12.4 4.9 14.5 4.15 16.6 4.7c3.85 1 5.2 5.24 3.2 8.2C18.7 16.65 12 21 12 21Z" />
    </svg>
  )
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 12v8H4v-8" />
      <path d="M2 7h20v5H2z" />
      <path d="M12 7v13" />
      <path d="M12 7H8.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7Z" />
      <path d="M12 7h3.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7Z" />
    </svg>
  )
}

export default App
