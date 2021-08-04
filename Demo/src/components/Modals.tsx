import { Button, Modal, PageActionsPanel } from "../../../src";
import { useState } from "react";
import ReactJson from "react-json-view";

import ModalInterface from '../interfaces/modal.interface.json'

function Modals() {
  const [smallModal, setSmallModal] = useState<boolean>(false)
  const [mediumModal, setMediumModal] = useState<boolean>(false)
  const [largeModal, setLargeModal] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  // loader
  function onCloseModal(time: number, size: any) {
    setLoading(true)
    setTimeout(()=>{
      size(false)
      setLoading(false)
    }, time)
  }
  return (
    <div className="mt-5">
      <PageActionsPanel title="Modals page">
        {[{title: "Small modal", size: setSmallModal }, {title: "Medium modal", size: setMediumModal }, {title: "Large modal", size: setLargeModal }].map((size: any) => (
          <Button.Primary key={size.title} title={`${size.title}`} onClick={()=>size.size(true)}/>
        ))}
      </PageActionsPanel>
      <Modal.Medium show={mediumModal} closeButton onHide={()=>setMediumModal(false)} title="Medium modal" disableClickOutsideToClose>
        <div>
          <ReactJson src={ModalInterface} collapsed={false} />
          <p>View the{" "}
            <a style={{color: "blue"}} href="https://github.com/uafrica/ui-framework/blob/main/src/Modal.tsx" target="_blank">Modal</a>{" "}
            here
          </p>
        </div>
        <Modal.ButtonsPanel>
          <Button.Cancel title="Cancel" onClick={()=>setMediumModal(false)} />
          <Button.Primary title="Save" loadingTitle="Saving" isLoading={loading} onClick={()=>onCloseModal(1500, setMediumModal)} />
        </Modal.ButtonsPanel>
      </Modal.Medium>
      <Modal.Small show={smallModal} closeButton={false} onHide={()=>setSmallModal(false)} title="Small modal">
        <div>
          <div>
            <ReactJson src={ModalInterface} collapsed={false} />
            <p>View the{" "}
              <a style={{color: "blue"}} href="https://github.com/uafrica/ui-framework/blob/main/src/Modal.tsx" target="_blank">Modal</a>{" "}
              here
            </p>
          </div>
        </div>
        <Modal.ButtonsPanel>
          <Button.Cancel title="Cancel" onClick={()=>setSmallModal(false)} />
          <Button.Primary title="Save" loadingTitle="Saving" isLoading={loading} onClick={()=>onCloseModal(1500, setSmallModal)} />
        </Modal.ButtonsPanel>
      </Modal.Small>
      <Modal.Large show={largeModal} closeButton onHide={()=>setLargeModal(false)} title="Small modal">
        <div>
          <div>
            <ReactJson src={ModalInterface} collapsed={false} />
            <p>View the{" "}
              <a style={{color: "blue"}} href="https://github.com/uafrica/ui-framework/blob/main/src/Modal.tsx" target="_blank">Modal</a>{" "}
              here
            </p>
          </div>
        </div>
        <Modal.ButtonsPanel>
          <Button.Cancel title="Cancel" onClick={()=>setLargeModal(false)} />
          <Button.Primary title="Save" loadingTitle="Saving" isLoading={loading} onClick={()=>onCloseModal(1500, setLargeModal)} />
        </Modal.ButtonsPanel>
      </Modal.Large>
    </div>

  )
}

export default Modals