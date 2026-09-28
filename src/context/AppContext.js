import React, { createContext, useContext, useState } from 'react';

import { student } from '../data/mockStudent';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [appliedIds, setAppliedIds] = useState([]);
  const apply = (driveId) => setAppliedIds((prev) => [...prev, driveId]);
  const applications = [
    ...student.applications,
    ...appliedIds.map((driveId) => ({ driveId, status: 'Applied' })),
  ];
  return (
    <AppContext.Provider value={{ student, appliedIds, apply, applications }}>
      {children}
    </AppContext.Provider>
  );
}
