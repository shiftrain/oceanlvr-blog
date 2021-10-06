import Link from '@/components/Link'
type Props = {
  postsFrontMatter: Record<string, unknown>[]
}

export default function ListLayout({ postsFrontMatter }: Props) {
  return (
    <div>
      {postsFrontMatter.map(post => (
        <div className="mb-12" key={(post.id as string).toString() as string}>
          <h2 className="text-2xl hover:underline font-medium leading-8 tracking-tight">
            {/* @ts-ignore */}
            <Link key={post.title} className="text-gray-900 dark:text-gray-100" href={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          <div>
            {/* @ts-ignore */}
            {post.tag?.map((e, idx) => (
              <>
                <Link href={`/tags/${e}`} key={`${post.id as string}-${e}`} className="leading-6 mb-2 text-base font-medium text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">{e}</Link>
                {/* @ts-ignore */}
                {idx !== post.tag?.length - 1 && <span className="pr-2">,</span>}
              </>
            ))}
          </div>
          {/* @ts-ignore */}
          <div key={post.title} className="text-base leading-6 text-gray-500 dark:text-gray-400">{post.date}</div>
        </div>
      ))}
    </div>
  )
}

