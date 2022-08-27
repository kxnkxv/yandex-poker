function importAll(r: __WebpackModuleApi.RequireContext) {
  let images: Record<string, string> = {}

  r.keys().map((item: string) => {
    console.log('item', item, r(item))

    images[item.replace('./', '').replace('.svg', '')] = r(item)
  })
  return images
}

const importedImages = importAll(require.context('./', false, /\.(svg)$/))

export const Cards = (key: string) => {
  //Инвертируем, значение карты, поскольку в качестве таких значений
  //бывают следующие: 9h , 5c
  //мы не можем использовать такие значения в кач-ве ключей поскульку первый символ - цифра
  return importedImages[key.split('').reverse().join('')]
}
