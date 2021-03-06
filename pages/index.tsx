import { useForm } from 'react-hook-form'
import { useTheme } from 'next-themes'
import { useAtom } from 'jotai'
import { sanitize } from 'isomorphic-dompurify'

import { colorAtom, countAtom } from 'src/lib/store'
const colors = [
  'blue',
  'green',
  'yellow',
  'red',
  'pink',
  'purple',
  'orange',
  'black',
  'white',
  'grey',
  'gray'
]

type SubmittedData = { color: string }

const HomePage = () => {
  const { theme, setTheme } = useTheme()

  const [count, setCount] = useAtom(countAtom)
  const [color, setColor] = useAtom(colorAtom)

  const { register, handleSubmit, reset } = useForm<SubmittedData>()
  const onSubmit = ({ color }: SubmittedData) => {
    if (color) {
      setColor(sanitize(color))
    }

    reset()
  }

  return (
    <div className="flex flex-col items-center justify-evenly w-full h-full space-y-12">
      <div className="spacer" />
      <div className="flex flex-col">
        <div className="flex items-center">
          <a
            href="https://github.com/dayvista/next-lite"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            next-lite
          </a>
          <p className="text-2xl pointer-events-none">🥬</p>
        </div>
        <h2 className="text-xl font-bold">
          The Minimalist
          <br />
          (Yet Opinionated)
          <br />
          Next.js Starter Template
        </h2>
      </div>
      <div className="flex flex-col space-y-4">
        <button
          className="px-2 py-1 border border-solid rounded-md"
          onClick={() => {
            setTheme(theme === 'dark' ? 'light' : 'dark')
            setCount(count + 1)
          }}
        >
          Change to {theme === 'dark' ? 'light' : 'dark'} mode
        </button>
        <p>Theme has been changed {count} times</p>
        <hr />
        <p style={{ color: color ? color : 'initial' }}>
          {color != null && colors.includes(color)
            ? `${
                color.charAt(0).toUpperCase() + color.substring(1)
              } is a great color!`
            : `What is your favorite color?`}
        </p>
        <form
          className="flex flex-col space-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="color">Submit your fav color here:</label>
          <input
            {...register('color', { maxLength: 16 })}
            className="mx-1 border border-solid rounded-md"
          />
          <button
            type="submit"
            className="self-end p-1 border border-solid rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="spacer" />
      <p className="pb-6">
        Made by{' '}
        <a
          href="https://github.com/dayvista"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-base"
        >
          Liam Davis
        </a>
      </p>
    </div>
  )
}

export default HomePage
