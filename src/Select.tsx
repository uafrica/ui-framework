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
  allowDeselect?: boolean; // single select mode does not allow for the deselection of an option by default, only switching to another option. override by setting this to true
  showAsterisk?: boolean;
  dataTest?: string | undefined;
  showAllButton?: boolean; // conditionally display a button to show all available options
  showAllSelectedText?: boolean; // show "All selected" if the options selected is equal to the amount of options in the array
  allSelectedText?: string | undefined; // custom all selected text
  popoverHeight?: string;
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
    noSearch,
    allowDeselect,
    showAsterisk,
    dataTest,
    showAllButton,
    showAllSelectedText,
    allSelectedText,
    popoverHeight
  } = props;

  if (placeholder === undefined) {
    placeholder = "Select";
  }

  const popupNode = useRef<HTMLElement>();
  const ctxValue = useGroupedSelectCtx(popupNode, onSearchBlur);

  // State for searching
  let [searchTerm, setSearchTerm] = useState<string>("");

  // State for the show all button
  const [showAllClicked, setShowAllClicked] = useState<boolean>(false);
  const [showAllDisabled, setShowAllDisabled] = useState<boolean>(false);

  // Happens when an item is selected
  function onSelectToggle(_value: any) {
    try {
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
        if (allowDeselect) {
          if (newValue === value) {
            newValue = undefined;
          }
        }
      }

      onChange && onChange(newValue);
    } catch (e) {
      console.log(e);
    }
  }

  function clickOption(option: any) {
    if (option.disabled !== true) {
      onSelectToggle(option.value);
      if (!multiSelection) {
        ctxValue.hideSelect();
      }
    }
  }

  // renders an option group with its list of options
  function renderOptionGroup(optionGroup: IOptionGroup, shouldShowAllResults?: boolean) {
    let limit = 100;

    // Search
    searchTerm = searchTerm.toLowerCase();
    let optionsLimited = [];
    try {
      optionsLimited = optionGroup.options.filter((option: any) => {
        if (typeof option.label === "string" && searchTerm) {
          return option.label.toLowerCase().indexOf(searchTerm) >= 0;
        }
        return true;
      });
    } catch (e) {
      console.log(e);
    }

    let optionsOmitted = 0;

    /** Disable the show all button if:
     * - the show all button has been clicked
     * - OR
     * - the available options are less than or equal to the set limit
     */
    if (shouldShowAllResults) {
      setShowAllDisabled(true);
    } else if (showAllButton && searchTerm.length >= 0 && optionsLimited.length <= limit) {
      setShowAllDisabled(true);
    } else {
      setShowAllDisabled(false);
    }

    // Limit results
    if (!shouldShowAllResults && optionsLimited.length > limit) {
      optionsOmitted = optionsLimited.length - limit;
      optionsLimited = optionsLimited.slice(0, limit);
    }

    return (
      optionsLimited.length > 0 && (
        <div key={optionGroup.label} className="mb-4">
          {optionGroup.label && (
            <div className="text-gray-600 uppercase text-xs p-2 mt-4">{optionGroup.label}</div>
          )}
          {optionsLimited.map((option: any) => {
            let selected;
            if (multiSelection) {
              selected = value.indexOf(option.value) >= 0;
            } else {
              selected = value === option.value;
            }

            return (
              <div key={option.value} className="flex flex-row items-center">
                <div
                  tabIndex={0}
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      clickOption(option);
                    }
                  }}
                  onClick={() => {
                    clickOption(option);
                  }}
                  className={
                    "flex-1 select-none relative py-2 pl-2 pr-9 hover:bg-gray-100 focus:bg-gray-100 u-focus rounded-md mt-1 mx-1  " +
                    (selected ? "bg-gray-100" : "text-gray-900") +
                    (option.disabled === true ? " cursor-not-allowed " : " cursor-pointer ")
                  }
                >
                  <span
                    className={
                      "flex flex-wrap " +
                      (selected ? "font-semibold" : "font-normal") +
                      (option.disabled === true ? " text-gray-500 " : "")
                    }
                  >
                    {option.label}
                  </span>

                  {selected ? (
                    <span
                      className={
                        "absolute inset-y-0 right-0 u-vertical-center pr-4 " +
                        (option.disabled === true ? " text-gray-500 " : " text-primary-600 ")
                      }
                    >
                      <FontAwesomeIcon icon="check" className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </div>
                {onDelete && !option.disableDelete && option.disabled !== true && (
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
      )
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
      } else if (value.length === flattenedOptions.length && showAllSelectedText) {
        labelWithValue = allSelectedText ?? "All selected";
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

  let allOptionsSearched = [];
  try {
    allOptionsSearched = flattenedOptions.filter((option: any) => {
      if (typeof option?.label === "string" && searchTerm) {
        return option.label.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
      }
      return true;
    });
  } catch (e) {
    console.log(e);
  }

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

  let disabledOptions: any = [];
  try {
    disabledOptions = flattenedOptions
      .filter((option: { value: string | number; disabled?: boolean }) => {
        return option.disabled;
      })
      .map((option: { label: string; value: any; disabled?: boolean }) => {
        return option.value;
      });
  } catch (e) {
    console.log(e);
  }

  try {
    if (multiSelection) {
      const selectedDisabledOptions = value.filter((v: any) => disabledOptions.includes(v));
      const notSelectedDisabledOptions = disabledOptions.filter(
        (v: any) => !selectedDisabledOptions.includes(v)
      );
      let allSelected =
        flattenedOptions.length - notSelectedDisabledOptions.length === value.length;
      selectAllButton = (
        <Button.Link
          key="select-deselect"
          title={allSelected ? "Deselect all" : "Select all"}
          onClick={() => {
            if (allSelected) {
              // deselect all, ignore disabled options
              onChange && onChange(selectedDisabledOptions);
            } else {
              // select all, ignore disabled options
              onChange &&
                onChange(
                  (flattenedOptions ? flattenedOptions : [])
                    .filter((option: { value: string | number; disabled?: boolean }) => {
                      return notSelectedDisabledOptions.indexOf(option.value) === -1;
                    })
                    .map(option => option.value)
                );
            }
          }}
        />
      );
    }
  } catch (e) {
    console.log(e);
  }

  let placement = "bottom-start";
  return (
    <div className={_containerClassName} onClick={(e: any) => e.stopPropagation()}>
      <Popover>
        <div className={labelInline ? "flex flex-row items-center space-x-4" : ""}>
          {label && (
            <Label className={labelClassName} noMargin={labelInline}>
              {label} {showAsterisk && " *"} {info && <InfoButton>{info}</InfoButton>}
            </Label>
          )}

          {/* Button that is clicked on to open the dropdown */}
          <GroupedSelectCtx.Provider value={ctxValue} key={ctxValue.isVisible.toString()}>
            {/* @ts-ignore */}
            <Manager>
              {/* @ts-ignore */}
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
                        className="u-focus rounded-md"
                        tabIndex={0}
                        onKeyPress={(e: any) => {
                          if (e.key === "Enter") {
                            if (ctxValue.isVisible) {
                              ctxValue.hideSelect();
                            } else {
                              ctxValue.showSelect();
                            }
                          }
                        }}
                        onClick={(e: any) => {
                          e.stopPropagation();

                          if (disabled) return;

                          if (ctxValue.isVisible) {
                            ctxValue.hideSelect();
                          } else {
                            ctxValue.showSelect();
                          }

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
                          <span className="block truncate" data-test={dataTest}>
                            {labelWithValue ? labelWithValue : placeholder}
                          </span>
                          <span className="absolute inset-y-0 right-0 u-vertical-center pr-2 pointer-events-none">
                            <FontAwesomeIcon
                              icon={ctxValue.isVisible ? "caret-up" : "caret-down"}
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
              {/* @ts-ignore */}
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
                      // @ts-ignore
                      style={style}
                      ref={ref}
                      className={
                        "overflow-hidden z-50 rounded-lg shadow-lg u-black-ring px-4 pb-2 bg-white " +
                        (popoverWidth ? popoverWidth : "w-72")
                      }
                    >
                      {!noSearch && (
                        <Input
                          autoFocus={false} // set too false to not make page jump on initial open
                          autoComplete="off"
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
                      <div
                        className={`mt-2 mb-2 ${
                          popoverHeight ? popoverHeight : "max-h-52 "
                        } overflow-y-auto`}
                      >
                        {allOptionsSearched.length === 0 && (
                          <div className="pl-2 mt-2">No options</div>
                        )}
                        {optionGroups.map((optionGroup: IOptionGroup) => {
                          if (showAllClicked) {
                            return renderOptionGroup(optionGroup, showAllClicked);
                          } else {
                            return renderOptionGroup(optionGroup);
                          }
                        })}
                      </div>
                      {buttons && (
                        <div className="-ml-1 border-t border-gray-200 pt-1">{buttons}</div>
                      )}
                      {showAllButton && (
                        <div className="-ml-1 border-t border-gray-200 pt-1">
                          <Button.Link
                            disabled={showAllDisabled} // disable button if show all is clicked
                            title="Show all"
                            onClick={() => {
                              setShowAllClicked(true);
                            }}
                          />
                        </div>
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

    // @ts-ignore
    function keyDownListener(e: KeyboardEvent) {
      // does not play well with modal esc
      // if (e.key === "Escape") {
      //   setVisible(false);
      // }
    }

    if (isVisible) {
      window.addEventListener("keydown", keyDownListener);
      document.addEventListener("mousedown", mouseDownListener);
    }

    return () => {
      window.removeEventListener("keydown", keyDownListener);
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
