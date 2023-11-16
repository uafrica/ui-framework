import Confirm from "../../../src/Confirm";

export default function NavPrompt({

                                    bodyText
                                  }: {
  shouldPrompt: boolean;
  bodyText?: string;
}) {
  return (
    <>

          <Confirm
            title="Are you sure you want to leave?"
            body={bodyText ?? "There are unsaved changes. Are you sure you want to leave?"}
            isVisible
            onConfirm={()=>{}}
            onCancel={()=>{}}
            onClose={()=>{}}
            showCancelButton
            confirmText="Yes, I want to leave"
            cancelText="Cancel"
            disableClickOutsideToClose
            disablePressEscToClose
          >
            <></>
          </Confirm>
    </>
  );
}
