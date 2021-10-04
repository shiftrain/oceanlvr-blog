import { GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { getSourceBySlug, getAllFilesFrontMatter } from '@/lib/resource'
import Image from 'next/image'
import CustomLink from '@/components/Link'
import PostLayout from '@/layouts/PostLayout'

type ContextParams = {}

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

const MDXComponents = {
  Image,
  a: CustomLink,
}

export const getStaticProps: GetStaticProps<MDXRemoteSerializeResult, ContextParams> = async () => {
  const allPosts = await getAllFilesFrontMatter('_post')
  const postIndex = 0
  const prev = postIndex + 1 <= allPosts.length - 1 ? allPosts[postIndex + 1] : null
  const next = postIndex - 1 >= 0 ? allPosts[postIndex - 1] : null
  const post = await getSourceBySlug('_post', allPosts[postIndex].id)
  return {
    props: {
      post,
      prev,
      next,
      compiledSource: post.mdxSource.compiledSource
    }
  }
}

const Posts = ({ post, prev, next }: Props) => {
  const { frontMatter, mdxSource } = post
  return (
    <div className="wrapper">
      <div>prev - {prev?.id}</div>
      <div>next - {next?.id}</div>
      <div>mdxSource:</div>
      <PostLayout frontMatter={frontMatter} prev={prev} next={next}>
        <MDXRemote {...mdxSource} components={MDXComponents} />
      </PostLayout>
    </div>
  )
}

export default Posts
