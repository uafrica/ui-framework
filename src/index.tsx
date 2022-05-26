import { Message } from "./Message";
import { PageHeading } from "./PageHeading";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./Button";
import { Card } from "./Card";
import { Input } from "./Input";
import { Counter } from "./Counter";
import { NavItem, NavItemDivider } from "./NavItem";
import { Loader } from "./Loader";
import { Tabs } from "./Tabs";
import {
  PageActionsPanel,
  SectionActionsPanel,
  TableActionsPanel,
  FiltersPanel,
  ModalActionsPanel
} from "./Panels";
import { Dropdown } from "./Dropdown";
import { Modal } from "./Modal";
import { Select, GroupedSelect } from "./Select";
import { Checkbox } from "./Checkbox";
import { Radio } from "./Radio";
import { IconWithBackground } from "./IconWithBackground";
import { Textarea } from "./Textarea";
import { InfoButton } from "./InfoButton";
import { InfoPopover } from "./InfoPopover";
import { Table } from "./Table";
import { Confirm } from "./Confirm";
import { Label, LabelWithValue } from "./Label";
import { SavePanel, SavePanelContainer } from "./SavePanel";
import Switch from "./Switch";
import Accordion from "./Accordion";
import ResponsiveRow from "./ResponsiveRow";
import { DatePicker } from "./datePicker/DatePicker";
import CopyText from "./CopyText";
import SkeletonLoader from "./SkeletonLoaders";
import { SavingOverlay } from "./SavingOverlay";
import * as addressUtils from "./utils/addressUtils";
import { useTabs } from "./hooks/useTabs";
import { usePrevious } from "./hooks/usePrevious";
import { useOnClickOutside } from "./hooks/useOnClickOutside";
import { withError } from "./ErrorBoundary/withError";
import "./index.scss";

const DownloadButton = Button.Download;

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

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
