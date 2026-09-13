import { Reveal, Stagger, StaggerItem } from './Reveal'

const categories = [
  {
    name: 'Langages',
    tools: [
      { name: 'Python', slug: 'python' },
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'HTML5', slug: 'html5' },
      { name: 'CSS', slug: 'css' },
    ],
  },
  {
    name: 'Frameworks & outils',
    tools: [
      { name: 'React', slug: 'react' },
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'Tailwind CSS', slug: 'tailwindcss' },
      { name: 'Vite', slug: 'vite' },
      { name: 'Git', slug: 'git' },
      { name: 'Docker', slug: 'docker' },
    ],
  },
  {
    name: 'IA, Data & Automatisation',
    tools: [
      { name: 'n8n', slug: 'n8n' },
      { name: 'LangGraph', slug: 'langgraph' },
      { name: 'Claude', slug: 'claude' },
      { name: 'FFmpeg', slug: 'ffmpeg' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'PostgreSQL', slug: 'postgresql' },
    ],
  },
]

export default function ToolsSection() {
  return (
    <section className="bg-soft py-20">
      <div className="mx-auto max-w-site px-6">
        <Reveal>
          <p className="flex items-center justify-center gap-3 text-sm font-semibold text-ink">
            <span className="h-px w-8 bg-primary" />
            Mes Outils
          </p>

          <h2 className="mt-4 text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
            Mon <span className="font-medium text-primary italic">stack</span>{' '}
            technique
          </h2>
        </Reveal>

        <div className="mt-14 space-y-10">
          {categories.map((category) => (
            <Reveal key={category.name}>
              <h3 className="flex items-center gap-3 text-lg font-bold text-ink">
                <span className="h-4 w-1 rounded-full bg-primary" />
                {category.name}
              </h3>

              <Stagger
                stagger={0.05}
                className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
              >
                {category.tools.map((tool) => (
                  <StaggerItem
                    key={tool.name}
                    className="flex flex-col items-center rounded-card bg-white p-5"
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${tool.slug}`}
                      alt=""
                      loading="lazy"
                      className="size-9"
                    />
                    <p className="mt-3 text-center text-sm font-semibold text-ink">
                      {tool.name}
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
