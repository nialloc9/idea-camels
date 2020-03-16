

import React from 'react'
import universal, { setHasBabelPlugin } from '/Users/noconnor1/Desktop/niall/template-website/node_modules/react-universal-component/dist/index.js'

setHasBabelPlugin()

const universalOptions = {
  loading: () => null,
  error: props => {
    console.error(props.error);
    return <div>An error occurred loading this page's template. More information is available in the console.</div>;
  },
  ignoreBabelRename: true
}

const t_0 = universal(import('/Users/noconnor1/Desktop/niall/template-website/src/pages/404.js'), universalOptions)
      t_0.template = '/Users/noconnor1/Desktop/niall/template-website/src/pages/404.js'
      
const t_1 = universal(import('/Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon.js'), universalOptions)
      t_1.template = '/Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon.js'
      
const t_2 = universal(import('/Users/noconnor1/Desktop/niall/template-website/src/pages/index.js'), universalOptions)
      t_2.template = '/Users/noconnor1/Desktop/niall/template-website/src/pages/index.js'
      

// Template Map
export default {
  '/Users/noconnor1/Desktop/niall/template-website/src/pages/404.js': t_0,
'/Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon.js': t_1,
'/Users/noconnor1/Desktop/niall/template-website/src/pages/index.js': t_2
}
// Not Found Template
export const notFoundTemplate = "/Users/noconnor1/Desktop/niall/template-website/src/pages/404.js"

