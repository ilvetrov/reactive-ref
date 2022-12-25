import { MutableRefObject, RefObject } from 'react'
import { useRefCallback } from './useRefCallback'
import useForceRender from './utils/useForceRender'

export function useReactiveRef<T>(initialValue: T): MutableRefObject<T>

export function useReactiveRef<T>(initialValue: T | null): RefObject<T>

export function useReactiveRef<T = undefined>(): MutableRefObject<T | undefined>

/**
 * Rendering starts when .current changes with a new value (checked via Object.is)
 */
export function useReactiveRef<T>(initialValue?: T | null): MutableRefObject<T | null | undefined> {
  const forceRender = useForceRender()

  const ref = useRefCallback(forceRender, initialValue)

  return ref
}
