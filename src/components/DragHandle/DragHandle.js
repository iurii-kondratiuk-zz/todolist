import React, { PropTypes } from 'react';
import { SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(({ children }) => (
  <div className="DragHandle">
    {children}
  </div>
));

DragHandle.propTypes = {
  children: PropTypes.node,
};

export default DragHandle;
