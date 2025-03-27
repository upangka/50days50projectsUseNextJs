/**
 * 抽离获取数据的api
 */

import { useState, useEffect } from 'react'

export function useData<T>(url: string, defaultData: T) {
  const [data, setData] = useState<T>(defaultData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true // 防止组件卸载时更新状态

    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch(url)

        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`)
        }

        const jsonData = await res.json()
        if (isMounted) {
          setData(jsonData.results)
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false // 清理函数，防止内存泄漏
    }
  }, [url])

  return { data, setData, loading, error }
}
