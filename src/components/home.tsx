import { Link } from '@tanstack/react-router'

export type Lang = 'zh' | 'en'

type Localized = { zh: string; en: string }

type Product = {
  id: string
  name: Localized
  desc: Localized
  url: Localized
  logo: string
}

type IntroPart = { text: string; em: boolean }

const PRODUCTS: Product[] = [
  {
    id: 'kept',
    name: { zh: 'Kept', en: 'Kept' },
    desc: {
      zh: '录音、转写，并记下真正重要的内容。全部在你的 Mac 上完成，音频从不外传。',
      en: 'It records, transcribes, and writes down what matters. All on your Mac — the audio never leaves.',
    },
    url: { zh: 'https://keptmac.com/zh', en: 'https://keptmac.com/' },
    logo: '/kept.svg',
  },
]

const COPY: Record<Lang, { hero_intro_parts: IntroPart[]; section_work: string }> = {
  zh: {
    hero_intro_parts: [{ text: '你好，我是李小龙，独立开发。', em: false }],
    section_work: '正在做的',
  },
  en: {
    hero_intro_parts: [{ text: "Hello, I'm Xiaolong Li. I build software, solo.", em: false }],
    section_work: 'Currently building',
  },
}

export function HomePage({ lang }: { lang: Lang }) {
  return (
    <div className="relative z-10 mx-auto max-w-310 px-16 pt-14 pb-32 max-md:px-6 max-md:pt-9 max-md:pb-20">
      <Nav lang={lang} />
      <Hero lang={lang} />
      <ProductList products={PRODUCTS} lang={lang} />
    </div>
  )
}

function Nav({ lang }: { lang: Lang }) {
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
        <Link
          to={lang === 'zh' ? '/' : '/zh'}
          hrefLang={lang === 'zh' ? 'en' : 'zh-CN'}
          aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}
          className="rounded-full border border-line-2 bg-transparent px-2.5 py-1.25 font-mono text-xs tracking-[0.06em] text-ink-3 transition-colors hover:border-ink hover:text-ink"
        >
          {lang === 'zh' ? 'EN' : '中'}
        </Link>
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

function ProductList({ products, lang }: { products: Product[]; lang: Lang }) {
  const isEn = lang === 'en'
  return (
    <section>
      <div className="flex items-baseline justify-between border-b border-line pb-4.5">
        <h2
          className={
            isEn
              ? 'm-0 font-sans text-lg font-medium tracking-normal text-ink'
              : 'm-0 font-serif text-lg font-normal tracking-[0.02em] text-ink'
          }
        >
          {COPY[lang].section_work}
        </h2>
      </div>
      <ul className="m-0 list-none p-0">
        {products.map((p) => (
          <li key={p.id} className="border-b border-line">
            <ProductRow product={p} lang={lang} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function ProductRow({ product, lang }: { product: Product; lang: Lang }) {
  const isEn = lang === 'en'
  const url = product.url[lang]

  const hostname = (() => {
    try {
      return new URL(url).hostname.replace(/^www\./, '')
    } catch {
      return '→'
    }
  })()

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group -mx-5 flex items-start gap-7 rounded-xl px-5 py-8 text-inherit no-underline transition-colors duration-200 hover:bg-paper-elev max-md:-mx-3 max-md:flex-col max-md:gap-5 max-md:px-3 max-md:py-7"
    >
      <div className="flex min-w-0 flex-1 items-start gap-6 max-md:gap-4.5">
        <img
          src={product.logo}
          alt=""
          aria-hidden
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 transition-transform duration-200 group-hover:scale-[1.04] max-md:h-13 max-md:w-13"
        />
        <div className="min-w-0">
          <h3
            className={`m-0 mb-2.5 text-xl leading-tight text-ink [text-box-edge:cap_alphabetic] [text-box-trim:trim-start] ${
              isEn
                ? 'font-sans font-semibold tracking-[-0.01em]'
                : 'font-serif font-medium tracking-[0.005em]'
            }`}
          >
            {product.name[lang]}
          </h3>
          <p className="m-0 max-w-135 text-pretty text-[13.5px] leading-[1.7] text-ink-2">
            {product.desc[lang]}
          </p>
        </div>
      </div>

      <div className="-mt-[7px] flex shrink-0 items-center gap-4 max-md:mt-0 max-md:w-full max-md:justify-between max-md:pl-17.5">
        <span className="font-mono text-xs tracking-[0.04em] text-ink-3 transition-colors group-hover:text-ink">
          {hostname}
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
