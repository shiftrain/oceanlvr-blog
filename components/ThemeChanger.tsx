import { useTheme } from 'next-themes'

const ThemeChanger = () => {
  const { setTheme, theme, resolvedTheme } = useTheme()
  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="w-8 h-8 p-1 ml-1 mr-1 rounded sm:ml-4"
      onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {(theme === 'dark' || resolvedTheme === 'dark') ? (
        <button onClick={() => setTheme('light')}>Light</button>
      ) : (
        <button onClick={() => setTheme('dark')}>Dark</button>
      )}
    </button>
  )
}
export default ThemeChanger;