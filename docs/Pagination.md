In order to use the pagination component it can be used with or 
without the`useGetPagination` hook. 

Consider the pagination component's interface:

```
interface IProps {
  handler: Function;
  active: number;
  pages: number;
  setActive: Function;
  isLoading?: boolean;
  setRows?: Function;
  rows?: number;
  scrollRef?: any;
}
```

### Handler (required)

To be actions when there is a page change. I.e. what should happen after the user 
clicks next or previous.

Lets take an example where the url should change to indicate the page the user is
currently on:

```const handlePageChange = (val: any) => {
    setActive(val);
    let queryParams = new URLSearchParams(location.search);
    queryParams.set("page", val);

    history.push({
      pathname: location.pathname,
      search: queryParams.toString()
    });
      makeApiCall(filters, val);
  };
  ```
In the above case the `val` (page) is passed to the `makeApiCall()` and used for pagination.
Th pagination component will be returned with the new page value passed in through it

### Active (required)

Active is the active page of the pagination component

### setActive (required)

sets the active page in the pagination component in the event of paginating

### isLoading

The loading state of the apiCall.

### Rows and setRows

The length of the data and changing the length of the data (usually used in conjunction with a table component)
If both fields are present, a dropdown will render with `["5", "10", "20", "25", "50", "100"]` options available

### Scroll ref

A Reference passed through that will be used to scroll the top of the page into view if required.
Simply add a ref to a component at the top of the page to ensure that the window scrolls into 
view after paginating

