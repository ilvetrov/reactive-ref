import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React, { useEffect, useLayoutEffect } from 'react'
import { useRefCallback } from './useRefCallback'

describe('useRefCallback', () => {
  it('callback fired', () => {
    let callbackFired = false

    const Component = () => {
      const ref = useRefCallback<HTMLDivElement>(() => (callbackFired = true), null)

      return <div ref={ref}></div>
    }

    render(<Component></Component>)

    expect(callbackFired).toBe(true)
  })

  it('callback fired only once', () => {
    let numberOfCallbackRuns = 0

    const Component = () => {
      const ref = useRefCallback<HTMLDivElement>(() => (numberOfCallbackRuns += 1), null)

      return <div ref={ref}></div>
    }

    render(<Component></Component>)

    expect(numberOfCallbackRuns).toBe(1)
  })

  it('callback fired before effects when ref is added to an element', () => {
    const log: ('callback' | 'layoutEffect' | 'effect')[] = []

    const Component = () => {
      const ref = useRefCallback<HTMLDivElement>(() => log.push('callback'), null)

      useLayoutEffect(() => {
        log.push('layoutEffect')
      }, [])

      useEffect(() => {
        log.push('effect')
      }, [])

      return <div ref={ref}></div>
    }

    render(<Component></Component>)

    expect(log).toEqual(['callback', 'layoutEffect', 'effect'] as typeof log)
  })

  it('a ref in the callback equals to the ref from hook', () => {
    let result = false

    const Component = () => {
      const ref = useRefCallback<HTMLDivElement>((newRef) => (result = newRef === ref), null)

      return <div ref={ref}></div>
    }

    render(<Component></Component>)

    expect(result).toBe(true)
  })

  it('a content of a ref in the callback equals to a content of the ref from hook', () => {
    let refContentFromCallback: any
    let refContentFromHook: any

    const Component = () => {
      const ref = useRefCallback<HTMLDivElement>((newRef) => (refContentFromCallback = newRef.current), null)

      useEffect(() => {
        refContentFromHook = ref.current
      })

      return <div ref={ref}></div>
    }

    render(<Component></Component>)

    expect(refContentFromCallback === refContentFromHook).toBe(true)
  })
})
