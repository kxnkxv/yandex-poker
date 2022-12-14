import { isServer } from 'utils/is-server/isServer'

const svgToCanvas = (source: string) => {
  if (isServer) return ''
  const image = new Image()
  image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)
  return image
}
export default svgToCanvas
