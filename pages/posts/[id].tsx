import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import matter from 'gray-matter'
import { getLocalPostSourceBySlug, getLocalPostSources } from '../../lib/posts'

type ContextParams = {
  id: string
}

interface Props {
  mdxSource: MDXRemoteSerializeResult
  frontMatter: Record<string, unknown>
}

export const getStaticProps: GetStaticProps<MDXRemoteSerializeResult, ContextParams> = async ({ params }) => {
  if (!params || !params.id) {
    return {
      notFound: true
    }
  }
  const source: string | null = getLocalPostSourceBySlug(params.id)
  if (!source) {
    return {
      notFound: true
    }
  }
  const { content, data } = matter(source)
  const mdxSource = await serialize(content, { scope: { data } })
  return { props: { mdxSource, compiledSource: source, frontMatter: data } }
}

export const getStaticPaths: GetStaticPaths<ContextParams> = async () => {
  const posts = getLocalPostSources()
  const paths = posts.map(post => ({
    params: { id: post },
  }))

  return {
    paths,
    fallback: false,
  };
}

const Posts = ({ mdxSource, frontMatter }: Props) => {
  const router = useRouter()
  const { id } = router.query
  return (
    <div className="wrapper">
      <div>slug: {id}</div>
      <div>frontMatter: {frontMatter.title}</div>
      <div>mdxSource:</div>
      <MDXRemote {...mdxSource} />
    </div>
  )
}

export default Posts
