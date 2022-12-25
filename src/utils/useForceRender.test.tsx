import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import React, { useEffect } from 'react'
import useForceRender from './useForceRender'

describe('useForceRender', () => {
  it('shows 2 renders', () => {
    let numberOfRenders = 0

    const Component = () => {
      const forceRender = useForceRender()

      numberOfRenders += 1

      useEffect(() => {
        forceRender()
      }, [])

      return <div></div>
    }

    render(<Component></Component>)

    expect(numberOfRenders).toBe(2)
  })
})
