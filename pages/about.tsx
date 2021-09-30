import { GetStaticProps } from 'next'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { getStaticPage } from '@/lib/resource';
import { MDXRemote } from 'next-mdx-remote'

type Props = {
  about: {
    mdxSource: MDXRemoteSerializeResult
    frontMatter: Record<string, unknown>
  }
}

type ContextParams = {}

export const getStaticProps: GetStaticProps<MDXRemoteSerializeResult, ContextParams> = async () => {
  const about = await getStaticPage('about')
  return {
    props: {
      about,
      compiledSource: about.mdxSource.compiledSource
    }
  }
}


function About({ about }: Props) {
  const { frontMatter, mdxSource } = about
  return <MDXRemote {...mdxSource} />

}

export default About