"use client";
import { useEffect, useState } from "react";
import { http, httpGet } from "@/utils/http";
import { useUserActions } from "@/hooks/useUserActions";
import { Button } from "@arco-design/web-react";
import "@arco-design/web-react/dist/css/arco.css";
import styles from "./page.module.scss";
import { useQueryParams } from "@/hooks/useAppRouter";

// export const generateMetadata = async () => {
//   return mergeMetadata({
//     title: "about",
//   });
// };
export default function Page() {
  const { id } = useQueryParams<{ id: string }>();
  console.log(id);
  const { user } = useUserActions();
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await httpGet<any>("http://127.0.0.1:4523/m1/6334071-6029501-default/user");
      setList(res.data?.list || []);
    };
    fetchData();
  }, []);

  const handItem = (item: any) => () => {
    console.log("点击了", item);
  };

  return (
    <>
      <div className={styles.name}>about{user?.name}</div>
      <Button type="primary">Primary Button</Button>
      <div>
        {list.map((item) => (
          <div key={item.id} onClick={handItem(item)}>
            {item.name}
          </div>
        ))}
      </div>
      {/* <style jsx>
        `
        div{
          color: red;
        }
        `
      </style> */}
    </>
  );
}

// export const getServerSideProps = async () => {
//   const res = await axios.get("http://127.0.0.1:4523/m1/6334071-6029501-default/user");
//   const users = res.data?.data?.list || [];

//   return {
//     props: {
//       users,
//     },
//   };
// };
