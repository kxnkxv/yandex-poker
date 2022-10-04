import { ReactNode } from 'react'
import ErrorBoundary from './ErrorBoundary'

export type State = {
  error: Nullable<Error>
}
export type Props = {
  fallback?: React.FC<{ error: State['error']; reset: ErrorBoundary['reset'] }>
  catchUnhandled?: boolean
  children?: ReactNode
}
