import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

import './DragHandle.css';

const DragHandle = SortableHandle(({ children }) => (
	<div className="DragHandle">{children}</div>
));

export default DragHandle;
