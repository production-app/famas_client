import React from "react";

const GetLocationName = async (record: any) => {
  try {
    const res = await fetch(`http://localhost:5600/v1/location/${record}`);
    const res_1 = await res.json();
    //console.log(res_1?.data.name);
    return res_1?.data.id;
  } catch (error) {}
};

export default GetLocationName;
