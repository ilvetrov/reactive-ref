<p>
  <img src="https://raw.githubusercontent.com/ilvetrov/reactive-ref/main/logo.svg" width="298" height="70" />
</p>

React hooks for reactive work with refs.

## Why?

:question: Are you working with _legacy code_? This piece of the good old times sets a `ref` when it wants to?

:question: Does `setTimeout` brazenly live in your `useEffect` to check when the `ref` will finally not be `null`?

:question: Is a beautiful third party lib creating a new `div` right now, giving it the `ref`, and not notifying you?

**Use `reactive-ref`! This hell is over!**

## Usage

There are two hooks for you: [useReactiveRef](#usereactiveref) and [useRefCallback](#userefcallback).

### `useReactiveRef`

Rendering starts when `.current` changes with a new value (checked via `Object.is`).

```tsx
import { useReactiveRef } from 'reactive-ref'

const IHandleThirdPartyLibSadly = () => {
  // Types and usage are completely identical to useRef.
  // You can literally just add "Reactive" after "use" in your current code!
  const ref = useReactiveRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      // 😎 Now you have ref with div, no matter when it gets set
    }
    // We are adding ref.current here because it's now reactive
  }, [ref.current])

  return <HaHaIWillSetRefInASecond ref={ref}></HaHaIWillSetRefInASecond>
}
```

### `useRefCallback`

Callback is fired when `.current` changes with a new value (checked via `Object.is`).

```tsx
import { useRefCallback } from 'reactive-ref'

const IHandleThirdPartyLibSadlyAgain = () => {
  // The first argument is a callback.
  // The second argument is a initial value.
  const ref = useRefCallback<HTMLDivElement>((theSameRef) => {
    // 😎 I have access to the updated ref immediately without extra renders
  }, null)

  return <HaHaIWillChangeElementEverySecond ref={ref}></HaHaIWillChangeElementEverySecond>
}
```

## When not to use

- Don't use `useReactiveRef` to store state. You can, but this goes against React's immutability philosophy.

## My Links

- [GitHub](https://github.com/ilvetrov)
- [Telegram](https://t.me/ilvetrov)
- [contact@ilve.site](mailto:contact@ilve.site)
