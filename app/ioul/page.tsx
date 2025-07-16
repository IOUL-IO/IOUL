import React, { useState, useEffect, useCallback } from 'react';

const IoulPage: React.FC = () => {
  const [state, setState] = useState(0);

  // Handle the click on util line: cycle 0 → 1 → 2 → 0
  const handleUtilLineClick = useCallback(() => {
    setState(prev => (prev + 1) % 3);
  }, []);

  // Sync data-util attribute for CSS toggles
  useEffect(() => {
    document.documentElement.setAttribute('data-util', state.toString());
  }, [state]);

  return (
    <div>
      {/* Other page content */}
      <div
        className="line util-line"
        onClick={handleUtilLineClick}
      />
      {/* Rest of your JSX */}
    </div>
  );
};

export default IoulPage;
