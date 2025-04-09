/**
 * 判断是否为外部资源
 */
export function isExternal(path: any) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
