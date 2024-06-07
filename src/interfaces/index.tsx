import { IGenericRole } from "./generic/genericRole.interface";
import { IGenericUser } from "./generic/genericUser.interface";
import { IMarker } from "./map/marker.interface";
import { IOpenStreetMapMarker } from "./map/openStreetMapMarker.interface";
import { INavItem } from "./navitem.interface";
import { IPolygon } from "./map/polygon.interface";
import { IPolyline } from "./map/polyline.interface";
import { ICircle } from "./map/circle.interface";
import { ICountry } from "./country.interface";
import { IAdvancedFilterSection } from "./advancedFilter/advancedFilterSection.interface";
import { IAdvancedFilterFunctions } from "./advancedFilter/advancedFilterFunctions.interface";
import { IFilterSection } from "./advancedFilter/filterSection.interface";
import { IFilter } from "./advancedFilter/filter.interface";
import { IColumn } from "./../customTable/column.interface";
import { IRow } from "./../customTable/row.interface";

export type {
  IGenericRole,
  IGenericUser,
  IMarker,
  IOpenStreetMapMarker,
  INavItem,
  IPolygon,
  IPolyline,
  ICircle,
  ICountry,
  IColumn,
  IRow,
  IAdvancedFilterSection,
  IAdvancedFilterFunctions,
  IFilterSection,
  IFilter,
};
