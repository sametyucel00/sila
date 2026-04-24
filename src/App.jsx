import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './App.css'

const anniversaryDate = new Date('2023-10-06T00:00:00')
const heroImage = '/sila-portrait.jpg'
const COUPON_STORAGE_KEY = 'sila-daily-coupons'
const CONTENT_STORAGE_KEY = 'sila-content-v2'
const LEGACY_DREAMS_STORAGE_KEY = 'sila-dreams'
const LEGACY_CUSTOM_LISTS_STORAGE_KEY = 'sila-custom-lists'
const LEGACY_CUSTOM_TIMELINE_STORAGE_KEY = 'sila-custom-timeline'

const tabs = [
  { id: 'home', label: 'Bugün', icon: TodayIcon },
  { id: 'timeline', label: 'Anılar', icon: GalleryIcon },
  { id: 'moments', label: 'Zaman', icon: TimeIcon },
  { id: 'profile', label: 'Biz', icon: TogetherIcon },
  { id: 'lovelab', label: 'Mod', icon: MoodIcon },
]

const cityItemsSeed = createSeedList('cities', [
  { name: 'Alanya', icon: '🌴', meta: 'İlk buluşma' },
  { name: 'Bolu', icon: '🍃', meta: 'Gezi' },
  { name: 'Ordu', icon: '🌊', meta: 'Anılar' },
])

const venueItemsSeed = createSeedList('venues', [
  { name: 'Mcdonalds', icon: '🍔', meta: 'Yemek' },
  { name: 'Alanya Çay Bahçesi', icon: '🍵', meta: 'Çay' },
  { name: 'Shakespeare', icon: '🍽️', meta: 'Mekan' },
  { name: 'Starbucks', icon: '☕', meta: 'Kahve' },
])

const placeItemsSeed = createSeedList('places', [
  { name: 'Kızıl Kule', icon: '🧱', meta: 'Gezi' },
  { name: 'Alanya Kalesi', icon: '🏰', meta: 'Manzara' },
  { name: 'Yason Burnu', icon: '🌅', meta: 'Sahil' },
  { name: 'Boztepe', icon: '🌄', meta: 'Yukarıdan' },
])

const movieItemsSeed = createSeedList('movies', [
  { name: 'Star Wars', icon: '⭐', meta: 'En önemlisi' },
  { name: 'Arabalar 1-3', icon: '🚗', meta: 'Film' },
  { name: 'Avrupa Yakası', icon: '📺', meta: 'Dizi' },
  { name: 'Modern Family', icon: '🎬', meta: 'Dizi' },
  { name: 'Stranger Things', icon: '🛸', meta: 'Dizi' },
])

const gameItemsSeed = createSeedList('games', [
  { name: 'It Takes Two', icon: '🎮', meta: 'Co-op' },
  { name: 'A Way Out', icon: '🚔', meta: 'Kaçış' },
  { name: 'Sea of Thieves', icon: '🎮', meta: 'Macera' },
  { name: 'V Rising', icon: '🧛', meta: 'Vampir' },
  { name: 'Portal 2', icon: '🎮', meta: 'Bulmaca' },
  { name: 'Cuphead', icon: '🎮', meta: 'Zor' },
])

const timelineItemsSeed = createSeedList('moments', [
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
])

const importantDetailsSeed = createSeedList('importantDetails', [
  { label: 'Yüzük Ölçüsü', value: '14 beden / 54-60 mm', icon: '💍' },
  { label: 'Kan Grubu', value: 'A Rh+', icon: '🩸' },
  { label: 'En Sevdiği Çiçek', value: 'Lale', icon: '🌷' },
  { label: 'Burç', value: 'Yay', icon: '♐' },
  { label: 'Doğum Günü', value: '11 Aralık 2001', icon: '🎂' },
  { label: 'Favori Takı', value: 'Kolye', icon: '✨' },
])

const favoritesSeed = createSeedList('favorites', [
  { label: 'En Sevdiği Yemek', value: 'Mantı ve hamburger', icon: '🍔' },
  { label: 'Tatlı', value: 'Dondurma', icon: '🍨' },
  { label: 'Çikolata', value: 'Her türlü olur', icon: '🍫' },
  { label: 'Müzik', value: 'Türkçe pop ve yabancı pop', icon: '🎶' },
  { label: 'Favori Kahve', value: 'Filtre kahve', icon: '☕' },
  { label: 'Favori İçecek', value: 'Su', icon: '💧' },
  { label: 'Favori Alkol', value: 'Tekila', icon: '🥂' },
  { label: 'Favori Aktivite', value: 'Onu mutlu edecek her şey', icon: '🤍' },
])

const sensitiveItemsSeed = createSeedList('sensitiveItems', [
  { label: 'Hassas Nokta', value: 'Kulağının arkası', icon: '🌸' },
  { label: 'Korkusu', value: 'Böcekler, karanlık, izlenmek', icon: '🕷️' },
])

const wishItemsSeed = createSeedList('wishItems', [
  { label: 'En Büyük İsteği', value: 'Şu anda evlenmek', icon: '💒' },
])

const futureItemsSeed = createSeedList('futureItems', [
  { label: 'Kızımızın Adı', value: 'Elizabeth Ceylan', icon: '👶' },
  { label: 'Kedi Adları', value: 'Mırmır, Pamuk, Aşk, Kuzu', icon: '🐱' },
  { label: 'Köpek Adları', value: 'Deccal, Düşman, Nankör', icon: '🐶' },
])

const couponsSeed = createSeedList('coupons', [
  { title: 'Gece Dondurması', icon: '🍦', color: 'blue' },
  { title: 'Sınırsız Masaj', icon: '💆', color: 'rose' },
  { title: 'Film Seçme Hakkı', icon: '🎬', color: 'amber' },
  { title: 'Sınırsız İltifat', icon: '✨', color: 'teal' },
])

const dreamItemsSeed = createSeedList('dreams', [
  { title: 'Tatile gitmek', completed: false },
  { title: 'Evlenmek', completed: false },
  { title: 'Ev ve araba almak', completed: false },
  { title: 'Zengin olmak', completed: false },
  { title: 'Daha iyi bir Türkiye görmek', completed: false },
])

const songItemsSeed = createSeedList('songs', [
  {
    label: 'Bizim Şarkımız',
    value: 'American Pie',
    description: 'Bir de ekstra duygulandıran şarkı: Arkadaşım Eşek',
    icon: '♫',
  },
])

const specialDaysSeed = createSeedList('specialDays', [
  {
    date: '2001-12-11',
    icon: '🎂',
    label: 'Doğum Günü',
    recurring: 'yearly',
  },
])

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

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [todayKey, setTodayKey] = useState(() => getTodayKey())
  const [usedCoupons, setUsedCoupons] = useState(() => loadDailyCoupons())
  const [selectedTimelineImage, setSelectedTimelineImage] = useState(null)
  const [content, setContent] = useState(() => loadEditableContent())

  const togetherDays = daysSince(anniversaryDate)
  const noteOfDay = pickDailyItem(dailyNotes)
  const reasonOfDay = pickDailyItem(loveReasons, 7)

  useEffect(() => {
    document.title = 'Sıla'
  }, [])

  useEffect(() => {
    const now = new Date()
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      1,
    )
    const timeoutId = window.setTimeout(() => {
      setTodayKey(getTodayKey())
      setUsedCoupons(loadDailyCoupons())
    }, nextMidnight.getTime() - now.getTime())

    return () => window.clearTimeout(timeoutId)
  }, [todayKey])

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
    persistEditableContent(content)
  }, [content])

  const handleAddSectionItem = (sectionKey, item) => {
    setContent((current) => ({
      ...current,
      [sectionKey]: [...current[sectionKey], { id: createCustomId(sectionKey), ...item }],
    }))
  }

  const handleDeleteSectionItem = (sectionKey, itemId) => {
    setContent((current) => ({
      ...current,
      [sectionKey]: current[sectionKey].filter((item) => item.id !== itemId),
    }))
    setUsedCoupons((current) => current.filter((couponId) => couponId !== itemId))
  }

  const handleUpdateSectionItem = (sectionKey, itemId, updates) => {
    setContent((current) => ({
      ...current,
      [sectionKey]: current[sectionKey].map((item) =>
        item.id === itemId ? { ...item, ...updates } : item,
      ),
    }))
  }

  const toggleDream = (id) => {
    setContent((current) => ({
      ...current,
      dreams: current.dreams.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    }))
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
              noteOfDay={noteOfDay}
              onAddSectionItem={handleAddSectionItem}
              onDeleteSectionItem={handleDeleteSectionItem}
              onUpdateSectionItem={handleUpdateSectionItem}
              reasonOfDay={reasonOfDay}
              specialDays={content.specialDays}
              togetherDays={togetherDays}
            />
          )}
          {activeTab === 'timeline' && (
            <TimelinePage
              cityItems={content.cities}
              gameItems={content.games}
              movieItems={content.movies}
              onAddListItem={handleAddSectionItem}
              onDeleteListItem={handleDeleteSectionItem}
              onUpdateListItem={handleUpdateSectionItem}
              placeItems={content.places}
              venueItems={content.venues}
            />
          )}
          {activeTab === 'moments' && (
            <MomentsPage
              items={content.moments}
              onAddTimelineItem={(item) => handleAddSectionItem('moments', item)}
              onDeleteTimelineItem={(id) => handleDeleteSectionItem('moments', id)}
              onOpenImage={setSelectedTimelineImage}
              onUpdateTimelineItem={(id, updates) => handleUpdateSectionItem('moments', id, updates)}
            />
          )}
          {activeTab === 'profile' && (
            <ProfilePage
              favorites={content.favorites}
              futureItems={content.futureItems}
              importantDetails={content.importantDetails}
              onAddSectionItem={handleAddSectionItem}
              onDeleteSectionItem={handleDeleteSectionItem}
              onUpdateSectionItem={handleUpdateSectionItem}
              sensitiveItems={content.sensitiveItems}
              wishItems={content.wishItems}
            />
          )}
          {activeTab === 'lovelab' && (
            <LoveLabPage
              coupons={content.coupons}
              dreams={content.dreams}
              handleCouponUse={handleCouponUse}
              onAddSectionItem={handleAddSectionItem}
              onDeleteSectionItem={handleDeleteSectionItem}
              onUpdateSectionItem={handleUpdateSectionItem}
              songs={content.songs}
              toggleDream={toggleDream}
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

function HomePage({
  noteOfDay,
  onAddSectionItem,
  onDeleteSectionItem,
  onUpdateSectionItem,
  reasonOfDay,
  specialDays,
  togetherDays,
}) {
  const [specialDayModal, setSpecialDayModal] = useState(null)

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
          <button
            className="add-icon-button"
            onClick={() => setSpecialDayModal({ mode: 'add' })}
            type="button"
          >
            <PlusIcon />
          </button>
        </div>
        <div className="special-days-list">
          {specialDays.map((item) => {
            const status = getSpecialDayStatus(item)
            return (
              <article className="upcoming-item editable-card" key={item.id}>
                <div className="card-action-group vertical top-right">
                  <button
                    className="card-edit-button"
                    onClick={() => setSpecialDayModal({ item, mode: 'edit' })}
                    type="button"
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="card-delete-button"
                    onClick={() => onDeleteSectionItem('specialDays', item.id)}
                    type="button"
                  >
                    <TrashIcon />
                  </button>
                </div>
                <div className="upcoming-icon-wrap">
                  <span>{item.icon || <GiftIcon />}</span>
                </div>
                <div className="upcoming-copy">
                  <span className="fact-label">{item.recurring === 'yearly' ? 'Her Yıl' : 'Tek Seferlik'}</span>
                  <strong>{item.label}</strong>
                  <p className="upcoming-date-label">{formatDateLabel(item.date)}</p>
                </div>
                <div className="upcoming-days">
                  <strong>{status.value}</strong>
                  <span>{status.label}</span>
                </div>
              </article>
            )
          })}
        </div>
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

      {specialDayModal && (
        <FormModal
          title={specialDayModal.mode === 'edit' ? 'Özel Günü Düzenle' : 'Özel Gün Ekle'}
          onClose={() => setSpecialDayModal(null)}
        >
          <AddSpecialDayForm
            initialValues={specialDayModal.item}
            onSubmit={(item) => {
              if (specialDayModal.mode === 'edit') {
                onUpdateSectionItem('specialDays', specialDayModal.item.id, item)
              } else {
                onAddSectionItem('specialDays', item)
              }
              setSpecialDayModal(null)
            }}
            submitLabel={specialDayModal.mode === 'edit' ? 'Kaydet' : 'Ekle'}
          />
        </FormModal>
      )}
    </div>
  )
}

function TimelinePage({
  cityItems,
  gameItems,
  movieItems,
  onAddListItem,
  onDeleteListItem,
  onUpdateListItem,
  placeItems,
  venueItems,
}) {
  const [activeListModal, setActiveListModal] = useState(null)

  return (
    <div className="page space-y-10 pb-10">
      <div className="page-head">
        <h1>Anılarımız</h1>
        <p>Birlikte yazdığımız hikayenin sayfaları...</p>
      </div>

      <EditableMiniGrid
        items={cityItems}
        onDelete={(id) => onDeleteListItem('cities', id)}
        onEdit={(item) => setActiveListModal({ item, mode: 'edit', sectionKey: 'cities' })}
        onOpenAdd={() => setActiveListModal({ mode: 'add', sectionKey: 'cities' })}
        title="Gittiğimiz Şehirler"
      />
      <EditableMiniGrid
        items={venueItems}
        onDelete={(id) => onDeleteListItem('venues', id)}
        onEdit={(item) => setActiveListModal({ item, mode: 'edit', sectionKey: 'venues' })}
        onOpenAdd={() => setActiveListModal({ mode: 'add', sectionKey: 'venues' })}
        title="Gittiğimiz Mekanlar"
      />
      <EditableMiniGrid
        items={placeItems}
        onDelete={(id) => onDeleteListItem('places', id)}
        onEdit={(item) => setActiveListModal({ item, mode: 'edit', sectionKey: 'places' })}
        onOpenAdd={() => setActiveListModal({ mode: 'add', sectionKey: 'places' })}
        title="Gittiğimiz Yerler"
      />
      <EditableMiniGrid
        items={movieItems}
        onDelete={(id) => onDeleteListItem('movies', id)}
        onEdit={(item) => setActiveListModal({ item, mode: 'edit', sectionKey: 'movies' })}
        onOpenAdd={() => setActiveListModal({ mode: 'add', sectionKey: 'movies' })}
        title="İzlediğimiz Filmler"
      />
      <EditableMiniGrid
        items={gameItems}
        onDelete={(id) => onDeleteListItem('games', id)}
        onEdit={(item) => setActiveListModal({ item, mode: 'edit', sectionKey: 'games' })}
        onOpenAdd={() => setActiveListModal({ mode: 'add', sectionKey: 'games' })}
        title="Oynadığımız Oyunlar"
      />

      {activeListModal && (
        <FormModal
          title={
            activeListModal.mode === 'edit'
              ? `${getAddModalTitle(activeListModal.sectionKey)} Düzenle`
              : getAddModalTitle(activeListModal.sectionKey)
          }
          onClose={() => setActiveListModal(null)}
        >
          <AddMiniItemForm
            defaults={getMiniDefaults(activeListModal.sectionKey)}
            initialValues={activeListModal.item}
            onSubmit={(item) => {
              if (activeListModal.mode === 'edit') {
                onUpdateListItem(activeListModal.sectionKey, activeListModal.item.id, item)
              } else {
                onAddListItem(activeListModal.sectionKey, item)
              }
              setActiveListModal(null)
            }}
            submitLabel={activeListModal.mode === 'edit' ? 'Kaydet' : 'Ekle'}
          />
        </FormModal>
      )}
    </div>
  )
}

function MomentsPage({
  items,
  onAddTimelineItem,
  onDeleteTimelineItem,
  onOpenImage,
  onUpdateTimelineItem,
}) {
  const [timelineModal, setTimelineModal] = useState(null)

  return (
    <div className="page space-y-10 pb-10">
      <div className="page-head">
        <h1>Zaman Tüneli</h1>
        <p>Birlikte en güzel duran anların ayrı sayfası...</p>
      </div>

      <div className="section-title-row">
        <h2>Zaman Tüneli Kartları</h2>
        <button
          className="add-icon-button"
          onClick={() => setTimelineModal({ mode: 'add' })}
          type="button"
        >
          <PlusIcon />
        </button>
      </div>

      <div className="timeline-list">
        {items.map((item) => (
          <article key={item.id} className="timeline-card glass-card editable-card">
            <div className="card-action-group top-right">
              <button
                className="card-edit-button dark"
                onClick={() => setTimelineModal({ item, mode: 'edit' })}
                type="button"
              >
                <EditIcon />
              </button>
              <button
                className="card-delete-button dark"
                onClick={() => onDeleteTimelineItem(item.id)}
                type="button"
              >
                <TrashIcon />
              </button>
            </div>
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

      {timelineModal && (
        <FormModal
          title={timelineModal.mode === 'edit' ? 'Zaman Tünelini Düzenle' : 'Zaman Tüneline Ekle'}
          onClose={() => setTimelineModal(null)}
        >
          <AddTimelineItemForm
            initialValues={timelineModal.item}
            onSubmit={(item) => {
              if (timelineModal.mode === 'edit') {
                onUpdateTimelineItem(timelineModal.item.id, item)
              } else {
                onAddTimelineItem(item)
              }
              setTimelineModal(null)
            }}
            submitLabel={timelineModal.mode === 'edit' ? 'Kaydet' : 'Zaman Tüneline Ekle'}
          />
        </FormModal>
      )}
    </div>
  )
}

function ProfilePage({
  favorites,
  futureItems,
  importantDetails,
  onAddSectionItem,
  onDeleteSectionItem,
  onUpdateSectionItem,
  sensitiveItems,
  wishItems,
}) {
  const [activeDetailModal, setActiveDetailModal] = useState(null)

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

      <EditableInfoSection
        items={importantDetails}
        onDelete={(id) => onDeleteSectionItem('importantDetails', id)}
        onEdit={(item) =>
          setActiveDetailModal({ item, mode: 'edit', sectionKey: 'importantDetails' })
        }
        onOpenAdd={() => setActiveDetailModal({ mode: 'add', sectionKey: 'importantDetails' })}
        title="Önemli Detaylar"
        variant="detail"
      />

      <EditableInfoSection
        items={favorites}
        onDelete={(id) => onDeleteSectionItem('favorites', id)}
        onEdit={(item) => setActiveDetailModal({ item, mode: 'edit', sectionKey: 'favorites' })}
        onOpenAdd={() => setActiveDetailModal({ mode: 'add', sectionKey: 'favorites' })}
        title="Favorileri"
        variant="favorite"
      />

      <EditableInfoSection
        items={sensitiveItems}
        onDelete={(id) => onDeleteSectionItem('sensitiveItems', id)}
        onEdit={(item) =>
          setActiveDetailModal({ item, mode: 'edit', sectionKey: 'sensitiveItems' })
        }
        onOpenAdd={() => setActiveDetailModal({ mode: 'add', sectionKey: 'sensitiveItems' })}
        title="Sevmediği Şeyler"
        variant="detail"
      />

      <EditableInfoSection
        items={wishItems}
        onDelete={(id) => onDeleteSectionItem('wishItems', id)}
        onEdit={(item) => setActiveDetailModal({ item, mode: 'edit', sectionKey: 'wishItems' })}
        onOpenAdd={() => setActiveDetailModal({ mode: 'add', sectionKey: 'wishItems' })}
        title="Çok İstiyor"
        variant="wish"
      />

      <EditableInfoSection
        items={futureItems}
        onDelete={(id) => onDeleteSectionItem('futureItems', id)}
        onEdit={(item) =>
          setActiveDetailModal({ item, mode: 'edit', sectionKey: 'futureItems' })
        }
        onOpenAdd={() => setActiveDetailModal({ mode: 'add', sectionKey: 'futureItems' })}
        title="Gelecek Hayallerimiz"
        variant="future"
      />

      {activeDetailModal && (
        <FormModal
          title={
            activeDetailModal.mode === 'edit'
              ? `${getAddModalTitle(activeDetailModal.sectionKey)} Düzenle`
              : getAddModalTitle(activeDetailModal.sectionKey)
          }
          onClose={() => setActiveDetailModal(null)}
        >
          <AddDetailItemForm
            defaults={getDetailDefaults(activeDetailModal.sectionKey)}
            initialValues={activeDetailModal.item}
            onSubmit={(item) => {
              if (activeDetailModal.mode === 'edit') {
                onUpdateSectionItem(
                  activeDetailModal.sectionKey,
                  activeDetailModal.item.id,
                  item,
                )
              } else {
                onAddSectionItem(activeDetailModal.sectionKey, item)
              }
              setActiveDetailModal(null)
            }}
            submitLabel={activeDetailModal.mode === 'edit' ? 'Kaydet' : 'Ekle'}
          />
        </FormModal>
      )}
    </div>
  )
}

function LoveLabPage({
  coupons,
  dreams,
  handleCouponUse,
  onAddSectionItem,
  onDeleteSectionItem,
  onUpdateSectionItem,
  songs,
  toggleDream,
  usedCoupons,
}) {
  const [activeLabModal, setActiveLabModal] = useState(null)

  return (
    <div className="page space-y-8 pb-10">
      <div className="page-head">
        <h1>Mod</h1>
        <p>İlişkimizi canlandıran küçük oyunlar...</p>
      </div>

      <section className="space-y-4">
        <div className="section-title-row">
          <h3>Aşk Kuponları</h3>
          <div className="section-actions">
            <span>
              {usedCoupons.filter((id) => coupons.some((coupon) => coupon.id === id)).length}/
              {coupons.length} Kullanıldı
            </span>
            <button
              className="add-icon-button"
              onClick={() => setActiveLabModal({ mode: 'add', sectionKey: 'coupons' })}
              type="button"
            >
              <PlusIcon />
            </button>
          </div>
        </div>
        <div className="coupon-grid">
          {coupons.map((coupon) => {
            const used = usedCoupons.includes(coupon.id)
            return (
              <article key={coupon.id} className={`coupon-card ${coupon.color} editable-card`}>
                <div className="card-action-group top-right">
                  <button
                    className="card-edit-button dark"
                    onClick={() => setActiveLabModal({ item: coupon, mode: 'edit', sectionKey: 'coupons' })}
                    type="button"
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="card-delete-button dark"
                    onClick={() => onDeleteSectionItem('coupons', coupon.id)}
                    type="button"
                  >
                    <TrashIcon />
                  </button>
                </div>
                <button
                  className={used ? 'coupon-action used' : 'coupon-action'}
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
              </article>
            )
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="section-title-row">
          <h3>Ortak Hayal Listesi</h3>
          <button
            className="add-icon-button"
            onClick={() => setActiveLabModal({ mode: 'add', sectionKey: 'dreams' })}
            type="button"
          >
            <PlusIcon />
          </button>
        </div>
        <div className="glass-card checklist">
          {dreams.map((dream) => (
            <div key={dream.id} className={dream.completed ? 'check-row done' : 'check-row'}>
              <button className="check-toggle" onClick={() => toggleDream(dream.id)} type="button">
                <span>{dream.completed ? '✓' : '○'}</span>
                <span>{dream.title}</span>
              </button>
              <button
                className="row-edit-button"
                onClick={() => setActiveLabModal({ item: dream, mode: 'edit', sectionKey: 'dreams' })}
                type="button"
              >
                <EditIcon />
              </button>
              <button
                className="row-delete-button"
                onClick={() => onDeleteSectionItem('dreams', dream.id)}
                type="button"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="section-title-row">
          <h3>Şarkılarımız</h3>
          <button
            className="add-icon-button"
            onClick={() => setActiveLabModal({ mode: 'add', sectionKey: 'songs' })}
            type="button"
          >
            <PlusIcon />
          </button>
        </div>
        <div className="space-y-4">
          {songs.map((song) => (
            <section key={song.id} className="glass-card song-card editable-card">
              <div className="card-action-group top-right">
                <button
                  className="card-edit-button dark"
                  onClick={() => setActiveLabModal({ item: song, mode: 'edit', sectionKey: 'songs' })}
                  type="button"
                >
                  <EditIcon />
                </button>
                <button
                  className="card-delete-button dark"
                  onClick={() => onDeleteSectionItem('songs', song.id)}
                  type="button"
                >
                  <TrashIcon />
                </button>
              </div>
              <div className="song-icon">{song.icon}</div>
              <div>
                <span className="song-label">{song.label}</span>
                <strong>{song.value}</strong>
                <p>{song.description}</p>
              </div>
            </section>
          ))}
        </div>
      </section>

      {activeLabModal && (
        <FormModal
          title={
            activeLabModal.mode === 'edit'
              ? `${getAddModalTitle(activeLabModal.sectionKey)} Düzenle`
              : getAddModalTitle(activeLabModal.sectionKey)
          }
          onClose={() => setActiveLabModal(null)}
        >
          {activeLabModal.sectionKey === 'coupons' && (
            <AddCouponForm
              initialValues={activeLabModal.item}
              onSubmit={(item) => {
                if (activeLabModal.mode === 'edit') {
                  onUpdateSectionItem('coupons', activeLabModal.item.id, item)
                } else {
                  onAddSectionItem('coupons', item)
                }
                setActiveLabModal(null)
              }}
              submitLabel={activeLabModal.mode === 'edit' ? 'Kaydet' : 'Kuponu Ekle'}
            />
          )}
          {activeLabModal.sectionKey === 'dreams' && (
            <AddDreamForm
              initialValues={activeLabModal.item}
              onSubmit={(item) => {
                if (activeLabModal.mode === 'edit') {
                  onUpdateSectionItem('dreams', activeLabModal.item.id, item)
                } else {
                  onAddSectionItem('dreams', item)
                }
                setActiveLabModal(null)
              }}
              submitLabel={activeLabModal.mode === 'edit' ? 'Kaydet' : 'Hayali Ekle'}
            />
          )}
          {activeLabModal.sectionKey === 'songs' && (
            <AddSongForm
              initialValues={activeLabModal.item}
              onSubmit={(item) => {
                if (activeLabModal.mode === 'edit') {
                  onUpdateSectionItem('songs', activeLabModal.item.id, item)
                } else {
                  onAddSectionItem('songs', item)
                }
                setActiveLabModal(null)
              }}
              submitLabel={activeLabModal.mode === 'edit' ? 'Kaydet' : 'Ekle'}
            />
          )}
        </FormModal>
      )}
    </div>
  )
}

function EditableMiniGrid({ items, onDelete, onEdit, onOpenAdd, title }) {
  return (
    <section className="space-y-4">
      <div className="section-title-row">
        <h2>{title}</h2>
        <button className="add-icon-button" onClick={onOpenAdd} type="button">
          <PlusIcon />
        </button>
      </div>
      <div className="mini-grid">
        {items.map((item) => (
          <article key={item.id} className="glass-card mini-card editable-card">
            <div className="card-action-group vertical">
              <button className="card-edit-button" onClick={() => onEdit(item)} type="button">
                <EditIcon />
              </button>
              <button className="card-delete-button" onClick={() => onDelete(item.id)} type="button">
                <TrashIcon />
              </button>
            </div>
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

function EditableInfoSection({ items, onDelete, onEdit, onOpenAdd, title, variant }) {
  const gridClass =
    variant === 'favorite'
      ? 'favorites-list'
      : variant === 'future'
        ? 'future-grid'
        : variant === 'wish'
          ? 'space-y-4'
          : 'detail-grid'

  return (
    <section className="space-y-4">
      <div className="section-title-row">
        <h3>{title}</h3>
        <button className="add-icon-button" onClick={onOpenAdd} type="button">
          <PlusIcon />
        </button>
      </div>
      <div className={gridClass}>
        {items.map((item) => (
          <InfoCard
            item={item}
            key={item.id}
            onDelete={() => onDelete(item.id)}
            onEdit={() => onEdit(item)}
            variant={variant}
          />
        ))}
      </div>
    </section>
  )
}

function InfoCard({ item, onDelete, onEdit, variant }) {
  if (variant === 'favorite') {
    return (
      <article className="glass favorite-row editable-card">
        <div className="card-action-group vertical">
          <button className="card-edit-button" onClick={onEdit} type="button">
            <EditIcon />
          </button>
          <button className="card-delete-button" onClick={onDelete} type="button">
            <TrashIcon />
          </button>
        </div>
        <div className="favorite-icon">{item.icon}</div>
        <div>
          <span className="detail-label">{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      </article>
    )
  }

  if (variant === 'future') {
    return (
      <article className="glass-card future-card editable-card">
        <div className="card-action-group vertical">
          <button className="card-edit-button" onClick={onEdit} type="button">
            <EditIcon />
          </button>
          <button className="card-delete-button" onClick={onDelete} type="button">
            <TrashIcon />
          </button>
        </div>
        <span className="future-icon">{item.icon}</span>
        <span className="detail-label">{item.label}</span>
        <strong>{item.value}</strong>
      </article>
    )
  }

  if (variant === 'wish') {
    return (
      <article className="glass-card wish-card editable-card">
        <div className="card-action-group vertical">
          <button className="card-edit-button" onClick={onEdit} type="button">
            <EditIcon />
          </button>
          <button className="card-delete-button" onClick={onDelete} type="button">
            <TrashIcon />
          </button>
        </div>
        <span className="wish-icon">{item.icon}</span>
        <div>
          <span className="detail-label">{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      </article>
    )
  }

  return (
    <article className="glass detail-box editable-card">
      <div className="card-action-group vertical">
        <button className="card-edit-button" onClick={onEdit} type="button">
          <EditIcon />
        </button>
        <button className="card-delete-button" onClick={onDelete} type="button">
          <TrashIcon />
        </button>
      </div>
      <span className="detail-emoji">{item.icon}</span>
      <span className="detail-label">{item.label}</span>
      <strong>{item.value}</strong>
    </article>
  )
}

function AddMiniItemForm({ defaults, initialValues, onSubmit, submitLabel = 'Ekle' }) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [meta, setMeta] = useState(initialValues?.meta ?? '')
  const [icon, setIcon] = useState(initialValues?.icon ?? defaults.icon)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!name.trim() || !meta.trim()) {
      return
    }

    onSubmit({
      icon: icon.trim() || defaults.icon,
      meta: meta.trim(),
      name: name.trim(),
    })
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-grid compact">
        <label className="form-field">
          <span>Başlık</span>
          <input
            onChange={(event) => setName(event.target.value)}
            placeholder={defaults.namePlaceholder}
            type="text"
            value={name}
          />
        </label>
        <label className="form-field">
          <span>Alt Bilgi</span>
          <input
            onChange={(event) => setMeta(event.target.value)}
            placeholder={defaults.metaPlaceholder}
            type="text"
            value={meta}
          />
        </label>
      </div>
      <div className="form-actions">
        <label className="form-field icon-field">
          <span>İkon</span>
          <input
            maxLength={4}
            onChange={(event) => setIcon(event.target.value)}
            placeholder={defaults.icon}
            type="text"
            value={icon}
          />
        </label>
        <button className="add-submit" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

function AddDetailItemForm({ defaults, initialValues, onSubmit, submitLabel = 'Ekle' }) {
  const [label, setLabel] = useState(initialValues?.label ?? '')
  const [value, setValue] = useState(initialValues?.value ?? '')
  const [icon, setIcon] = useState(initialValues?.icon ?? defaults.icon)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!label.trim() || !value.trim()) {
      return
    }

    onSubmit({
      icon: icon.trim() || defaults.icon,
      label: label.trim(),
      value: value.trim(),
    })
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-grid compact">
        <label className="form-field">
          <span>Başlık</span>
          <input
            onChange={(event) => setLabel(event.target.value)}
            placeholder={defaults.labelPlaceholder}
            type="text"
            value={label}
          />
        </label>
        <label className="form-field">
          <span>İçerik</span>
          <input
            onChange={(event) => setValue(event.target.value)}
            placeholder={defaults.valuePlaceholder}
            type="text"
            value={value}
          />
        </label>
      </div>
      <div className="form-actions">
        <label className="form-field icon-field">
          <span>İkon</span>
          <input
            maxLength={4}
            onChange={(event) => setIcon(event.target.value)}
            placeholder={defaults.icon}
            type="text"
            value={icon}
          />
        </label>
        <button className="add-submit" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

function AddTimelineItemForm({ initialValues, onSubmit, submitLabel = 'Zaman Tüneline Ekle' }) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [category, setCategory] = useState(initialValues?.category ?? '')
  const [description, setDescription] = useState(initialValues?.description ?? '')
  const [image, setImage] = useState(initialValues?.image ?? '')

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!title.trim() || !category.trim() || !description.trim() || !image) {
      return
    }

    onSubmit({
      category: category.trim(),
      description: description.trim(),
      image,
      title: title.trim(),
    })
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="form-field">
          <span>Başlık</span>
          <input
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Yeni anı başlığı"
            type="text"
            value={title}
          />
        </label>
        <label className="form-field">
          <span>Kategori</span>
          <input
            onChange={(event) => setCategory(event.target.value)}
            placeholder="Özel Gün"
            type="text"
            value={category}
          />
        </label>
      </div>
      <label className="form-field">
        <span>Açıklama</span>
        <textarea
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Bu anı kısa şekilde anlat"
          rows="3"
          value={description}
        />
      </label>
      <label className="form-field">
        <span>Fotoğraf</span>
        <input accept="image/*" onChange={handleFileChange} type="file" />
      </label>
      <button className="add-submit full" type="submit">
        {submitLabel}
      </button>
    </form>
  )
}

function AddCouponForm({ initialValues, onSubmit, submitLabel = 'Kuponu Ekle' }) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [icon, setIcon] = useState(initialValues?.icon ?? '🎁')
  const [color, setColor] = useState(initialValues?.color ?? 'rose')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    onSubmit({
      color,
      icon: icon.trim() || '🎁',
      title: title.trim(),
    })
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span>Kupon Başlığı</span>
        <input
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Yeni kupon adı"
          type="text"
          value={title}
        />
      </label>
      <div className="form-grid compact">
        <label className="form-field">
          <span>İkon</span>
          <input
            maxLength={4}
            onChange={(event) => setIcon(event.target.value)}
            placeholder="🎁"
            type="text"
            value={icon}
          />
        </label>
        <label className="form-field">
          <span>Renk</span>
          <select onChange={(event) => setColor(event.target.value)} value={color}>
            <option value="blue">Mavi</option>
            <option value="rose">Pembe</option>
            <option value="amber">Turuncu</option>
            <option value="teal">Yeşil</option>
          </select>
        </label>
      </div>
      <button className="add-submit full" type="submit">
        {submitLabel}
      </button>
    </form>
  )
}

function AddDreamForm({ initialValues, onSubmit, submitLabel = 'Hayali Ekle' }) {
  const [title, setTitle] = useState(initialValues?.title ?? '')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    onSubmit({
      completed: initialValues?.completed ?? false,
      title: title.trim(),
    })
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span>Hayal</span>
        <input
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Yeni ortak hayal"
          type="text"
          value={title}
        />
      </label>
      <button className="add-submit full" type="submit">
        {submitLabel}
      </button>
    </form>
  )
}

function AddSongForm({ initialValues, onSubmit, submitLabel = 'Ekle' }) {
  const [label, setLabel] = useState(initialValues?.label ?? 'Bizim Şarkımız')
  const [value, setValue] = useState(initialValues?.value ?? '')
  const [description, setDescription] = useState(initialValues?.description ?? '')
  const [icon, setIcon] = useState(initialValues?.icon ?? '♫')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!label.trim() || !value.trim()) {
      return
    }

    onSubmit({
      description: description.trim(),
      icon: icon.trim() || '♫',
      label: label.trim(),
      value: value.trim(),
    })
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-grid compact">
        <label className="form-field">
          <span>Etiket</span>
          <input
            onChange={(event) => setLabel(event.target.value)}
            placeholder="Bizim Şarkımız"
            type="text"
            value={label}
          />
        </label>
        <label className="form-field">
          <span>Şarkı</span>
          <input
            onChange={(event) => setValue(event.target.value)}
            placeholder="Şarkı adı"
            type="text"
            value={value}
          />
        </label>
      </div>
      <label className="form-field">
        <span>Açıklama</span>
        <textarea
          onChange={(event) => setDescription(event.target.value)}
          placeholder="İstersen kısa bir not"
          rows="3"
          value={description}
        />
      </label>
      <div className="form-actions">
        <label className="form-field icon-field">
          <span>İkon</span>
          <input
            maxLength={4}
            onChange={(event) => setIcon(event.target.value)}
            placeholder="♫"
            type="text"
            value={icon}
          />
        </label>
        <button className="add-submit" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

function AddSpecialDayForm({ initialValues, onSubmit, submitLabel = 'Ekle' }) {
  const [label, setLabel] = useState(initialValues?.label ?? '')
  const [date, setDate] = useState(initialValues?.date ?? '')
  const [icon, setIcon] = useState(initialValues?.icon ?? '🎉')
  const [recurring, setRecurring] = useState(initialValues?.recurring ?? 'once')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!label.trim() || !date) {
      return
    }
    onSubmit({
      date,
      icon: icon.trim() || '🎉',
      label: label.trim(),
      recurring,
    })
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-grid compact">
        <label className="form-field">
          <span>Başlık</span>
          <input onChange={(event) => setLabel(event.target.value)} type="text" value={label} />
        </label>
        <label className="form-field">
          <span>Tarih</span>
          <input onChange={(event) => setDate(event.target.value)} type="date" value={date} />
        </label>
      </div>
      <div className="form-grid compact">
        <label className="form-field">
          <span>İkon</span>
          <input
            maxLength={4}
            onChange={(event) => setIcon(event.target.value)}
            placeholder="🎉"
            type="text"
            value={icon}
          />
        </label>
        <label className="form-field">
          <span>Tekrar</span>
          <select onChange={(event) => setRecurring(event.target.value)} value={recurring}>
            <option value="once">Bir kere</option>
            <option value="yearly">Her yıl</option>
          </select>
        </label>
      </div>
      <button className="add-submit full" type="submit">
        {submitLabel}
      </button>
    </form>
  )
}

function FormModal({ children, onClose, title }) {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const modal = (
    <div className="form-modal-backdrop" onClick={onClose} role="button" tabIndex={0}>
      <div className="form-modal" onClick={(event) => event.stopPropagation()}>
        <div className="form-modal-head">
          <h3>{title}</h3>
          <button className="form-modal-close" onClick={onClose} type="button">
            ×
          </button>
        </div>
        <div className="form-modal-body">{children}</div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}

function createSeedList(sectionKey, items) {
  return items.map((item, index) => ({
    id: `${sectionKey}-seed-${index}`,
    ...item,
  }))
}

function createCustomId(sectionKey) {
  return `${sectionKey}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function getDefaultContent() {
  return {
    cities: cityItemsSeed.map(cloneItem),
    coupons: couponsSeed.map(cloneItem),
    dreams: dreamItemsSeed.map(cloneItem),
    favorites: favoritesSeed.map(cloneItem),
    futureItems: futureItemsSeed.map(cloneItem),
    games: gameItemsSeed.map(cloneItem),
    importantDetails: importantDetailsSeed.map(cloneItem),
    moments: timelineItemsSeed.map(cloneItem),
    movies: movieItemsSeed.map(cloneItem),
    places: placeItemsSeed.map(cloneItem),
    specialDays: specialDaysSeed.map(cloneItem),
    sensitiveItems: sensitiveItemsSeed.map(cloneItem),
    songs: songItemsSeed.map(cloneItem),
    venues: venueItemsSeed.map(cloneItem),
    wishItems: wishItemsSeed.map(cloneItem),
  }
}

function cloneItem(item) {
  return { ...item }
}

function loadEditableContent() {
  const fallback = getDefaultContent()

  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const raw = window.localStorage.getItem(CONTENT_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        cities: normalizeItems(parsed.cities, fallback.cities),
        coupons: normalizeItems(parsed.coupons, fallback.coupons),
        dreams: normalizeItems(parsed.dreams, fallback.dreams),
        favorites: normalizeItems(parsed.favorites, fallback.favorites),
        futureItems: normalizeItems(parsed.futureItems, fallback.futureItems),
        games: normalizeItems(parsed.games, fallback.games),
        importantDetails: normalizeItems(parsed.importantDetails, fallback.importantDetails),
        moments: normalizeItems(parsed.moments, fallback.moments),
        movies: normalizeItems(parsed.movies, fallback.movies),
        places: normalizeItems(parsed.places, fallback.places),
        specialDays: normalizeItems(parsed.specialDays, fallback.specialDays),
        sensitiveItems: normalizeItems(parsed.sensitiveItems, fallback.sensitiveItems),
        songs: normalizeItems(parsed.songs, fallback.songs),
        venues: normalizeItems(parsed.venues, fallback.venues),
        wishItems: normalizeItems(parsed.wishItems, fallback.wishItems),
      }
    }
  } catch {
    return fallback
  }

  return migrateLegacyContent(fallback)
}

function persistEditableContent(content) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content))
}

function normalizeItems(items, fallbackItems) {
  if (!Array.isArray(items)) {
    return fallbackItems.map(cloneItem)
  }

  return items.map((item, index) => ({
    ...item,
    id: item.id ?? `${fallbackItems[0]?.id?.split('-seed-')[0] ?? 'item'}-legacy-${index}`,
  }))
}

function migrateLegacyContent(fallback) {
  const next = getDefaultContent()

  try {
    const legacyLists = window.localStorage.getItem(LEGACY_CUSTOM_LISTS_STORAGE_KEY)
    if (legacyLists) {
      const parsed = JSON.parse(legacyLists)
      next.cities = [...next.cities, ...appendLegacyItems('cities', parsed.cities)]
      next.venues = [...next.venues, ...appendLegacyItems('venues', parsed.venues)]
      next.places = [...next.places, ...appendLegacyItems('places', parsed.places)]
      next.movies = [...next.movies, ...appendLegacyItems('movies', parsed.movies)]
      next.games = [...next.games, ...appendLegacyItems('games', parsed.games)]
    }
  } catch {
    return fallback
  }

  try {
    const legacyTimeline = window.localStorage.getItem(LEGACY_CUSTOM_TIMELINE_STORAGE_KEY)
    if (legacyTimeline) {
      const parsed = JSON.parse(legacyTimeline)
      next.moments = [...next.moments, ...appendLegacyItems('moments', parsed)]
    }
  } catch {
    return fallback
  }

  try {
    const legacyDreams = window.localStorage.getItem(LEGACY_DREAMS_STORAGE_KEY)
    if (legacyDreams) {
      const parsed = JSON.parse(legacyDreams)
      if (Array.isArray(parsed)) {
        next.dreams = parsed.map((item, index) => ({
          completed: Boolean(item.completed),
          id: item.id ?? `dreams-legacy-${index}`,
          title: item.title ?? '',
        }))
      }
    }
  } catch {
    return fallback
  }

  return next
}

function appendLegacyItems(sectionKey, items) {
  if (!Array.isArray(items)) {
    return []
  }

  return items.map((item, index) => ({
    id: `${sectionKey}-legacy-${index}`,
    ...item,
  }))
}

function getMiniDefaults(listKey) {
  const defaults = {
    cities: {
      icon: '🌍',
      metaPlaceholder: 'İlk buluşma gibi',
      namePlaceholder: 'Şehir adı',
    },
    games: {
      icon: '🎮',
      metaPlaceholder: 'Co-op, macera gibi',
      namePlaceholder: 'Oyun adı',
    },
    movies: {
      icon: '🎬',
      metaPlaceholder: 'Film veya dizi',
      namePlaceholder: 'İçerik adı',
    },
    places: {
      icon: '📍',
      metaPlaceholder: 'Manzara, sahil gibi',
      namePlaceholder: 'Yer adı',
    },
    venues: {
      icon: '🍽️',
      metaPlaceholder: 'Kahve, yemek gibi',
      namePlaceholder: 'Mekan adı',
    },
  }

  return defaults[listKey]
}

function getDetailDefaults(sectionKey) {
  const defaults = {
    favorites: {
      icon: '✨',
      labelPlaceholder: 'Favori alanı',
      valuePlaceholder: 'İçerik',
    },
    futureItems: {
      icon: '🌟',
      labelPlaceholder: 'Hayal başlığı',
      valuePlaceholder: 'Hayal detayı',
    },
    importantDetails: {
      icon: '💗',
      labelPlaceholder: 'Bilgi başlığı',
      valuePlaceholder: 'Bilgi içeriği',
    },
    sensitiveItems: {
      icon: '🫧',
      labelPlaceholder: 'Başlık',
      valuePlaceholder: 'Detay',
    },
    wishItems: {
      icon: '💒',
      labelPlaceholder: 'İstek başlığı',
      valuePlaceholder: 'İstek içeriği',
    },
  }

  return defaults[sectionKey]
}

function getAddModalTitle(sectionKey) {
  const titles = {
    cities: 'Şehre Ekle',
    coupons: 'Kupon Ekle',
    dreams: 'Hayal Ekle',
    favorites: 'Favoriye Ekle',
    futureItems: 'Hayale Ekle',
    games: 'Oyuna Ekle',
    importantDetails: 'Detay Ekle',
    moments: 'Zaman Tüneline Ekle',
    movies: 'Filme/Diziye Ekle',
    places: 'Yere Ekle',
    sensitiveItems: 'Madde Ekle',
    songs: 'Şarkı Ekle',
    venues: 'Mekana Ekle',
    wishItems: 'İstek Ekle',
  }

  return titles[sectionKey]
}

function daysSince(date) {
  const oneDay = 1000 * 60 * 60 * 24
  return Math.max(1, Math.floor((Date.now() - date.getTime()) / oneDay))
}

function getSpecialDayStatus(item) {
  if (!item?.date) {
    return { label: '', value: '-' }
  }

  const today = startOfDay(new Date())
  const target = startOfDay(new Date(item.date))

  if (item.recurring === 'yearly') {
    const nextDate = new Date(
      today.getFullYear(),
      target.getMonth(),
      target.getDate(),
    )

    if (nextDate.getTime() === today.getTime()) {
      return { label: 'bugün', value: 'Bugün' }
    }

    if (nextDate < today) {
      nextDate.setFullYear(today.getFullYear() + 1)
    }

    const diffDays = Math.round((nextDate.getTime() - today.getTime()) / 86400000)
    return { label: 'gün kaldı', value: String(diffDays) }
  }

  const diffDays = Math.round((target.getTime() - today.getTime()) / 86400000)

  if (diffDays === 0) {
    return { label: 'bugün', value: 'Bugün' }
  }

  if (diffDays > 0) {
    return { label: 'gün kaldı', value: String(diffDays) }
  }

  return { label: 'gün geçti', value: String(Math.abs(diffDays)) }
}

function formatDateLabel(dateValue) {
  if (!dateValue) {
    return ''
  }

  const date = new Date(dateValue)
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
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

function BaseIcon({ children }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.9"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  )
}

function TodayIcon() {
  return (
    <BaseIcon>
      <path d="M7 3v3" />
      <path d="M17 3v3" />
      <rect height="15" rx="3" width="16" x="4" y="5" />
      <path d="M4 10h16" />
      <path d="m10 15 1.2 1.2L14.5 13" />
    </BaseIcon>
  )
}

function GalleryIcon() {
  return (
    <BaseIcon>
      <rect height="14" rx="3" width="17" x="3.5" y="5" />
      <circle cx="8" cy="10" fill="currentColor" r="1.2" stroke="none" />
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
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
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
    <svg aria-hidden="true" className="heart-inline" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21s-6.7-4.35-9.24-8.1C.76 9.94 2.1 5.7 5.95 4.7c2.1-.55 4.2.2 5.32 1.86C12.4 4.9 14.5 4.15 16.6 4.7c3.85 1 5.2 5.24 3.2 8.2C18.7 16.65 12 21 12 21Z" />
    </svg>
  )
}

function GiftIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M20 12v8H4v-8" />
      <path d="M2 7h20v5H2z" />
      <path d="M12 7v13" />
      <path d="M12 7H8.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7Z" />
      <path d="M12 7h3.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7Z" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <BaseIcon>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </BaseIcon>
  )
}

function EditIcon() {
  return (
    <BaseIcon>
      <path d="m4 20 4.5-1 9.3-9.3a1.9 1.9 0 0 0 0-2.7l-.8-.8a1.9 1.9 0 0 0-2.7 0L5 15.5 4 20Z" />
      <path d="M12.5 7.5 16.5 11.5" />
    </BaseIcon>
  )
}

function TrashIcon() {
  return (
    <BaseIcon>
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6.5 7 7.5 19a2 2 0 0 0 2 1.8h5a2 2 0 0 0 2-1.8L17.5 7" />
      <path d="M9 7V4.8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V7" />
    </BaseIcon>
  )
}

export default App
