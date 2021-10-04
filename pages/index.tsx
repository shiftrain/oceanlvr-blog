import { GetStaticProps } from 'next'
import ListLayout from '@/layouts/ListLayout'
import { getAllFilesFrontMatter } from '@/lib/resource'

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

const Home = ({ postsFrontMatter }: Props) => {
  return (
    <>
      <div >
        <ListLayout postsFrontMatter={postsFrontMatter} />
      </div>
    </>
  )
}

export default Home
