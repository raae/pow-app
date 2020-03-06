exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path === "/cycle/") {
    page.matchPath = "/cycle/*"
    createPage(page)
  }
}
