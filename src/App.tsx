import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import theme from '@/theme'
import Home from '@/pages/home'
import Login from '@/pages/login'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}
export default App
