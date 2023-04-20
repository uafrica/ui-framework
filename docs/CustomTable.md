## Custom Table

**Basic example:**
```
<CustomTable
	id="unique_table_id"
	scrollableX
	rowUniqueIdentifier="id"
	pageSize={20}
	columns={[
		{
			header:  "Column 1",
			id:  "column_1",
			accessor:  "column_1",
			cell: (row: {
				index: Number;
				original: any; // full row object
				removeRow: Function;
				updateRow: Function;
			}) => {
				return  <div>Some stuff</div>;
			},
		},
		{
			header:  "Column 2",
			id:  "column_2",
			accessor:  "column_2",
			cell: (row: {
				index: Number;
				original: any; // full row object
				removeRow: Function;
				updateRow: Function;
			}) => {
				return  <div>Some stuff</div>;
			},
		},
		{
			header:  "Column 3",
			id:  "column_3",
			accessor:  "column_3",
			cell: (row: {
				index: Number;
				original: any; // full row object
				removeRow: Function;
				updateRow: Function;
			}) => {
				return  <div>Some stuff</div>;
			},
		},
	]}
	fetchFunction={async (args: {
		offset: number;
		limit: number;
		order?: string;
		order_by?: string;
	}) => {
		let  result = await  utils.signedRequest(store, "/some-endpoint", "GET", args, {});
		return {
			data:  result?.data?.some_data ?? [],
			count:  result?.data?.count ?? 0,
			error:  generalUtils.getError(result?.error),
		};
	}}
	onRowClicked={(row: {
		index: number;
		original: any; // full row object
		updateRow: Function;
		removeRow: Function;
	}) => {
		// do stuff with the row eg. open modal
	}}
/>
```

**Properties:**

**id** :string
Unique identifier for the table.
```id="unique_table_id"```

**columns** :any[]
Array containing setup for table columns.

    columns={[
		{
			header:  "Column 1", // string or Function returning jsx
			id:  "column_1",
			accessor:  "column_1", // object property to be displayed
			cell: (row: {
				index: Number;
				original: any; // full row object
				removeRow: Function;
				updateRow: Function;
			}) => {
				return  <div>Some stuff</div>;
			}, // used if any other formatting is required instead of displaying object property with accessor
			width: 200, // optional,
			draggable: true, // optional boolean
			sortable: true, // optional boolean
			resizable: true // optional boolean
		}
	]}
	
**columnOrder**?: string[] 
Array of column string identifiers ordered in the same order as the columns will be displayed.
```columnOrder={["column_1", "column_2", "column_3"]}```

**columnWidths**?: { id: string; value?: number }[]
Array consisting of objects with width value per column id.
```columnWidths={[{id: "column_1", value: 100}, {id: "column_2", value: 200}, {id: "column_3", value: 300},]}```

**pageSize**?: number 
The page size for the table.
```pageSize={20}```

**fetchFunction**: Function 
Async function that returns {data: array of data to be displayed, count: the total count of all applicable data, error: any error generated while obtaining the data}.
```
	fetchFunction={async (args: {
		offset: number;
		limit: number;
		order?: string;
		order_by?: string;
	}) => {
		let  result = await  utils.signedRequest(store, "/some-endpoint", "GET", args, {});
		return {
			data:  result?.data?.some_data ?? [],
			count:  result?.data?.count ?? 0,
			error:  generalUtils.getError(result?.error),
		};
	}}
```

**fetchFunctionArguments**?: any
 State object containing filter criteria that gets passed to the fetchFunction. Any change in fetchFunctionArguments triggers the table to be loaded again.
```
setArgs({search: "Some text"})

fetchFunctionArguments={args}
```

**draggableRows**?: boolean
Set to true to allow row reorder.
```draggableRows={true}```

**rowUniqueIdentifier**?: string
Unique identifier property for rows. Defaults to "id".
```rowUniqueIdentifier="id"```

**onPageSizeChanged**?: Function
Triggers whenever the page size is changed.
```
onPageSizeChanged={(pageSize: number)=>{
	// do stuff with new pageSize
}}
```

**onRowClicked**?: Function 
Triggers whenever a row is clicked.
```
	onRowClicked={(row: {
		index: number;
		original: any; // full row object
		updateRow: Function;
		removeRow: Function;
	}) => {
		// do stuff with the row eg. open modal
	}}
```
**onSelectionChanged**?: Function
Triggers whenever the selection of rows changes.
```
onSelectionChanged={(selectedRows: any[])=>{
	// do stuff with selected rows
}}
```

**onColumnOrderChanged**?: Function
Triggers whenever columns are reordered.
```
onColumnOrderChanged={(columnOrder: string[])=>{
	// do stuff with column order
}}
```

**onRowOrderChanged**?: Function
Triggers whenever rows are reordered.
```
onRowOrderChanged={(rowOrder: string[])=>{
	// do stuff with row order
}}
```

**onColumnWidthsChanged**?: Function
Triggers whenever a column is resized.
```
onColumnWidthsChanged={(widths: {id: string, value: number}[])=>{
	// do stuff with new widths
}}
```

**onDataChanged**?: Function
Triggers whenever the data changes.
```
onDataChanged={(data: any[])=>{
	// do stuff with changed data eg. overall validation
}}
```

**noPagination**?: boolean
Set to hide pagination.
```noPagination```

**scrollableX**?: boolean
Set to make table horizontally scrollable (useful when table consists of a large number of columns or the columns are very wide).
```scrollableX```

**contextMenuItems**?: Function
Should return a list of menu item components to show when right clicking on a row.
```
contextMenuItems={(row: {
				index: Number;
				original: any; // full row object
				removeRow: Function;
				updateRow: Function;
			}) => {
	return [
		<Dropdown.MenuItem
			key="delete"
			title="Delete"
			icon="trash"
			onClick={() => {
				// do stuff
				
			}}
		/>
	];
}}
```

**contextMenuHeader**?: Function
Returns a header for the context menu.
```
contextMenuHeader={(row: {
				index: Number;
				original: any; // full row object
				removeRow: Function;
				updateRow: Function;
			}) => {
	return  `Row id ${row.original.id}`;
}}
```

**autoRefreshInterval**?: number
The table automatically refreshes on this interval (defined in milliseconds).
```autoRefreshInterval={5000} // refresh every 5 seconds```

**renderTableActionsHeader**?: Function
Function that returns a header to be displayed at the top left of the table.
```
renderTableActionsHeader={(data: any[], totalPages: number, page: number, pageSize: number, isLoading: boolean) => {
	return  tableUtils.getTableCountDivWithDateRangeIndication("shipments", data, { pageSize }, totalPages, page - 1, isLoading, undefined);
}}
```

**renderTableActionsChildren**?: Function
Function that returns jsx to be displayed at the top right of the table.
```
renderTableActionsChildren={() => {
	return (<Button.Primary
		onClick={() => {
			// do something
			}}
		icon="plus"
		title="Add row"
		/>
	);
}}
```

**setTableFunctions**?: Function;
Returns table helper functions.
```
setTableFunctions={(f: {insertRow: Function, refresh: Function})=>{
	// set functions in state variable
}}
```

**noDataText**?: string
Text to display when no rows are returned. Defaults to "No data"
```
noDataText="No data to disaplay on this table"
```

**persistPage**?: boolean
Determines whether or not to maintain the current pagination state upon updating or deleting data.
```persistPage={true}```

**loadOnPageChange**?: boolean;
Determines whether or not to display a loading indicator while waiting for the endpoint to return response data upon paginating through the page
```
loadOnPageChange={true}
```

**rowOrderIcon**?: IconProp
Specifies the icon to be used for dragging rows, selected from the font-awesome library.
```
rowOrderIcon={"arrow-up"}
```
