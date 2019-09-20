const fs = require("fs")
const MANIFEST_FILE_PATH = "public/manifest.webmanifest"
const MANIFEST_JSON_FILE_PATH = "public/manifest.json"

exports.onPostBootstrap = () => {
  const manifest = fs.readFileSync(MANIFEST_FILE_PATH, "utf8")
  const updatedManifest = manifest.replace(
    /icons\//g,
    "https://www.usepow.app/icons/"
  )
  fs.writeFileSync(MANIFEST_FILE_PATH, updatedManifest)
  fs.writeFileSync(MANIFEST_JSON_FILE_PATH, updatedManifest)
}
