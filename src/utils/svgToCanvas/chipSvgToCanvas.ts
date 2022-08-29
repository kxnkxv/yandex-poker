const chipSvgToCanvas = (source: string) => {
  let image = new Image()
  image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source)
  return image
}
export default chipSvgToCanvas
