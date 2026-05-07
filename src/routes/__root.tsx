/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    links: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const lang = pathname.startsWith('/zh') ? 'zh-CN' : 'en'
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body className="bg-paper text-ink font-sans antialiased min-h-screen overflow-x-hidden text-[15px] leading-[1.65] tracking-[0.005em]">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
