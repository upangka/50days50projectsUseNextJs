export interface SearchParams {
  searchParams: Promise<{
    [key: string]: string
  }>
}

// export type Pretty<T> = {
//   [P in keyof T]: T[P]
// }

// TODO 总结
export type Pretty<T> = T extends infer U ? { [K in keyof U]: U[K] } : never
