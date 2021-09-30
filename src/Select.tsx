import { createContext, useEffect, useRef, useState } from "react";
import { Popover } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InfoButton } from "./InfoButton";
import { Input } from "./Input";
import { Label } from "./Label";
import { Manager, Popper, Reference } from "react-popper";
import { Button } from "./Button";

// Interface
interface ISelect extends IBase {
  options: any;
}

interface IGroupedSelect extends IBase {
  optionGroups: IOptionGroup[];
}

interface IOptionGroup {
  label?: string;
  options: any[];
}

interface IBase {
  label?: any;
  labelInline?: boolean;
  labelClassName?: string;
  className?: string;
  containerClassName?: string;
  noMargin?: boolean;
  popoverWidth?: string;
  buttonWidth?: string;
  id?: string;
  value?: any;
  info?: any;
  onChange?: (value: any) => void;
  onClick?: () => void;
  onSearchBlur?: () => void;
  onSearchFocus?: () => void;
  disabled?: boolean;
  noSearch?: boolean;
  placeholder?: any;
  multiSelection?: boolean;
  buttons?: any; // If you want an add option buttons to the bottom of the list, add Button.Link elements
  onDelete?: (label: any, value: any) => void; // Renders a delete button next to each option
}

// Implementation
function GroupedSelect(props: IGroupedSelect) {
  let {
    label,
    labelClassName,
    disabled,
    id,
    placeholder,
    popoverWidth,
    value,
    optionGroups,
    labelInline,
    noMargin,
    className,
    buttonWidth,
    multiSelection,
    containerClassName,
    info,
    buttons,
    onDelete,
    onChange,
    onClick,
    onSearchBlur,
    onSearchFocus,
    noSearch
  } = props;

  const popupNode = useRef<HTMLElement>();
  const ctxValue = useGroupedSelectCtx(popupNode, onSearchBlur);

  // State for searching
  let [searchTerm, setSearchTerm] = useState<string>("");

  // Happens when an item is selected
  function onSelectToggle(_value: any) {
    let newValue = _value;

    // Multi select
    if (multiSelection) {
      newValue = JSON.parse(JSON.stringify(value));

      let currentIndex = newValue.indexOf(_value);
      if (currentIndex >= 0) {
        newValue.splice(currentIndex, 1);
      } else {
        newValue.push(_value);
      }
    }
    // Single select
    else {
      // @ts-ignore
      if (newValue === value) {
        newValue = undefined;
      }
    }

    onChange && onChange(newValue);
  }

  // renders a option group with its list of options
  function renderOptionGroup(optionGroup: IOptionGroup) {
    let limit = 100;

    // Search
    searchTerm = searchTerm.toLowerCase();
    let optionsLimited = optionGroup.options.filter((option: any) => {
      if (typeof option.label === "string" && searchTerm) {
        return option.label.toLowerCase().indexOf(searchTerm) >= 0;
      }
      return true;
    });

    let optionsOmitted = 0;

    // Limit results
    if (optionsLimited.length > limit) {
      optionsOmitted = optionsLimited.length - limit;
      optionsLimited = optionsLimited.slice(0, limit);
    }

    return (
      <div key={optionGroup.label}>
        {optionGroup.label && (
          <div className="text-gray-600 uppercase text-xs p-2 mt-4">{optionGroup.label}</div>
        )}
        {optionsLimited.map((option: any) => {
          let selected = false;
          if (multiSelection) {
            selected = value.indexOf(option.value) >= 0;
          } else {
            selected = value === option.value;
          }

          return (
            <div key={option.value} className="flex flex-row items-center">
              <div
                onClick={() => {
                  onSelectToggle(option.value);
                  if (!multiSelection) {
                    ctxValue.hideSelect();
                  }
                }}
                className={
                  "flex-1 cursor-pointer select-none relative py-2 pl-2 pr-9 hover:bg-gray-100 rounded-md mt-1  " +
                  (selected ? "bg-gray-100" : "text-gray-900")
                }
              >
                <span className={"flex flex-wrap " + (selected ? "font-semibold" : "font-normal")}>
                  {option.label}
                </span>

                {selected ? (
                  <span className="absolute inset-y-0 right-0 u-vertical-center pr-4 text-primary-600">
                    <FontAwesomeIcon icon="check" className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </div>
              {onDelete && !option.disableDelete && (
                <span className="u-vertical-center p-2 text-red hover:text-red-700 cursor-pointer">
                  <FontAwesomeIcon
                    icon="trash"
                    title="Delete"
                    onClick={() => onDelete && onDelete(option.label, option.value)}
                  />
                </span>
              )}
            </div>
          );
        })}
        {optionsOmitted > 0 && <div className="pl-2 mt-2">+ {optionsOmitted} more</div>}
      </div>
    );
  }

  let flattenedOptions: any[] = [].concat.apply(
    [],
    //@ts-ignore
    optionGroups.map((optionGroup: IOptionGroup) => optionGroup.options)
  );

  let labelWithValue: string = "";

  if (value) {
    if (multiSelection) {
      if (value.length === 1) {
        let selectedItem = flattenedOptions.find((option: any) => option.value === value[0]);
        if (selectedItem) {
          labelWithValue = selectedItem.label;
        }
      } else if (value.length > 1) {
        labelWithValue = value.length + " selected";
      }
    } else {
      let selectedItem = flattenedOptions.find((option: any) => option.value === value);
      if (selectedItem) {
        labelWithValue = selectedItem.label;
      }
    }
  }

  let allOptionsSearched = flattenedOptions.filter((option: any) => {
    if (typeof option?.label === "string" && searchTerm) {
      return option.label.toLowerCase().indexOf(searchTerm) >= 0;
    }
    return true;
  });

  let _containerClassName = "mt-4";

  if (noMargin || labelInline) {
    _containerClassName = "";
  }

  if (containerClassName) {
    _containerClassName = containerClassName;
  }

  let _buttonWidth = "w-56";
  if (buttonWidth) {
    _buttonWidth = buttonWidth;
  }

  // Select all buttons
  let selectAllButton: any;

  if (multiSelection) {
    let allSelected = flattenedOptions.length === value.length;
    selectAllButton = (
      <Button.Link
        key="select-deselect"
        title={allSelected ? "Deselect all" : "Select all"}
        onClick={() => {
          if (allSelected) {
            onChange && onChange([]);
          } else {
            onChange && onChange(flattenedOptions.map(option => option.value));
          }
        }}
      />
    );
  }

  let placement = "bottom-start";
  return (
    <div className={_containerClassName} onClick={(e: any) => e.stopPropagation()}>
      <Popover>
        <div className={labelInline ? "flex flex-row items-center" : ""}>
          {label && (
            <Label className={labelClassName} noMargin={labelInline}>
              {label} {info && <InfoButton>{info}</InfoButton>}
            </Label>
          )}

          {/* Button that is clicked on to open the dropdown */}
          <GroupedSelectCtx.Provider value={ctxValue}>
            <Manager>
              <Reference>
                {({ ref }) => (
                  <div
                    className="flex flex-row" // @ts-ignore
                  >
                    <div
                      ref={ref}
                      className={"relative " + (className ? className : "") + _buttonWidth}
                    >
                      <div
                        onClick={(e: any) => {
                          e.stopPropagation();

                          if (disabled) return;

                          ctxValue.showSelect();
                          if (onClick) {
                            onClick();
                          }

                          setTimeout(() => {
                            try {
                              // @ts-ignore
                              document.getElementById("ui-framework-search").focus();
                            } catch (e) {
                              console.log(e);
                            }
                          }, 10);
                        }}
                      >
                        <div
                          className={
                            "relative border border-gray-300 rounded-md shadow-sm pl-3 pr-6 py-2 text-left w-full " +
                            (disabled ? "bg-gray-100" : "bg-white cursor-pointer")
                          }
                          id={id}
                        >
                          <span className="block truncate">
                            {labelWithValue ? labelWithValue : placeholder}
                          </span>
                          <span className="absolute inset-y-0 right-0 u-vertical-center pr-2 pointer-events-none">
                            <FontAwesomeIcon
                              icon="caret-down"
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">{!label && info && <InfoButton>{info}</InfoButton>}</div>
                  </div>
                )}
              </Reference>
              <Popper
                // @ts-ignore
                placement={placement}
                innerRef={node => (popupNode.current = node)}
                modifiers={[
                  {
                    name: "offset",
                    options: {
                      offset: [0, 5]
                    }
                  }
                ]}
              >
                {({ ref, style }) =>
                  ctxValue.isVisible ? (
                    <div
                      style={style}
                      ref={ref}
                      className={
                        "overflow-hidden z-30 rounded-lg shadow-lg u-black-ring px-4 pb-2 bg-white " +
                        (popoverWidth ? popoverWidth : "w-72")
                      }
                    >
                      {!noSearch && (
                        <Input
                          inputId="ui-framework-search"
                          containerClassName="mt-4 w-full"
                          onBlur={onSearchBlur}
                          onFocus={onSearchFocus}
                          appendIcon="search"
                          value={searchTerm}
                          onChange={(e: any) => setSearchTerm(e.target.value)}
                        />
                      )}
                      {selectAllButton && (
                        <div className="-ml-1 border-b border-gray-200 pt-1 -mb-2">
                          {selectAllButton}
                        </div>
                      )}
                      <div className={"mt-2 mb-2 max-h-52 overflow-y-auto"}>
                        {allOptionsSearched.length === 0 && (
                          <div className="pl-2 mt-2">No options</div>
                        )}
                        {optionGroups.map((optionGroup: IOptionGroup) => {
                          return renderOptionGroup(optionGroup);
                        })}
                      </div>
                      {buttons && (
                        <div className="-ml-1 border-t border-gray-200 pt-1">{buttons}</div>
                      )}
                    </div>
                  ) : null
                }
              </Popper>

              <Popover.Panel className="absolute z-30" />
            </Manager>
          </GroupedSelectCtx.Provider>
        </div>
      </Popover>
    </div>
  );
}

function Select(props: ISelect) {
  // convert options into a group
  let optionGroups = [
    {
      label: "",
      options: props.options
    }
  ];

  return <GroupedSelect {...props} optionGroups={optionGroups} />;
}

export { Select, GroupedSelect };

interface GroupedSelectContextType {
  isVisible: boolean;
  showSelect: () => void;
  hideSelect: () => void;
}

const GroupedSelectCtx = createContext<GroupedSelectContextType>({
  isVisible: false,
  showSelect: () => {},
  hideSelect: () => {}
});

function useGroupedSelectCtx(
  ref: React.MutableRefObject<HTMLElement | undefined>,
  onSearchBlur?: Function
): GroupedSelectContextType {
  const [isVisible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    function mouseDownListener(e: MouseEvent) {
      let targetAsNode: any = e.target;
      if (ref.current && !ref.current.contains(targetAsNode)) {
        setVisible(false);
      }
    }

    if (isVisible) {
      document.addEventListener("mousedown", mouseDownListener);
    }

    return () => {
      document.removeEventListener("mousedown", mouseDownListener);
      if (onSearchBlur) {
        onSearchBlur(); // fires on search blur whenever the dropdown is closed
      }
    };
  }, [isVisible]);

  return {
    isVisible,
    showSelect: () => setVisible(true),
    hideSelect: () => setVisible(false)
  };
}
