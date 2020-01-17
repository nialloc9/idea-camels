import React from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
import { Router } from 'components/Router'
import Navigation from 'components/Navigation'
import {ThemeProvider} from "utils/style"
import {theme} from "config"

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

function App() {
  return (
    <ThemeProvider theme={theme}>
          <Root>
      <Navigation />
        <div className="content">
          <React.Suspense fallback={<em>Loading...</em>}>
            <Router>
              <Routes path="*" />
            </Router>
          </React.Suspense>
        </div>
      
    </Root>
      </ThemeProvider>
    
  )
}

export default App
