export const dataConversion = (data: any[]): any => {
  return data.reduce((prev: any, cur: any) => {
    if (!cur.Categories[0]) {
      if (!prev['Suggestion']) {
        prev['Suggestion'] = []
      }
      prev[`Suggestion`].push(cur)
      return prev
    }
    if (!prev[cur.Categories[0].CategoryName]) {
      prev[cur.Categories[0].CategoryName] = []
    }
    prev[cur.Categories[0].CategoryName].push(cur)
    return prev
  }, {})
}