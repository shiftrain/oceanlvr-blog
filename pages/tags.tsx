import { GetStaticProps } from 'next'
import { getAllFilesFrontMatter } from '@/lib/resource'
import Link from '@/components/Link'

type Props = {
  postsFrontMatter: Record<string, unknown>[]
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllFilesFrontMatter('_post')
  return {
    props: {
      postsFrontMatter: allPosts,
    }
  }
}

const Posts = ({ postsFrontMatter }: Props) => {
  const res: {
    tag: string,
    posts: string[]
  }[] = []
  postsFrontMatter.map(frontMatter => {
    // @ts-ignore
    frontMatter?.tag.map(tag => {
      const tagIdx = res.findIndex(e => e.tag === tag)
      if (tagIdx === -1) {
        res.push({
          tag,
          // @ts-ignore
          posts: [frontMatter.id],
        })
      } else {
        // @ts-ignore
        res[tagIdx].posts.push(frontMatter.id)
      }
    })
  })

  return (
    <div className="mt-24">
      <h1 className="text-center mb-8 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">Tags</h1>
      <div className="flex flex-row justify-center space-x-4">
        {
          res.map(el => (
            <Link className="blue-link text-2xl	font-medium	leading-6	" key={el.tag} href={`/tags/${el.tag}`}>
              {el.tag}
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Posts
