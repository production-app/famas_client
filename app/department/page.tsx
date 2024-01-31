"use client";
import DashboardLayout from "@/components/Layouts/DashboardLayout/DashboardLayout";
import {
  ActionIcon,
  Button,
  Container,
  Group,
  Space,
  Modal,
  Text,
  Divider,
  TextInput,
  Paper,
  PasswordInput,
  Checkbox,
  Anchor,
  NativeSelect,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Popconfirm, Table, message } from "antd";
import React, { useState } from "react";
import GetLocationName from "@/components/lib/GetLocationName";
import axios from "axios";
import _ from "lodash";
import "./department.scss";

let originData: any;
let location: any;

//console.log(GetLocationName(1));

const page = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [locationValue, setLocationValue] = useState("");
  const [department, setDepartment] = useState("");
  const [floor, setFloor] = useState("");
  const [locationpicked, setLocationPicked] = useState("");

  const columns = [
    {
      title: "S/N",
      dataIndex: "id",
      key: "id",
      // render: (value: any, item: any, index: any) =>
      //   index === 0 ? index + 1 : index + 1,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      // width: 700,
    },
    {
      title: "Floor",
      dataIndex: "FLOOR",
      key: "FLOOR",
      // width: 700,
    },
    {
      title: "Location",
      dataIndex: "LocationName",
      key: "LocationName",
      //dataIndex: "LocationID",
      //key: "LocationID",
      // width: 700,
      // render: (index: any, record: any) => {
      //   // //  console.log(record.LocationID);

      //   // let filter;

      //   // const fetchData = fetch("http://localhost:5600/v1/location")
      //   //   .then((res) => res.json())
      //   //   .then((res) => {
      //   //     // _.filter(res.data, function (o) {
      //   //     //   console.log(o.id !== record.LocationID);
      //   //     // });
      //   //   });

      //   // return <>{record.LocationID}</>;
      // },
    },
    {
      title: "Action(s)",
      dataIndex: "id",
      key: "id",
      render: (items: any, record: any) => {
        // console.log(record.);
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

  const {
    data: departmentData,
    isLoading,
    refetch,
  } = useQuery(["fetch_2"], async () => {
    originData = [];
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/department`);
      const res_1 = await res.json();
      //setLoading(true);
      originData = [];
      res_1.data.forEach(
        ({ name, FLOOR, id, LocationID, LocationName }: any, index: any) => {
          //console.log(value);
          originData.push({
            department: name,
            FLOOR,
            id,
            key: id,
            LocationID,
            LocationName,
          });
        }
      );
      //setDataSource(originData);
      return originData;
    } catch (error) {
      return error;
    }
  });

  const { data: locationData } = useQuery(["fetch_3"], async () => {
    location = [];
    let loc = [{ label: "--- Select Location", value: "", disabled: true }];
    try {
      const res = await fetch(`http://localhost:5600/v1/location`);
      const res_1 = await res.json();
      //setLoading(true);
      location = [...loc];
      const defaultValue: any = { label: "", value: "" };
      res_1.data.forEach(({ id, name }: any, index: any) => {
        // console.log(name);

        location.push({
          value: id,
          label: name,
          id: id,
        });
      });
      //setDataSource(originData);
      return location;
    } finally {
    }
  });

  const confirmAdd = async (e: any) => {
    // message.success("Click on Yes");
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_PATH}/department`, {
        department,
        floor,
        locationpicked,
      })
      .then(async () => {
        close(), refetch();
        message.success("Successfully Added!");
        setDepartment("");
        setFloor("");
        setLocationPicked("");
        ///update-location/
      })
      .catch((err) => {
        message.error("Please try again !", err);
      });
  };

  return (
    <>
      <Modal opened={opened} onClose={close}>
        {/* <Group style={{ padding: 5 }}>
          <TextInput
            label="Add Location"
            placeholder="Location"
            radius={5}
            // value={value || modalValue}
            // onChange={(event) => setValue(event.currentTarget.value)}
          />
          <Popconfirm
            title="Would you like to submit?"
            description="The operation will be completed once confirmed."
            // onConfirm={confirm}
            // onConfirm={confirmAdd}
            //onCancel={null}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ marginBottom: -23 }}>Submit</Button>
          </Popconfirm>
        </Group> */}
        <Paper withBorder shadow="md" p={30} mt={5} radius="md">
          <TextInput
            label="Department"
            placeholder="Human Resource"
            style={{ paddingTop: 10 }}
            required
            value={department}
            onChange={(event) => setDepartment(event.currentTarget.value)}
          />
          <TextInput
            label="Floor"
            placeholder="Ground Floor"
            required
            value={floor}
            style={{ paddingTop: 10 }}
            onChange={(event) => setFloor(event.currentTarget.value)}
          />
          <NativeSelect
            radius="md"
            label="Location"
            withAsterisk
            description="Select the location"
            data={locationData}
            value={locationpicked}
            onChange={(event) => setLocationPicked(event.currentTarget.value)}
            style={{ paddingTop: 10 }}
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
            <Button fullWidth mt="xl">
              Submit
            </Button>
          </Popconfirm>
        </Paper>
      </Modal>

      <DashboardLayout>
        <Container>
          <div style={{ marginTop: 40 }}>
            <div style={{ display: "flex" }}>
              <Space w="850" mt={50} />
              <Button onClick={open}>Add</Button>
            </div>
            <Table
              className=""
              columns={columns}
              bordered
              dataSource={departmentData}
              loading={isLoading}
            />
          </div>
        </Container>
      </DashboardLayout>
    </>
  );
};

export default page;
