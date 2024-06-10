// @ts-ignore
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { createContext, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Manager, Popper, Reference } from "react-popper";
import { IInfoPopover } from "./interfaces/infoPopover.interface";

function InfoPopover(props: IInfoPopover) {
  function Portal(props: { children: ReactNode }) {
    const { children } = props;
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;
    return createPortal(children, document.body);
  }

  const InfoPopoverCtx = createContext<any>({});

  function useInfoPopoverCtx(
    ref: React.MutableRefObject<HTMLElement | undefined>
  ): any {
    useEffect(() => {
      function mouseDownListener(e: MouseEvent) {
        const targetAsNode = e.target;
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

  const {
    placement = "auto",
    children,
    popoverContent,
    showPopover,
    width = "w-80",
  } = props;

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
      <>{hostElement && ReactDOM.createPortal(content, hostElement)}</>
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
          {/* @ts-ignore */}
          <Portal>
            <Popper
              placement={placement}
              innerRef={(node) => (popupNode.current = node)}
            >
              {({ ref, style }) => (
                <div
                  className={`info-popover z-50 origin-top-right absolute font-normal p-4 rounded-md shadow-md bg-white divide-y  ring-1 ring-black ring-opacity-5  divide-gray-100 focus:outline-none ${width}`}
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
