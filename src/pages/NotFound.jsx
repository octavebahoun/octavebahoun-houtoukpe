import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-site px-6 py-24 text-center">
      <p className="text-[110px] leading-none font-extrabold tracking-tight sm:text-[170px]">
        4<span className="text-primary">0</span>4
      </p>

      <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Oups !{' '}
        <span className="font-medium text-primary italic">Page introuvable</span>
      </h1>

      <p className="mx-auto mt-4 max-w-md">
        La page que vous cherchez n&apos;existe pas ou a été déplacée.
      </p>

      <Link
        to="/"
        className="mt-8 inline-block rounded-full bg-primary px-8 py-3.5 font-semibold text-white transition-colors hover:bg-primary-hover"
      >
        Retour à l&apos;accueil
      </Link>
    </section>
  )
}
