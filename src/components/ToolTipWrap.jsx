import React from 'react';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';

export default function ToolTipWrap({ tooltip, children }) {
  return (
    <Tooltip
      placement="bottom"
      overlay={tooltip}
      mouseEnterDelay={0}
      mouseLeaveDelay={0.1}
      transitionName="rc-tooltip-zoom"
      arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
    >
      {children}
    </Tooltip>
  );
}
