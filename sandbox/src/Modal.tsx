import { Modal, Form, Select, Button } from "antd";
import { useState } from "react";

interface IProps {
  openModal: boolean;
  setOpenModal: any;
  dataSource: any;
  setDataSource: any;
}
const ProjectAddModal = ({
  openModal,
  setOpenModal,
  dataSource,
  setDataSource,
}: IProps) => {
  const [projectType, setProjectType] = useState(null);

  const handleSubmit = (values: any) => {
    setDataSource([...dataSource, values]);
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleProjectTypeChange = (value: any) => {
    setProjectType(value);
  };

  return (
    <>
      <Modal
        title="Add New Project"
        open={openModal}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item label="Project Name" name="projectName">
            <Select
              placeholder="Choose Project Name"
              options={[
                { value: 1, label: "Project with LC Code" },
                { value: 2, label: "Project without LC Code" },
              ]}
              popupMatchSelectWidth={true} // Set this prop to false
              onChange={handleProjectTypeChange}
            />
          </Form.Item>
          {projectType === 1 && (
            <Form.Item label="LC Code" name="lcCode">
              <Select
                placeholder="Choose LC Code"
                options={[
                  { value: "HR", label: "HR" },
                  { value: "Mid Employee", label: "Mid Employee" },
                ]}
                popupMatchSelectWidth={true} // Set this prop to false
              />
            </Form.Item>
          )}
          <Form.Item label="PayCode" name="payCode">
            <Select
              placeholder="Select PayCode"
              options={[
                { value: "Bonus", label: "Bonus" },
                { value: "Regular", label: "Regular" },
              ]}
              popupMatchSelectWidth={true} // Set this prop to false
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Add Project{" "}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectAddModal;
