import axios from "axios";
import React, { useState, useEffect } from "react";

export const Userlisting = () => {
  const [data, setData] = useState([]);

  const students = async () => {
    const res = await axios.get("http://localhost:3030/api/v1/student/getall");
    const rdata = res.data.data;
    setData(rdata);
    console.log(rdata);
  };

  useEffect(() => {
    students();
  }, []);

  return (
    <div className="userlist-page">
      <div className="container">List</div>
      {data?.map((item) => {
        return <h1 key={item.id}>{item.name}</h1>;
      })}
    </div>
  );
};
