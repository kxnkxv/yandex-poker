declare module '*.png'

declare module '*.svg' {
  const content: any
  export default content
}

declare type Nullable<T> = T | null
