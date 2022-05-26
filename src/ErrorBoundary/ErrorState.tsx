import { Message } from "../Message";

const ErrorState = () => (
  <Message.Error>
    <h2>An error has occurred</h2>
    <p className="lead">
      Our development team has been notified and will attempt to fix the issue ASAP.
    </p>
    <p>Please try refreshing the page to resolve the issue.</p>
  </Message.Error>
);

export default ErrorState;
