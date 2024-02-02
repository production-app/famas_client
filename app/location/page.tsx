"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/Layouts/DashboardLayout/DashboardLayout";
import { Popconfirm, Table, message } from "antd";
import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Group,
  Modal,
  Space,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

let originData: any;
const page: React.FC = () => {
  // const [dataSource, setDataSource] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState("");
  const [modalValue, setModalValue] = useState("");
  const [modalID, setModalID] = useState("");
  const [modalState, setModalState] = useState(false);

  const { data, isLoading, refetch } = useQuery(["fetch"], async () => {
    originData = [];
    try {
      const res = await fetch(`http://localhost:5600/v1/location`);
      const res_1 = await res.json();
      //setLoading(true);
      originData = [];
      res_1.data.forEach(({ id, name }: any, index: any) => {
        // console.log(name);
        originData.push({
          locationName: name,
          id: id,
        });
      });
      //setDataSource(originData);
      return originData;
    } finally {
    }
  });

  const confirmDelete = async (id: any) => {
    console.log(id);
    await axios.delete(`http://localhost:5600/v1/location/${id}`).then(() => {
      // getAllLocation();
      refetch();
      message.success("Item Deleted !");
    });
  };

  const columns = [
    {
      title: "S/N",
      dataIndex: "id",
      key: "id",
      // width: 700,
      render: (value: any, item: any, index: any) =>
        index === 0 ? index + 1 : index + 1,
    },
    {
      title: "Label",
      dataIndex: "locationName",
      key: "locationName",
      // width: 700,
    },
    {
      title: "Action(s)",
      dataIndex: "id",
      key: "id",
      render: (items: any, record: any) => {
        // console.log(record.locationName);
        return (
          <>
            <Group>
              <ActionIcon
                variant="subtle"
                component="button"
                color="lime"
                onClick={async () => {
                  fetch(`http://localhost:5600/v1/location/${record.id}`)
                    .then((res) => res.json())
                    .then((res: any) => {
                      console.log(res.data);
                      const { id, name } = res.data;
                      setModalValue(name);
                      setModalID(id);
                      setModalState(true);
                    });
                  open();
                }}
              >
                <IconEdit />
              </ActionIcon>
              <Popconfirm
                title="Would you like to delete?"
                description="The operation will be completed once clicked."
                onConfirm={() => confirmDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <ActionIcon variant="subtle" component="button" color="red">
                  <IconTrash />
                </ActionIcon>
              </Popconfirm>
            </Group>
          </>
        );
      },
    },
  ];

  const confirmAdd = async (e: any) => {
    // message.success("Click on Yes");
    await axios
      .post("http://localhost:5600/v1/location", {
        value: value,
      })
      .then(async () => {
        close(), refetch();
        message.success("Successfully Added!");
        setValue("");
        ///update-location/
      });
  };

  const confirmPut = async () => {
    await axios
      .put(`http://localhost:5600/v1/location/${modalID}`, {
        name: modalValue,
      })
      .then(async () => {
        message.success("Successfully Updated!");
        close(),
          //getAllLocation(),
          setModalValue("");
        ///update-location/

        refetch();
        setModalState(false);
      });
  };

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Divider style={{ paddingTop: 20 }} />
        <Group style={{ padding: 5 }}>
          {!modalState ? (
            <TextInput
              label="Add Location"
              placeholder="Location"
              radius={5}
              value={value || modalValue}
              onChange={(event) => setValue(event.currentTarget.value)}
            />
          ) : (
            <TextInput
              label="Add Location"
              placeholder="Location"
              radius={5}
              value={modalValue}
              onChange={(event) => setModalValue(event.currentTarget.value)}
            />
          )}

          {!modalValue ? (
            <Popconfirm
              title="Would you like to submit?"
              description="The operation will be completed once confirmed."
              // onConfirm={confirm}
              onConfirm={confirmAdd}
              //onCancel={null}
              okText="Yes"
              cancelText="No"
            >
              <Button style={{ marginBottom: -23 }}>Submit</Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Would you like to update?"
              description="The operation will be completed once confirmed."
              // onConfirm={confirm}
              onConfirm={confirmPut}
              //onCancel={null}
              okText="Yes"
              cancelText="No"
            >
              <Button style={{ marginBottom: -23 }} color="lime">
                Update
              </Button>
            </Popconfirm>
          )}
        </Group>
      </Modal>
      <DashboardLayout>
        <Container>
          <div style={{ marginTop: 40 }}>
            <div style={{ display: "flex" }}>
              <Space w="850" mt={50} />
              <Button onClick={open}>Add</Button>
            </div>
            <Table
              columns={columns}
              bordered
              dataSource={data}
              loading={isLoading}
            />
          </div>
        </Container>
      </DashboardLayout>
    </>
  );
};

export default page;
