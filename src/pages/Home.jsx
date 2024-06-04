import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";
const { Meta } = Card;

export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("http://localhost:3000/auth/accounts")
        .then((res) => {
          console.log("DATA: ", res.data);
          setData(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  return data.map((item) => {
    return (
      <Card
        hoverable
        style={{
          width: 240,
        }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title={item.username} description="www.instagram.com" />
      </Card>
    );
  });
}
