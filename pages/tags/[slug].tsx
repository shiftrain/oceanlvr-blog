import { useRouter } from 'next/router'


const Tags = ({ }) => {
  const router = useRouter()
  const { slug } = router.query
  return (
    <div className="wrapper">
      <div>slug: {slug}</div>
    </div>
  )
}
export default Tags
