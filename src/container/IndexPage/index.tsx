/**
 *
 * IndexPage
 *
 */

import React from 'react';
import '@/assets/index.scss';

interface IndexPageState {
    data: Number
}

class IndexPage extends React.Component<any,IndexPageState> {

    constructor(props) {
        super(props);
        this.state = {
            data: 444
        };
    }
    render() {
        let { data } = this.state;
        return (
            <div className="Index-page">
                <div>{data}</div>
            </div>
        );
    }
}


export default IndexPage;
