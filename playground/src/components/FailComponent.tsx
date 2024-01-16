import { withError } from "ui-framework-v2";

function FailComponent() {
  let y: any = null;
  console.log("x", y.x);

  return <div>This component will fail</div>;
}

export default withError(FailComponent);
