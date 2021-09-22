import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useRouter } from 'next/router'


const Tags = ({  }) => {
  const router = useRouter()
  const { id } = router.query
  return (
    <div className="wrapper">
      <div>slug: {id}</div>
    </div>
  )
}
export default Tags