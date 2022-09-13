import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Manager, Reference, Popper } from "react-popper";
import { createContext, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface IInfoButton {
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
  className?: string;
}

function InfoButton(props: IInfoButton) {
  let { placement, children, className } = props;
  if (!placement) {
    placement = "auto";
  }
  const popupNode = useRef<HTMLElement>();
  const ctxValue = useInfoButtonCtx(popupNode);

  return (
    <div className="relative text-left ml-4">
      <InfoButtonCtx.Provider value={ctxValue}>
        <Manager>
          <Reference>
            {({ ref }) => (
              <div
                className="u-center w-full bg-white font-medium text-primary hover:bg-primary-50 focus:outline-none rounded-full cursor-pointer"
                ref={ref}
                onClick={(e: any) => {
                  e.stopPropagation();
                  ctxValue.showInfo();
                }}
              >
                <FontAwesomeIcon icon="info-circle" className={className ? className : ""} />
              </div>
            )}
          </Reference>
          <Portal>
            <Popper placement={placement} innerRef={node => (popupNode.current = node)}>
              {({ ref, style }) =>
                ctxValue.isVisible ? (
                  <div
                    className={
                      "info-popover z-50 origin-top-right absolute font-normal p-4 w-80 rounded-md shadow-md bg-white divide-y u-black-ring divide-gray-100 focus:outline-none"
                    }
                    // @ts-ignore
                    style={style}
                    ref={ref}
                  >
                    {children}
                  </div>
                ) : null
              }
            </Popper>
          </Portal>
        </Manager>
      </InfoButtonCtx.Provider>
    </div>
  );
}

export { InfoButton };

function Portal(props: { children: ReactNode }) {
  let { children } = props;
  let [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return createPortal(children, document.body);
}

interface InfoButtonContextType {
  isVisible: boolean;
  showInfo: () => void;
}

const InfoButtonCtx = createContext<InfoButtonContextType>({
  isVisible: false,
  showInfo: () => {}
});

export function useInfoButtonCtx(
  ref: React.MutableRefObject<HTMLElement | undefined>
): InfoButtonContextType {
  const [isVisible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    function mouseDownListener(e: MouseEvent) {
      let targetAsNode = e.target;
      // @ts-ignore
      if (ref.current && !ref.current.contains(targetAsNode)) {
        setVisible(false);
      }
    }

    if (isVisible) {
      document.addEventListener("mousedown", mouseDownListener);
    }

    return () => {
      document.removeEventListener("mousedown", mouseDownListener);
    };
  }, [isVisible]);

  return {
    isVisible,
    showInfo: () => setVisible(!isVisible)
  };
}
