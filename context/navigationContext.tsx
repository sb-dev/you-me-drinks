import React, { Dispatch, SetStateAction, createContext, useState } from "react";

type Page = {
  name: string
  href: string
  current: boolean
}

type NavigationContextModel = {
  navigation: Page[]
  setNavigation: Dispatch<SetStateAction<Page[]>>
}

export const NavigationContext = createContext<NavigationContextModel | null>(null);

const NavigationContextProvider = ({ children }: any) => {
  const [navigation, setNavigation] = useState<Page[]>([]);

  return (
    <NavigationContext.Provider value={{navigation, setNavigation}}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContextProvider;
