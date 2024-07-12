import { useSearchActions } from "@yext/search-headless-react";
import { useState, useLayoutEffect } from "react";

export const useVerticalSearch = (vertical: string) => {
  const searchActions = useSearchActions();
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(vertical);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      if (vertical) {
        setIsLoaded(false);
        searchActions.setVertical(vertical);
        searchActions.executeVerticalQuery().then((res) => {
          console.log(JSON.stringify(res));
          setIsLoaded(true);
        });
      }
    }
  }, [searchActions, vertical]);

  return { isLoaded };
};
