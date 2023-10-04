import React from 'react';
import { NavLink } from 'react-router-dom';
import ToolTipWrap from './ToolTipWrap';

export default function MenuIconLi({
  tooltip = '',
  to = '',
  clickCallback = null,
  children,
}) {
  if (clickCallback != null)
    return (
      <li className="menu-icon-li">
        {tooltip.trim().length < 1 ? (
          <span className="pointer" onClick={clickCallback}>
            {children}
          </span>
        ) : (
          <ToolTipWrap tooltip={tooltip}>
            <span className="pointer" onClick={clickCallback}>
              {children}
            </span>
          </ToolTipWrap>
        )}
      </li>
    );
  return (
    <li className="menu-icon-li">
      {tooltip.trim().length < 1 ? (
        <NavLink to={to}>{children}</NavLink>
      ) : (
        <ToolTipWrap tooltip={tooltip}>
          <NavLink to={to}>{children}</NavLink>
        </ToolTipWrap>
      )}
    </li>
  );
}
