import { withError } from "../../../src";

function FailComponent() {
  let y: any = null;
  console.log("x", y.x);

  return <div>This component will fail</div>;
}

export default withError(FailComponent);
