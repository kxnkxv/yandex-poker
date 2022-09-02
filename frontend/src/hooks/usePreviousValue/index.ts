import { useEffect, useRef } from 'react'

export const usePreviousValue = (value: any): any => {
  const ref = useRef(null)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
