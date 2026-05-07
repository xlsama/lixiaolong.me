import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

const links = [
  { label: "GitHub", href: "https://github.com/xlsama" },
  { label: "X", href: "https://x.com/" },
  { label: "Email", href: "mailto:apple.xlsama@gmail.com" },
];

function Home() {
  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col justify-center px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Li Xiaolong</h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Software engineer. Building things on the web.
      </p>
      <ul className="mt-10 flex flex-wrap gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-md border border-neutral-200 px-3 py-1.5 text-sm transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
