// Imports
import plugin0 from '/usr/src/app/node_modules/react-static-plugin-reach-router/browser.api.js'

// Plugins
const plugins = [{
        location: "/usr/src/app/node_modules/react-static-plugin-source-filesystem",
        plugins: [],
        hooks: {}
      },
{
        location: "/usr/src/app/node_modules/react-static-plugin-reach-router",
        plugins: [],
        hooks: plugin0({})
      },
{
        location: "/usr/src/app/node_modules/react-static-plugin-sitemap/dist",
        plugins: [],
        hooks: {}
      },
{
        location: "/usr/src/app",
        plugins: [],
        hooks: {}
      }]

// Export em!
export default plugins