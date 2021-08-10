import { Button, Modal, PageActionsPanel } from "../../../src";
import { useState } from "react";

function Modals() {
  const [smallModal, setSmallModal] = useState<boolean>(false);
  const [mediumModal, setMediumModal] = useState<boolean>(false);
  const [largeModal, setLargeModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // loader
  function onCloseModal(time: number, size: any) {
    setLoading(true);
    setTimeout(() => {
      size(false);
      setLoading(false);
    }, time);
  }
  return (
    <div className="mt-5">
      <PageActionsPanel title="Modals page">
        {[
          { title: "Small modal", size: setSmallModal },
          { title: "Medium modal", size: setMediumModal },
          { title: "Large modal", size: setLargeModal }
        ].map((size: any) => (
          <Button.Primary
            key={size.title}
            title={`${size.title}`}
            onClick={() => size.size(true)}
          />
        ))}
      </PageActionsPanel>
      <Modal.Medium
        show={mediumModal}
        closeButton
        onHide={() => setMediumModal(false)}
        title="Medium modal (with interface)"
        disableClickOutsideToClose
      >
        <div>
          <pre>
            <code>{`
            interface ISmallMediumModalProps {
                show: boolean;
                children: any;
                onHide?: any;
                title?: any;
                icon?: IconProp;
                closeButton: boolean;
                disableClickOutsideToClose?: boolean;
              }
              
            interface IBaseProps extends ISmallMediumModalProps {
                className?: string;
              }
            `}</code>
          </pre>
        </div>
        <Modal.ButtonsPanel>
          <Button.Cancel title="Cancel" onClick={() => setMediumModal(false)} />
          <Button.Primary
            title="Save"
            loadingTitle="Saving"
            isLoading={loading}
            onClick={() => onCloseModal(1500, setMediumModal)}
          />
        </Modal.ButtonsPanel>
      </Modal.Medium>
      <Modal.Small
        show={smallModal}
        closeButton={false}
        onHide={() => setSmallModal(false)}
        title="Small modal"
      >
        <div>Modal body goes here</div>
        <Modal.ButtonsPanel>
          <Button.Cancel title="Cancel" onClick={() => setSmallModal(false)} />
          <Button.Primary
            title="Save"
            loadingTitle="Saving"
            isLoading={loading}
            onClick={() => onCloseModal(1500, setSmallModal)}
          />
        </Modal.ButtonsPanel>
      </Modal.Small>
      <Modal.Large
        show={largeModal}
        closeButton
        onHide={() => setLargeModal(false)}
        title="Large modal (with code example)"
      >
        <div>
          <pre>
            <code>{`
              <Modal.Large
                show={largeModal}
                closeButton
                onHide={() => setLargeModal(false)}
                title="Large modal"
              >
              <div>Modal body goes here</div>
              <Modal.ButtonsPanel>
                <Button.Cancel title="Cancel" onClick={() => setLargeModal(false)} />
                <Button.Primary
                  title="Save"
                  loadingTitle="Saving"
                  isLoading={loading}
                  onClick={() => onCloseModal(1500, setLargeModal)}
                />
              </Modal.ButtonsPanel>
            </Modal.Large>
        `}</code>
          </pre>
        </div>
        <Modal.ButtonsPanel>
          <Button.Cancel title="Cancel" onClick={() => setLargeModal(false)} />
          <Button.Primary
            title="Save"
            loadingTitle="Saving"
            isLoading={loading}
            onClick={() => onCloseModal(1500, setLargeModal)}
          />
        </Modal.ButtonsPanel>
      </Modal.Large>
    </div>
  );
}

export default Modals;
