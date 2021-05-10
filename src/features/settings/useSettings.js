const useSetting = () => {
  const isLoading = is

  const validTags = uniq(compact(tags.map((tag) => cleanTag(tag))))
  return upsertSetting("tag", validTags.join(","))
}
