import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { getSourceBySlug, getSources, getAllFilesFrontMatter } from '../../lib/posts'
import Heading from '../../components/Heading'
import { formatSlug } from '../../lib/mdx'

type ContextParams = {
  id: string[]
}

interface Post {
  mdxSource: MDXRemoteSerializeResult
  frontMatter: Record<string, unknown>
}

interface Props {
  post: Post
  prev: {
    [key: string]: any;
    id: string;
  }
  next: {
    [key: string]: any;
    id: string;
  }
}

const components = { ...Heading }

export const getStaticProps: GetStaticProps<MDXRemoteSerializeResult, ContextParams> = async ({ params }) => {
  const allPosts = await getAllFilesFrontMatter('_post')
  if (!params) {
    return {
      notFound: true
    }
  }
  const postIndex = allPosts.findIndex((post) => formatSlug(post.id) === params.id.join('/'))

  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const post = await getSourceBySlug('_post', params.id.join('/'))
  return {
    props: {
      post,
      prev,
      next,
      compiledSource: post.mdxSource.compiledSource
    }
  }
}

export const getStaticPaths: GetStaticPaths<ContextParams> = async () => {
  const posts = getSources('_post')
  const paths = posts.map(post => ({
    params: { id: formatSlug(post).split('/') },
  }))
  return {
    paths,
    fallback: false,
  };
}

const Posts = ({ post, prev, next }: Props) => {
  const { frontMatter, mdxSource } = post
  const router = useRouter()
  const { id } = router.query
  return (
    <div className="wrapper">
      <div>slug: {Array.isArray(id) ? id.join('/') : id}</div>
      <div> frontMatter: {frontMatter.title}</div>
      <div>prev - {prev?.id}</div>
      <div>next - {next?.id}</div>
      <div>mdxSource:</div>
      <MDXRemote {...mdxSource} components={components} />
    </div>
  )
}

export default Posts

