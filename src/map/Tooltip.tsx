// @ts-ignore
import MouseTooltip from 'react-sticky-mouse-tooltip';
import { Card } from './../Card';

function Tooltip(props: { tooltipContent: any; offsetX?: number; offsetY?: number }) {
  let { tooltipContent, offsetX, offsetY } = props;
  function render() {
    return (
      <MouseTooltip visible={!!tooltipContent} offsetX={offsetX ?? 15} offsetY={offsetY ?? 10}>
        <Card padding="p-0">{tooltipContent}</Card>
      </MouseTooltip>
    );
  }
  return render();
}
export default Tooltip;
