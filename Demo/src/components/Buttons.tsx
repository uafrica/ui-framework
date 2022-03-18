import {
  Button
} from "../../../src";
import { useState } from "react";

function Buttons() {
  const [isLoading, setIsLoading] = useState<{ primary: boolean, secondary: boolean, tertiary: boolean, link: boolean }>({
    primary: false,
    secondary: false,
    tertiary: false,
    link: false
  });
  const setLoadingState = (key: string) => {
    switch (key) {
      case "primary":
        setIsLoading({ ...isLoading, primary: true });
        setTimeout(() => {
          setIsLoading({...isLoading, primary: false})
        }, 2000)
        break;
      case "secondary":
        setIsLoading({ ...isLoading, secondary: true });
        setTimeout(() => {
          setIsLoading({...isLoading, secondary: false})
        }, 2000)
        break;
      case "tertiary":
        setIsLoading({ ...isLoading, tertiary: true });
        setTimeout(() => {
          setIsLoading({...isLoading, tertiary: false})
        }, 2000)
        break;
      case "link":
        setIsLoading({ ...isLoading, link: true });
        setTimeout(() => {
          setIsLoading({...isLoading, link: false})
        }, 2000)
        break;
    }
  };

  return (
    <div className={"my-4 flex gap-5"}>
      <Button.Primary
        title={"Primary"}
        onClick={() => setLoadingState("primary")}
        isLoading={isLoading.primary}
        loadingTitle={"Primary loading"}
      />
      <Button.Secondary
        title={"Secondary"}
        onClick={() => setLoadingState("secondary")}
        isLoading={isLoading.secondary}
        loadingTitle={"Secondary loading"}
      />
      <Button.Tertiary
        title={"Tertiary"}
        onClick={() => setLoadingState("tertiary")}
        isLoading={isLoading.tertiary}
        loadingTitle={"Tertiary loading"}
      />
      <Button.Tertiary
        icon={"download"}
        onClick={() => setLoadingState("link")}
        isLoading={isLoading.link}
      />
    </div>
  );
}

export default Buttons;