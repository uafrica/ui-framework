import { Button, Modal, PageActionsPanel } from "../../../src";
import { useState } from "react";

function Modals() {
  const [mediumModal, setMediumModal] = useState<boolean>(false)
  const [mediumLoading, setMediumLoading] = useState<boolean>(false)

  // loader
  function onCloseModal(time: number) {
    setMediumLoading(true)
    setTimeout(()=>{
      setMediumModal(false)
      setMediumLoading(false)
    }, time)
  }
  return (
    <div className="mt-5">
      <PageActionsPanel title="Modals page">
        <Button.Primary title="Open modal" onClick={()=>setMediumModal(true)}/>
      </PageActionsPanel>
      <Modal.Medium show={mediumModal} closeButton onHide={()=>setMediumModal(false)} title="Medium modal">
        <div>
          This is a medium modal
        </div>
        <Modal.ButtonsPanel>
          <Button.Cancel title="Cancel" onClick={()=>setMediumModal(false)} />
          <Button.Primary title="Save" loadingTitle="Saving" isLoading={mediumLoading} onClick={()=>onCloseModal(1500)} />
        </Modal.ButtonsPanel>
      </Modal.Medium>
    </div>

  )
}

export default Modals