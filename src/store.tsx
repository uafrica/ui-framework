import React, { createContext, useContext } from "react";
// @ts-ignore
const StoreContext = createContext();

// Properties stored in store
// provider_settings
// roles
// user_settings
// logged_in_user
// impersonated_username
// account
// emitter
// To implement store from library, the entire project that uses the store component
// has to be converted. I will not work here and there. It's all or nothing

// NOTE: If you want to use this store configuration in your project, do not have the same setup in you local repo.
// I.e. if you want to use the StoreContext declared, you have to use one of them, not both

const createStore = (WrappedComponent: any) => {
  return class extends React.Component<any, any> {
    state: any = {
      get: (key: any) => {
        return this.state[key];
      },
      set: (key: any, value: any, callback?: any) => {
        const state: any = this.state;
        state[key] = value;
        if (typeof callback === "function") {
          callback();
        }
        this.setState(state);
      },
      remove: (key: any) => {
        const state: any = this.state;
        delete state[key];
        this.setState(state);
      }
    };
    render() {
      return (
        <StoreContext.Provider value={this.state}>
          <WrappedComponent {...this.props} />
        </StoreContext.Provider>
      );
    }
  };
};
const withStore = (WrappedComponent: any) => {
  return class extends React.Component<any, any> {
    render() {
      return (
        <StoreContext.Consumer>
          {context => <WrappedComponent store={context} {...this.props} />}
        </StoreContext.Consumer>
      );
    }
  };
};

const useStore: any = () => useContext(StoreContext);

export { createStore, withStore, useStore };