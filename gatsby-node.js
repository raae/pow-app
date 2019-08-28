const fs = require("fs")
const MANIFEST_FILE_PATH = "public/manifest.webmanifest"

exports.onPostBootstrap = () => {
  const manifest = fs.readFileSync(MANIFEST_FILE_PATH, "utf8")
  const updatedManifest = manifest.replace(
    /icons\//g,
    "https://www.usepow.app/icons/"
  )
  console.log(updatedManifest)
  fs.writeFileSync(MANIFEST_FILE_PATH, manifest)
}
