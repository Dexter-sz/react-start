import React from 'react'


export const asyncComponent = loadComponent => (
    class AsyncComponent extends React.Component {

        constructor(props: any) {
            super(props);
            this.state = {
                Component: null,
            };
        }

        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }

            loadComponent()
                .then(module => module.default)
                .then((Component) => {
                    this.setState({ Component });
                }).then(undefined, (error) => {
                    console.error(error);
                }).catch((err) => {
                    console.error(`Cannot load component in <AsyncComponent />`);
                    throw err;
                });
        }

        hasLoadedComponent() {
            return (this.state as any).Component !== null;
        }

        render() {
            const Component = (this.state as any).Component;
            return (Component) ? <Component {...this.props} /> : null;
        }
    }
);