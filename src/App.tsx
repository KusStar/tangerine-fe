import * as React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import { ThemeProvider, CssBaseline, Button } from "@material-ui/core";
import theme from '@/theme';
import Home from '@/pages/home';
import Login from '@/pages/login';

const App: React.FC = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Button />
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
          </Switch>
        </Router>
    </ThemeProvider>
)

export default App;