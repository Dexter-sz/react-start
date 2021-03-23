import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import RouteConfig from '@/router';

import '@/assets/app.scss';

class App extends React.Component {
    render() {
        return (
            <>  
                <RouteConfig />
            </>
        )
    }
}

ReactDOM.render((
    <Router >
        <App />
    </Router>
), document.getElementById('app'));