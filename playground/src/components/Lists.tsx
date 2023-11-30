import { ListItem, OrderedList, UnorderedList } from "../../../src";

function Lists(){
  return (
    <>
    <OrderedList>
      <ListItem value="First item" />
      <ListItem className="mx-2 my-2" value="Second item" />
    </OrderedList>
      
      <UnorderedList>
        <ListItem value="First item" />
        <ListItem value="Second item" />
      </UnorderedList>
    </>
  )
}

export default Lists;