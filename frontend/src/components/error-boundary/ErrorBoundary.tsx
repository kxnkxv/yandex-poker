import React, { Component, FC, ReactNode } from 'react'
import { Props, State } from './types'

const DefaultFallback: FC<{ error: Nullable<Error>; reset?: () => void }> = ({ error, reset }) => {
  return (
    <div>
      <h1>Что то пошло не так</h1>
      {error?.stack && (
        <pre>
          {error?.message || null}
          {'\n\n'}
          {error?.stack}
        </pre>
      )}
      {reset && (
        <button type='button' onClick={reset}>
          Try again
        </button>
      )}
    </div>
  )
}
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      error: null,
    }
  }

  componentDidMount(): void {
    const { catchUnhandled = false } = this.props

    if (catchUnhandled) {
      window.addEventListener('unhandledrejection', this.onUnhandledRejection)
    }
  }

  componentWillUnmount(): void {
    const { catchUnhandled = false } = this.props

    if (catchUnhandled) {
      window.removeEventListener('unhandledrejection', this.onUnhandledRejection)
    }
  }

  onUnhandledRejection = (event: PromiseRejectionEvent): void => {
    event.stopPropagation()

    event.promise.catch((error) => this.setState(ErrorBoundary.getDerivedStateFromError(error)))
  }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  reset = (): void => {
    this.setState({ error: null })
  }

  render(): ReactNode {
    const { error } = this.state
    const { children, fallback: Fallback = DefaultFallback } = this.props

    return error ? <Fallback error={error} reset={this.reset} /> : children
  }
}
export default ErrorBoundary
