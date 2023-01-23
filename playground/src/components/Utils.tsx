import { LabelWithValue } from "../../../src";

import { numberUtils } from "../../../src";

function Utils() {
  return (
    <div>
      <LabelWithValue
        label="formatNumberWithCurrency"
        value={numberUtils.formatNumberWithCurrency(123.45, false, true)}
      />

      <LabelWithValue
        label="formatNumberWithCurrency (forcedInteger: true)"
        value={numberUtils.formatNumberWithCurrency(123.45, true, true)}
      />
    </div>
  );
}

export default Utils;
