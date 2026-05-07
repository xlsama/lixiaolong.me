import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef, useCallback } from 'react'
import type { MouseEvent as ReactMouseEvent, UIEvent as ReactUIEvent } from 'react'

export const Route = createFileRoute('/')({
  component: Home,
})

type Lang = 'zh' | 'en'
type ProductType = 'web' | 'wechat'

type Product = {
  id: string
  name: { zh: string; en: string }
  desc: { zh: string; en: string }
  type: ProductType
  url: string
  tag: { zh: string; en: string }
}

type IntroPart = { text: string; em: boolean }

const PRODUCTS: Product[] = [
  {
    id: 'media-studio',
    name: { zh: 'Media Studio', en: 'Media Studio' },
    desc: {
      zh: '保存你喜欢的视频与音频。一个安静的、属于你自己的内容收藏库。',
      en: 'Save the videos and audio you love. A quiet library that belongs to you.',
    },
    type: 'web',
    url: 'https://media-studio.lixiaolong.me/',
    tag: { zh: 'WEB · 在线', en: 'WEB · LIVE' },
  },
  {
    id: 'closet',
    name: { zh: '小衣橱呀', en: '小衣橱呀 · Closet' },
    desc: {
      zh: '你的私人穿搭助手。整理衣橱、记录搭配，每天少一点选择困难。',
      en: 'Your personal styling assistant. Organize your closet and outfits — less decision fatigue, every morning.',
    },
    type: 'wechat',
    url: '#wechat-qr',
    tag: { zh: '微信小程序', en: 'WECHAT MINI' },
  },
  {
    id: 'vellum',
    name: { zh: 'Vellum', en: 'Vellum' },
    desc: {
      zh: '一个简洁的本地 Markdown 写作工具。无缝实时预览，写作与阅读合二为一。',
      en: 'A minimal local Markdown editor. Seamless live preview — writing and reading become one.',
    },
    type: 'web',
    url: 'https://vellum.lixiaolong.me/',
    tag: { zh: '桌面应用', en: 'DESKTOP APP' },
  },
]

const COPY: Record<
  Lang,
  {
    hero_intro_parts: IntroPart[]
    section_work: string
    progress: (i: number, n: number) => string
    qr_title: string
    qr_sub: string
    qr_close: string
    page_title: string
  }
> = {
  zh: {
    hero_intro_parts: [{ text: '你好，我是李小龙，独立开发。', em: false }],
    section_work: '正在做的',
    progress: (i, n) => `${String(i).padStart(2, '0')} / ${String(n).padStart(2, '0')}`,
    qr_title: '小衣橱呀',
    qr_sub: '微信扫一扫体验小程序',
    qr_close: '关闭',
    page_title: '李小龙 — 独立开发者',
  },
  en: {
    hero_intro_parts: [{ text: "Hello, I'm Xiaolong Li. I build software, solo.", em: false }],
    section_work: 'Currently building',
    progress: (i, n) => `${String(i).padStart(2, '0')} / ${String(n).padStart(2, '0')}`,
    qr_title: '小衣橱呀 · Closet',
    qr_sub: 'Open with WeChat',
    qr_close: 'Close',
    page_title: 'Xiaolong Li — Independent Maker',
  },
}

function Home() {
  const [lang, setLang] = useState<Lang>('zh')
  const [qrOpen, setQrOpen] = useState(false)
  const [qrProduct, setQrProduct] = useState<Product | null>(null)

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    document.title = COPY[lang].page_title
  }, [lang])

  const openWechat = (product: Product) => {
    setQrProduct(product)
    setQrOpen(true)
  }

  return (
    <>
      <div className="relative z-10 mx-auto max-w-310 px-16 pt-14 pb-32 max-md:px-6 max-md:pt-9 max-md:pb-20">
        <Nav lang={lang} onToggleLang={() => setLang(lang === 'zh' ? 'en' : 'zh')} />
        <Hero lang={lang} />
        <Carousel products={PRODUCTS} lang={lang} onWechatClick={openWechat} />
      </div>
      <QRModal open={qrOpen} product={qrProduct} lang={lang} onClose={() => setQrOpen(false)} />
    </>
  )
}

function Nav({ lang, onToggleLang }: { lang: Lang; onToggleLang: () => void }) {
  return (
    <nav className="mb-35 flex items-center justify-between max-md:mb-20">
      <span className="w-px" />
      <div className="flex items-center gap-7">
        <a
          className="text-[13px] tracking-[0.02em] text-ink-2 transition-colors hover:text-ink"
          href="https://x.com/xlsama_"
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </a>
        <a
          className="text-[13px] tracking-[0.02em] text-ink-2 transition-colors hover:text-ink"
          href="https://github.com/xlsama"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <button
          className="rounded-full border border-line-2 bg-transparent px-2.5 py-1.25 font-mono text-xs tracking-[0.06em] text-ink-3 transition-colors hover:border-ink hover:text-ink"
          onClick={onToggleLang}
        >
          {lang === 'zh' ? 'EN' : '中'}
        </button>
      </div>
    </nav>
  )
}

function Hero({ lang }: { lang: Lang }) {
  const c = COPY[lang]
  const isEn = lang === 'en'
  return (
    <section className="mb-32.5 max-w-160 max-md:mb-20">
      <h1
        className={
          isEn
            ? 'm-0 mb-7 font-sans text-[44px] font-light leading-tight tracking-[-0.02em] text-ink max-md:text-[30px]'
            : 'm-0 mb-7 font-serif text-[44px] font-normal leading-tight tracking-[-0.005em] text-ink max-md:text-[30px]'
        }
      >
        <span className="font-medium">{isEn ? 'Xiaolong Li' : '李小龙'}</span>
      </h1>
      <p className="m-0 max-w-135 text-pretty text-base leading-[1.8] text-ink-2">
        {c.hero_intro_parts.map((part, i) =>
          part.em ? (
            <span key={i} className="font-medium text-ink">
              {part.text}
            </span>
          ) : (
            <span key={i}>{part.text}</span>
          ),
        )}
      </p>
    </section>
  )
}

function Carousel({
  products,
  lang,
  onWechatClick,
}: {
  products: Product[]
  lang: Lang
  onWechatClick: (p: Product) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [cardWidth, setCardWidth] = useState(360)

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    setMaxScroll(el.scrollWidth - el.clientWidth)
    const firstCard = el.querySelector<HTMLElement>('[data-card]')
    if (firstCard) {
      const styles = getComputedStyle(el)
      const gap = parseFloat(styles.columnGap || styles.gap || '20')
      setCardWidth(firstCard.getBoundingClientRect().width + gap)
    }
  }, [])

  useEffect(() => {
    measure()
    const t = setTimeout(measure, 200)
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', onResize)
    }
  }, [measure, products.length])

  const onScroll = (e: ReactUIEvent<HTMLDivElement>) => setPos(e.currentTarget.scrollLeft)
  const scrollByDir = (dir: number) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * cardWidth, behavior: 'smooth' })
  }
  const currentIdx = Math.min(products.length, Math.round(pos / cardWidth) + 1)
  const isEn = lang === 'en'

  const carBtn =
    'flex h-8 w-8 items-center justify-center rounded-full border border-line-2 transition-colors hover:border-ink hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line-2 disabled:hover:bg-transparent disabled:hover:text-current'

  return (
    <div className="relative">
      <div className="mb-9 flex items-baseline justify-between border-b border-line pb-4.5">
        <h2
          className={
            isEn
              ? 'm-0 font-sans text-lg font-medium tracking-normal text-ink'
              : 'm-0 font-serif text-lg font-normal tracking-[0.02em] text-ink'
          }
        >
          {COPY[lang].section_work}
        </h2>
        <div className="flex items-center gap-4">
          <span className="mr-2 font-mono text-[11px] tracking-[0.08em] text-ink-3">
            {COPY[lang].progress(currentIdx, products.length)}
          </span>
          <div className="flex items-center gap-2">
            <button
              className={carBtn}
              onClick={() => scrollByDir(-1)}
              disabled={pos <= 1}
              aria-label="Previous"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              className={carBtn}
              onClick={() => scrollByDir(1)}
              disabled={pos >= maxScroll - 1}
              aria-label="Next"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3 w-3"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        ref={ref}
        onScroll={onScroll}
        className="scrollbar-hide -mr-16 flex snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-visible pt-2 pr-16 pb-10 max-md:-mr-6 max-md:pr-6"
      >
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} lang={lang} index={i} onWechatClick={onWechatClick} />
        ))}
      </div>
    </div>
  )
}

function ProductCard({
  product,
  lang,
  index,
  onWechatClick,
}: {
  product: Product
  lang: Lang
  index: number
  onWechatClick: (p: Product) => void
}) {
  const isWechat = product.type === 'wechat'
  const isEn = lang === 'en'
  const handleClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (isWechat) {
      e.preventDefault()
      onWechatClick(product)
    }
  }

  const hostname = (() => {
    try {
      return new URL(product.url).hostname.replace(/^www\./, '')
    } catch {
      return '→'
    }
  })()

  const dividerClass = index > 0 ? 'border-l border-line pl-7' : ''

  return (
    <a
      data-card
      href={product.url}
      onClick={handleClick}
      target={isWechat ? undefined : '_blank'}
      rel="noopener noreferrer"
      className={`group relative flex min-h-50 w-90 flex-none cursor-pointer snap-start flex-col gap-4.5 py-7 pr-6 text-inherit no-underline transition-transform duration-200 hover:-translate-y-px max-md:w-70 ${dividerClass}`}
    >
      <span className="absolute right-6 top-7 font-mono text-[11px] tracking-[0.12em] text-ink-3">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex items-center justify-start">
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-3">
          <span
            className={`h-1.5 w-1.5 rounded-full ${isWechat ? 'bg-[#07c160]' : 'bg-[#4ea36b]'}`}
          />
          <span>{product.tag[lang]}</span>
        </div>
      </div>
      <div className="flex-1">
        <h3
          className={
            isEn
              ? 'm-0 mb-2 font-sans text-2xl font-semibold tracking-[-0.01em] text-ink'
              : 'm-0 mb-2 font-serif text-2xl font-medium tracking-[0.005em] text-ink'
          }
        >
          {product.name[lang]}
        </h3>
        <p className="m-0 text-pretty text-[13.5px] leading-[1.7] text-ink-2">
          {product.desc[lang]}
        </p>
      </div>
      <div className="flex items-center justify-between pt-2">
        <span className="font-mono text-xs tracking-[0.04em] text-ink-3 transition-colors group-hover:text-ink">
          {isWechat ? (lang === 'zh' ? '扫码进入 →' : 'Scan to open →') : hostname}
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line transition-all duration-200 group-hover:-rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </a>
  )
}

function QRModal({
  open,
  product,
  lang,
  onClose,
}: {
  open: boolean
  product: Product | null
  lang: Lang
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className={`fixed inset-0 z-100 flex items-center justify-center bg-black/45 backdrop-blur-md transition-opacity duration-200 ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        className={`w-80 rounded-[18px] bg-paper-elev px-9 pb-7.5 pt-9 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.3)] transition-transform duration-200 ${
          open ? 'translate-y-0' : 'translate-y-2'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="m-0 mb-1.5 font-serif text-[17px] font-medium">
          {product ? product.name[lang] : COPY[lang].qr_title}
        </h4>
        <div className="mb-5.5 font-mono text-xs tracking-[0.06em] text-ink-3">
          {COPY[lang].qr_sub}
        </div>
        <div className="mx-auto mb-6 flex h-50 w-50 items-center justify-center rounded-lg border border-line bg-white p-3">
          <PlaceholderQR />
        </div>
        <button
          className="rounded-full border border-line-2 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          onClick={onClose}
        >
          {COPY[lang].qr_close}
        </button>
      </div>
    </div>
  )
}

function PlaceholderQR() {
  const size = 25
  const cells: [number, number][] = []
  let seed = 42
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const inFinder = (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7)
      if (inFinder) {
        const fx = x < 7 ? x : x >= size - 7 ? x - (size - 7) : 0
        const fy = y < 7 ? y : y >= size - 7 ? y - (size - 7) : 0
        const isFinderCell =
          fx === 0 || fx === 6 || fy === 0 || fy === 6 || (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4)
        if (isFinderCell) cells.push([x, y])
        continue
      }
      if (rand() > 0.55) cells.push([x, y])
    }
  }
  return (
    <svg viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges" className="h-full w-full">
      {cells.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="1" height="1" fill="#1a1a1a" />
      ))}
    </svg>
  )
}
