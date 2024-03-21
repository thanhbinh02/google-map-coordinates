import { Button, Modal } from "antd";
import { useToggle } from "usehooks-ts";
import PickAddress from "./pick-address";

const AddressModal = () => {
  const [openModal, toggleOpenModal] = useToggle(false);

  return (
    <>
      <Button type="primary" onClick={toggleOpenModal} className="w-[200px]">
        Select location on the map
      </Button>

      <Modal
        title="Map"
        open={openModal}
        onCancel={toggleOpenModal}
        width={1500}
        footer={false}
      >
        <PickAddress toggleOpenModal={toggleOpenModal} />
      </Modal>
    </>
  );
};

export default AddressModal;
