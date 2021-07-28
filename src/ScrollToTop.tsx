import { Component } from "react";
import { withRouter } from "react-router-dom";
interface IProps {
  location: any;
}
interface IState {}

class ScrollToTop extends Component<IProps, IState> {
  componentDidUpdate(prevProps: IProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return this.props.children;
  }
}
// @ts-ignore
export default withRouter(ScrollToTop);
