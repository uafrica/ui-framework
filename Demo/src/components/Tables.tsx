import { SectionHeading, Table } from "../../../src";

function Tables() {
  return (
    <div>
      <SectionHeading>First tablee</SectionHeading>
      <Table.Table>
        <Table.Head tableHeadColor={"bg-primary-100"}>
          <Table.Row>
            <Table.HeadCol headColClass={"text-right"}>Col one</Table.HeadCol>
            <Table.HeadCol>Col two</Table.HeadCol>
            <Table.HeadCol>Col three</Table.HeadCol>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Col colClass={"text-right"}>Row one col one</Table.Col>
            <Table.Col>Row one col two</Table.Col>
            <Table.Col>Row one col three</Table.Col>
          </Table.Row>
          <Table.Row>
            <Table.Col>Row two col one</Table.Col>
            <Table.Col>Row two col two</Table.Col>
            <Table.Col>Row two col three</Table.Col>
          </Table.Row>
        </Table.Body>
      </Table.Table>
      <SectionHeading>Second table</SectionHeading>
      <Table.Table>
        <Table.Head>
          <Table.Row>
            <Table.HeadCol>Col one</Table.HeadCol>
            <Table.HeadCol>Col two</Table.HeadCol>
            <Table.HeadCol>Col three</Table.HeadCol>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Col>Row one col one</Table.Col>
            <Table.Col>Row one col two</Table.Col>
            <Table.Col>Row one col three</Table.Col>
          </Table.Row>
          <Table.Row>
            <Table.Col>Row two col one</Table.Col>
            <Table.Col>Row two col two</Table.Col>
            <Table.Col>Row two col three</Table.Col>
          </Table.Row>
        </Table.Body>
      </Table.Table>
    </div>
  );
}

export default Tables;
