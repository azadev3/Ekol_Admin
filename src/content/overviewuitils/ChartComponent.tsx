import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useRecoilValue } from "recoil";
import { SidebarLinkLengthState } from "../../sidebar/Sidebarr";
import axios from "axios";
import { URL } from "../../Base";

const ChartComponent: React.FC = () => {
  //sidebar link count
  const sidebarLinksLength = useRecoilValue(SidebarLinkLengthState);

  //api count
  const [apiCount, setApiCount] = React.useState<string>("");
  const [collectionLength, setCollectionLength] = React.useState<string>("");
  const getApiCount = async () => {
    try {
      const response = await axios.get(`${URL}/apilength`);
      if (response.data) {
        setApiCount(response.data?.apiLength);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDbCollectionsLength = async () => {
    try {
      const response = await axios.get(`${URL}/collectionlength`);
      if (response.data) {
        setCollectionLength(response.data?.collectionLength);
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getApiCount();
    getDbCollectionsLength();
  }, []);

  const data = [
    {
      name: "Səhifə Sayı",
      PageCount: sidebarLinksLength,
    },
    {
      name: "Endpoint Sayı",
      APILength: apiCount,
    },
    {
      name: "Koleksiyon Sayı",
      DBCollectionLength: collectionLength,
    },
  ];

  return (
    <section className="chart-component">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="basis" dataKey="PageCount" stroke="orange" activeDot={{ r: 10 }} />
          <Line type="basis" dataKey="APILength" stroke="mediumslateblue" activeDot={{ r: 10 }} />
          <Line type="basis" dataKey="DBCollectionLength" stroke="red" activeDot={{ r: 10 }} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default ChartComponent;
