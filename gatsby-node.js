exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path === "/day/") {
    page.matchPath = "/day/*"
    createPage(page)
  }
}
