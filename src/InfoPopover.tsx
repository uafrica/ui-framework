import React, { useRef } from "react";
import { Manager, Reference, Popper } from "react-popper";
import { createContext, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import ReactDOM from "react-dom";

interface IInfoPopover {
  placement?:
    | "auto"
    | "bottom-start"
    | "bottom-end"
    | "top-start"
    | "top-end"
    | "top"
    | "bottom"
    | "left"
    | "right";
  children: any;
  popoverContent: any;
  showPopover: boolean;
  onPopoverDismiss: Function;
  width?: string;
  dataTest?: string | undefined;
}

function InfoPopover(props: IInfoPopover) {
  function Portal(props: { children: ReactNode }) {
    let { children } = props;
    let [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;
    return createPortal(children, document.body);
  }

  const InfoPopoverCtx = createContext<any>({});

  function useInfoPopoverCtx(ref: React.MutableRefObject<HTMLElement | undefined>): any {
    useEffect(() => {
      function mouseDownListener(e: MouseEvent) {
        let targetAsNode = e.target;
        // @ts-ignore
        if (ref.current && !ref.current.contains(targetAsNode)) {
          props.onPopoverDismiss();
        }
      }

      if (props.showPopover) {
        document.addEventListener("mousedown", mouseDownListener);
      }

      return () => {
        document.removeEventListener("mousedown", mouseDownListener);
      };
    }, [props.showPopover]);
  }

  let { placement, children, popoverContent, showPopover, width } = props;

  if (!placement) {
    placement = "auto";
  }
  const popupNode = useRef<HTMLElement>();
  const ctxValue = useInfoPopoverCtx(popupNode);

  const hostElement = document.getElementById("modal-host");

  const content = (
    <div className="uafrica-modal-overlay fixed inset-0 bg-black bg-opacity-20 transition-opacity" />
  );

  if (!showPopover) {
    return <>{children}</>;
  }

  return (
    <div className="relative text-left">
      {hostElement && ReactDOM.createPortal(content, hostElement)}
      <InfoPopoverCtx.Provider value={ctxValue}>
        <Manager>
          <Reference>
            {({ ref }) => (
              <div
                className=" w-full "
                ref={ref}
                onClick={(e: any) => {
                  e.stopPropagation();
                }}
              >
                {children}
              </div>
            )}
          </Reference>
          <Portal>
            <Popper placement={placement} innerRef={node => (popupNode.current = node)}>
              {({ ref, style }) => (
                <div
                  className={
                    "info-popover z-50 origin-top-right absolute font-normal p-4 rounded-md shadow-md bg-white divide-y u-black-ring divide-gray-100 focus:outline-none " +
                    (width ? width : "w-80")
                  }
                  // @ts-ignore
                  style={style}
                  ref={ref}
                  data-test={props.dataTest}
                >
                  {popoverContent}
                </div>
              )}
            </Popper>
          </Portal>
        </Manager>
      </InfoPopoverCtx.Provider>
    </div>
  );
}

export { InfoPopover };
