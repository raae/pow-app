exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path === "/timeline/") {
    page.matchPath = "/timeline/*"
    createPage(page)
  } else if (page.path === "/profile/") {
    page.matchPath = "/profile/*"
    createPage(page)
  }
}
