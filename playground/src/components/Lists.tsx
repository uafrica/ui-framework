import { ListItem, OrderedList, UnorderedList } from "../../../src";

function Lists(){
  return (
    <>
    <OrderedList>
      <ListItem><b>First Item</b></ListItem>
      <ListItem className="mx-2 my-2"><span className="link">Second</span> Item</ListItem>
    </OrderedList>
      
      <UnorderedList>
        <ListItem >First item </ListItem>
        <ListItem><b>Second</b> Item </ListItem>
      </UnorderedList>
    </>
  )
}

export default Lists;