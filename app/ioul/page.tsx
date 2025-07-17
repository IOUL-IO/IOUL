import React, { useState, useEffect, useCallback } from 'react';

const IoulPage: React.FC = () => {
  const [state, setState] = useState(0);

  // Cycle util-state 0 → 1 → 2 → 0 on click
  const handleUtilLineClick = useCallback(() => {
    setState(prev => (prev + 1) % 3);
  }, []);

  // Sync the data-util CSS attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-util', state.toString());
  }, [state]);

  return (
    <div>
      {/* ... your existing content ... */}

      {/* Util line toggle */}
      <div
        className="line util-line"
        onClick={handleUtilLineClick}
      />

      {/* ... rest of your JSX ... */}
    </div>
  );
};

export default IoulPage;
