import * as addressUtils from "./utils/addressUtils";
import Accordion from "./Accordion";
import CopyText from "./CopyText";
import ResponsiveRow from "./ResponsiveRow";
import SkeletonLoader from "./SkeletonLoaders";
import Switch from "./Switch";
import { Button } from "./Button";
import { Card } from "./Card";
import { Checkbox } from "./Checkbox";
import { Confirm } from "./Confirm";
import { Counter } from "./Counter";
import { DatePicker } from "./datePicker/DatePicker";
import { DateRange } from "./DateRange";
import { Dropdown } from "./Dropdown";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  FiltersPanel,
  ModalActionsPanel,
  PageActionsPanel,
  SectionActionsPanel,
  TableActionsPanel
} from "./Panels";
import { GroupedSelect, Select } from "./Select";
import { IconWithBackground } from "./IconWithBackground";
import { InfoButton } from "./InfoButton";
import { InfoPopover } from "./InfoPopover";
import { Input } from "./Input";
import { Label, LabelWithValue } from "./Label";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Loader } from "./Loader";
import { Message } from "./Message";
import { Modal } from "./Modal";
import { NavItem, NavItemDivider } from "./NavItem";
import { PageHeading } from "./PageHeading";
import { Radio } from "./Radio";
import { SavePanel, SavePanelContainer } from "./SavePanel";
import { SavingOverlay } from "./SavingOverlay";
import { SectionHeading } from "./SectionHeading";
import { Table } from "./Table";
import { Tabs } from "./Tabs";
import { Textarea } from "./Textarea";
import { useOnClickOutside } from "./hooks/useOnClickOutside";
import { usePrevious } from "./hooks/usePrevious";
import { useTabs } from "./hooks/useTabs";
import { withError } from "./ErrorBoundary/withError";
import "./index.scss";

const DownloadButton = Button.Download;

library.add(fas);

export {
  SkeletonLoader,
  SavingOverlay,
  Message,
  PageHeading,
  CopyText,
  SectionHeading,
  Button,
  Card,
  DatePicker,
  Input,
  Counter,
  Modal,
  Confirm,
  Select,
  NavItem,
  NavItemDivider,
  Loader,
  Tabs,
  PageActionsPanel,
  ModalActionsPanel,
  SectionActionsPanel,
  DownloadButton,
  DateRange,
  Dropdown,
  Label,
  Checkbox,
  Radio,
  InfoButton,
  InfoPopover,
  Textarea,
  Table,
  SavePanel,
  Switch,
  TableActionsPanel,
  FiltersPanel,
  Accordion,
  ResponsiveRow,
  GroupedSelect,
  LabelWithValue,
  SavePanelContainer,
  IconWithBackground,
  addressUtils,
  useTabs,
  usePrevious,
  useOnClickOutside,
  withError
};
