type IOptions = {
  page?: number
  limit?: number
}
export const calculatingPagination = (options: IOptions) => {
  const page = Number(options.page || 1)
  const limit = Number(options.limit || 10)

  const skip = (page - 1) * limit

  return {
    page,
    limit,
    skip,
  }
}
