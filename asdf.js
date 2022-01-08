const { exec } = require("child_process")
const fs = require("fs")

const dirName = "public/icons/"

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function toCamel(str) {
  return str
    .split("_")
    .map((it) => capitalizeFirstLetter(it))
    .join("")
}

fs.readdirSync(dirName).map((it) => {
  const compName = "Svg" + toCamel(it.split(".")[0]) + ".tsx"
  console.log(compName)

  exec(
    `npx @svgr/cli --typescript --no-dimensions -- public/icons/${it} > lib/components/Icons/${compName}`,
    (error, stdout, stderr) => {},
  )
})
