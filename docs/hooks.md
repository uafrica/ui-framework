## Hooks

___________
`useLocationState` is a React hook that returns the current location state and a function to update it.

**Basic example:**

In a component pass a state with the router:
```
history.push({
  pathname: "/some-path",
    state: {
        channel_id: 1,
        user_id: 2,
    },
})
```

```
const locationState: { channel_id: number; user_id: number } = useLocationState();

console.log(locationState.channel_id); // 1
console.log(locationState.user_id); // 2
```

___________
`useDebounce` is a React hook that returns a debounced version of a function.

**Basic example:**

```
import { ChangeEvent, useEffect, useState } from 'react'

import { useDebounce } from 'usehooks-ts'

export default function Component() {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  // Fetch API (optional)
  useEffect(() => {
    // Do fetch here...
    // Triggers when "debouncedValue" changes
  }, [debouncedValue])

  return (
    <div>
      <p>Value real-time: {value}</p>
      <p>Debounced value: {debouncedValue}</p>

      <input type="text" value={value} onChange={handleChange} />
    </div>
  )
}
```

___________
`useFilter` is a custom React hook that returns the filters used on a page

**Basic example:**

```
let defaultFilters = {
  limit: 10,
  offset: 0
};

const { filters, setFilters, handleFilterChange } = useFilters({
    defaultFilters: defaultFilters,
    // This is a callback that fires when the filters change
    filtersChangeCallback: async (filters: any) => {
      await somePromiseFunction({
        stuff: stuffId,
        ...filters
      });
    },
    overrideDefaultFilters: false
  });
```

Arguments returned from hook:

filters: The filter object
setFilters: If you want to set the filters in the component
handleFilterChange: If you want to use the default filter change handler
advancedFiltersChecked: If you want to know if the advanced filters are checked
setAdvancedFiltersChecked: If you want to set the advanced filters checked state

_________
`useSignedRequest` is a React hook that returns a function to make signed requests.

**Basic example:**

```
const { isLoading, makeRequest: getProducts } = useSignedRequest({
    url: "/sync/products",
    method: "GET",
    signedRequest: utils.signedRequest,
    fetchOnInit: true,
    data: {
      channel_id: locationState?.channel_id,
      user_id: locationState?.user_id
    },
    initialLoadingState: true,
    onSuccess: (data: { count: number; whatever: IWhatever[] }) => {
      // do on success
    },
    // will always return as a string
    onError: (error: string) => {
        // do on error
    }
  });
```

The above will make a getProducts on mount and will return the data in the onSuccess callback. The params has to be added a an
object to the data key.


Another way to use it is to call the function manually:

```
const {responseData, errorData}: {responseData: { count: number; whatever: IWhatever[] }, error: string} = await getProducts({
      channel_id: locationState?.channel_id,
      user_id: locationState?.user_id
    })
    
    // do whatever you want with the response data or error
```