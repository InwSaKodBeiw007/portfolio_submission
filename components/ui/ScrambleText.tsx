'use client'

import { useState, useEffect, useCallback } from 'react'

interface ScrambleTextProps {
  text: string
  className?: string
  autoStart?: boolean
  delay?: number
}

const characters = 'abcdefghijklmnopqrstuvwxyz'

export default function ScrambleText({ text, className, autoStart, delay = 0 }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)

  const scramble = useCallback(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iteration) {
              return text[index]
            }
            return characters[Math.floor(Math.random() * 26)]
          })
          .join('')
      )

      if (iteration >= text.length) {
        clearInterval(interval)
      }

      iteration += 1 / 3
    }, 30)

    return () => clearInterval(interval)
  }, [text])

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        scramble()
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [autoStart, delay, scramble])

  useEffect(() => {
    if (isHovering) {
      const cleanup = scramble()
      return cleanup
    }
  }, [isHovering, scramble])

  return (
    <span
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setDisplayText(text)
      }}
    >
      {displayText}
    </span>
  )
}
