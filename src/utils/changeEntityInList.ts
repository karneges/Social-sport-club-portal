export const replaceEntity = (arr: { _id: string }[] = [], newEntity: { _id: string }) => {
  return arr.map(oldEntity => oldEntity?._id === newEntity?._id ? newEntity : oldEntity)
}

export const deleteEntity = (arr: { _id: string }[] = [], delEntity: { _id: string }) => {
  return arr.filter(entity => entity?._id !== delEntity?._id)
}



