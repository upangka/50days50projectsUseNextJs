> 案例非常简单，主要是进行优化

1. 使用 `useCallback` 优化 `handleFilter` 的计算
2. 使用 `useMemo` 优化 `filteredUsers` 的计算
3. memo抽离组件,方法属性以及计算值属性
4. useEffect优化,抽离成hooks
