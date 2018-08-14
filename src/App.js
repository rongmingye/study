import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import PageLogin from './page/PageLogin';
import PageCla from './page/PageCla';
import PageStudent from './page/PageStudent';
import PageAnlyse from './page/PageAnlyse';
import PageSetProject from './page/PageSetProject';


class App extends React.Component {

    render() {
        return (
            <div className="App">
                {/* router路由页面 */}
                <BrowserRouter >
                    <Switch>
                        <Route exact path='/' component={PageLogin} />
                        <Route path='/PageCla' component={PageCla} />
                        <Route path ='/pageStudent' component={PageStudent} />
                        <Route path ='/pageAnlyse' component={PageAnlyse} />
                        <Route path ='/pageSetProject' component={PageSetProject} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
