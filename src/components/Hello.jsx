import { useEffect, useState } from "react";
import axios from "axios";

export default function Hello(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:3000/product")
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => console.log(err));
    };
    getData()
  }, []);

  return (
    <div>
      {data.map((item) => {
        return <div>{item.name}</div>;
      })}
    </div>
  );
}
