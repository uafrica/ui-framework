import { Confirm } from "./Confirm";
import NavigationPrompt from "react-router-navigation-prompt";

export default function NavPrompt({
                                    shouldPrompt,
                                    bodyText
                                  }: {
  shouldPrompt: boolean;
  bodyText?: string;
}) {
  return (
    <>
      <NavigationPrompt
        when={(currentLocation, nextLocation, _action) => {
          return (
            (nextLocation?.pathname !== currentLocation.pathname ||
              nextLocation?.search !== currentLocation?.search) &&
            shouldPrompt
          );
        }}
      >
        {({ onConfirm, onCancel }) => (
          <Confirm
            title="Are you sure you want to leave?"
            body={bodyText ?? "There are unsaved changes. Are you sure you want to leave?"}
            isVisible
            onConfirm={onConfirm}
            onCancel={onCancel}
            onClose={onCancel}
            showCancelButton
            confirmText="Yes, I want to leave"
            cancelText="Cancel"
            disableClickOutsideToClose
            disablePressEscToClose
          >
            <></>
          </Confirm>
        )}
      </NavigationPrompt>
    </>
  );
}
