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
                  fetch(
                    `http://localhost:9001/v1/get-single-location/${record.uuid}`
                  )
                    .then((res) => res.json())
                    .then((res: any) => {
                      const { uuid, locationName } = res.data;
                      // setModalValue(locationName);
                      //  setModalID(uuid);
                      //  setModalState(true);
                    });
                  open();
                }}
              >
                <IconEdit />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                component="button"
                color="red"
                onClick={async () => {
                  //   axios
                  //     .delete(
                  //       `http://localhost:9001/v1/delete-location/${record.uuid}`
                  //     )
                  //     .then(() => {
                  //       getAllLocation();
                  //       message.success("Item Deleted !");
                  //     });
                }}
              >
                <IconTrash />
              </ActionIcon>
            </Group>
          </>
        );
      },
    },
  ];

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

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <Divider style={{ paddingTop: 20 }} />
        <Group style={{ padding: 5 }}>
          <TextInput
            label="Add Location"
            placeholder="Location"
            radius={5}
            value={value || modalValue}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
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
