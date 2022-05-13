export const RECIPE_PAGE = 'recipe'
export const TAG_PAGE = 'tag'

export const capitalise = (value: String) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export const path = (value: String) => {
  return value.replace(/ /g, '-')
}

export const tagPath = (tagName: String) => {
  return `${path(tagName)}-recipes`
}

export const tagFullPath = (tagName: String) => {
  return `/recipes/${tagPath(tagName)}`
}

export const tagNameFromPath = (path: String) => {
  return path
          .replace('-recipes', '')
          .replace(/-/g, ' ')
}
