import Link from '@/components/Link'
type Props = {
  postsFrontMatter: Record<string, unknown>[]
}

export default function ListLayout({ postsFrontMatter }: Props) {
  return (
    <div>
      {postsFrontMatter.map(post => (
        <div className="mb-12" key={post.id as string}>
          <h2 className="text-2xl hover:underline font-medium leading-8 tracking-tight">
            {/* @ts-ignore */}
            <Link className="text-gray-900 dark:text-gray-100" href={post.id}>{post.title}</Link>
          </h2>
          <div className="leading-6 mb-2 text-sm font-medium text-blue-500 uppercase hover:text-blue-600 dark:hover:text-blue-400">
            {/* @ts-ignore */}
            [{post.tag?.join(',')}]
          </div>
          {/* @ts-ignore */}
          <div className="text-base leading-6 text-gray-500 dark:text-gray-400">{post.date}</div>
        </div>
      ))}
    </div>
  )
}

