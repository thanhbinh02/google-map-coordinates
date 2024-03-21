import { Card, Descriptions, Form, Input } from "antd";
import "./App.css";
import AddressModal from "./components/address-modal";

function App() {
  const [form] = Form.useForm();

  return (
    <Card title="Card">
      <Form form={form}>
        <Descriptions column={1} bordered labelStyle={{ width: 230 }}>
          <Descriptions.Item label="Address">
            <Form.Item className="mb-3" name="address">
              <Input placeholder="Enter address" />
            </Form.Item>

            <AddressModal />
          </Descriptions.Item>

          <Descriptions.Item label="Coordinates">
            <Form.Item className="mb-0" name="coordinates">
              <Input placeholder="Enter coordinates" />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>
      </Form>
    </Card>
  );
}

export default App;
