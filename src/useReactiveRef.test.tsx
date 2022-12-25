import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React, { useEffect } from 'react'
import { useReactiveRef } from './useReactiveRef'

describe('useReactiveRef', () => {
  it('shows 2 renders', () => {
    let numberOfRenders = 0

    const Component = () => {
      const ref = useReactiveRef<HTMLDivElement>(null)

      numberOfRenders += 1

      return <div ref={ref}></div>
    }

    render(<Component></Component>)

    expect(numberOfRenders).toBe(2)
  })

  it('an effect run twice if the ref is in a deps of the effect', () => {
    let numberOfEffectRuns = 0

    const Component = () => {
      const ref = useReactiveRef<HTMLDivElement>(null)

      useEffect(() => {
        numberOfEffectRuns += 1
      }, [ref.current])

      return <div ref={ref}></div>
    }

    render(<Component></Component>)

    expect(numberOfEffectRuns).toBe(2)
  })
})
