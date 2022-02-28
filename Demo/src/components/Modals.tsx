import { Button, Modal, PageActionsPanel, Accordion } from "../../../src";
import { useState } from "react";

function Modals() {
  const [smallModal, setSmallModal] = useState<boolean>(false);
  const [mediumModal, setMediumModal] = useState<boolean>(false);
  const [largeModal, setLargeModal] = useState<boolean>(false);
  const [nestedModal1, setNestedModal1] = useState<boolean>(false);
  const [nestedModal2, setNestedModal2] = useState<boolean>(false);
  const [nestedModal3, setNestedModal3] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // loader
  function onCloseModal(time: number, size: any) {
    setLoading(true);
    setTimeout(() => {
      size(false);
      setLoading(false);
    }, time);
  }

  function renderNestedModal() {
    return (
      <Modal.Large
        show={nestedModal1}
        closeButton
        onHide={() => setNestedModal1(false)}
        title="Nested modal 1"
      >
        <Button.Primary
          title="Open nested modal 2"
          onClick={() => {
            setNestedModal2(true);
          }}
        />
        <Accordion title={"Some title"} caretColor={"red"}>
          <div className="mt-4">Some content here</div>
        </Accordion>

        <Modal.Medium
          show={nestedModal2}
          closeButton
          onHide={() => setNestedModal2(false)}
          title="Nested modal 2"
        >
          <Button.Primary
            title="Open nested modal 3"
            onClick={() => {
              setNestedModal3(true);
            }}
          />
          <div className="mt-4">Some content here</div>
          <Modal.Small
            show={nestedModal3}
            closeButton
            onHide={() => setNestedModal3(false)}
            title="Nested modal 3"
          >
            <div>Some content here</div>

            <Modal.ButtonsPanel>
              <Button.Cancel title="Cancel" onClick={() => setNestedModal3(false)} />
              <Button.Primary
                title="Save"
                loadingTitle="Saving"
                isLoading={loading}
                onClick={() => onCloseModal(1500, setNestedModal3)}
              />
            </Modal.ButtonsPanel>
          </Modal.Small>

          <Modal.ButtonsPanel>
            <Button.Cancel title="Cancel" onClick={() => setNestedModal2(false)} />
            <Button.Primary
              title="Save"
              loadingTitle="Saving"
              isLoading={loading}
              onClick={() => onCloseModal(1500, setNestedModal2)}
            />
          </Modal.ButtonsPanel>
        </Modal.Medium>

        <Modal.ButtonsPanel>
          <Button.Cancel title="Cancel" onClick={() => setNestedModal1(false)} />
          <Button.Primary
            title="Save"
            loadingTitle="Saving"
            isLoading={loading}
            onClick={() => onCloseModal(1500, setNestedModal1)}
          />
        </Modal.ButtonsPanel>
      </Modal.Large>
    );
  }
  return (
    <div className="mt-5">
      <PageActionsPanel title="Modals page">
        {[
          { title: "Small modal", size: setSmallModal },
          { title: "Medium modal", size: setMediumModal },
          { title: "Large modal", size: setLargeModal },
          { title: "Nested modal", size: setNestedModal1 }
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

      {renderNestedModal()}
    </div>
  );
}

export default Modals;
