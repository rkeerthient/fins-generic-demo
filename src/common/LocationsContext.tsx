import * as React from "react";
import { useState, useContext } from "react";

interface ContextType {
  selectedLocationId: any;
  setSelectedLocationId: React.Dispatch<React.SetStateAction<any>>;
  hoveredLocationId: any;
  setHoveredLocationId: React.Dispatch<React.SetStateAction<any>>;
  clicked: any;
  setClicked: React.Dispatch<React.SetStateAction<any>>;
}

const LocationsContext = React.createContext<ContextType | undefined>(
  undefined
);

export const LocationsProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [selectedLocationId, setSelectedLocationId] = useState<any>(null);
  const [hoveredLocationId, setHoveredLocationId] = useState<any>(null);
  const [clicked, setClicked] = useState<any>(null);

  return (
    <LocationsContext.Provider
      value={React.useMemo(
        () => ({
          selectedLocationId,
          setSelectedLocationId,
          hoveredLocationId,
          setHoveredLocationId,
          clicked,
          setClicked,
        }),
        [selectedLocationId, hoveredLocationId, clicked]
      )}
    >
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocationsContext = () => {
  const context = useContext(LocationsContext);
  if (!context) {
    throw new Error(
      "useLocationsContext must be used within a LocationsProvider"
    );
  }
  return context;
};
