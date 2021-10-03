interface Props {
  frontMatter: Record<string, unknown>
  children: JSX.Element
  prev: {
    [key: string]: any;
    id: string;
  }
  next: {
    [key: string]: any;
    id: string;
  }
}
export default function PostLayout({ children, frontMatter, prev, next }: Props) {
  const { date, title, tags } = frontMatter

  return (
    <div>
      <div>{children}</div>
      {date &&
        <div>{{ date }}</div>
      }
      {
        title &&
        <div>{{ title }}</div>
      }
      {
        tags &&
        <div>{{ tags }}</div>
      }
    </div>
  )

}
