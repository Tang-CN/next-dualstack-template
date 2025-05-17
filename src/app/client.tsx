"use client";
// import { useUserActions } from "@/hooks/useUserActions";
import { useAppRouter } from "@/hooks/useAppRouter";
import { Upload } from "@arco-design/web-react";
import { httpUpload } from "@/utils/http";
import IconNmbrella from "@/assets/icons/pyq.svg";
export default function Home({ InitData }: { InitData: any }) {
  console.log(InitData);
  // const { user, setUser } = useUserActions();
  const { routerPush } = useAppRouter();
  const handleClick = () => {
    console.log(11);
    // setUser({ name: "new user" });
  };
  const handleTOAbout = () => {
    routerPush("/admin/about", { id: 1 });
  };
  return (
    <>
      {/* store 测试 */}
      {/* <div onClick={handleClick}>{user?.name || "no user"}</div> */}

      {/* svg 测试 */}
      <IconNmbrella
        className="text-red-500"
        style={{ width: "50px", height: "50px" }}
      ></IconNmbrella>

      <br />
      {/* arco 组件UI 测试 */}
      <div style={{ width: "50px", height: "50px" }}>
        {/* <Upload action="/" /> */}
        <Upload
          customRequest={async (options) => {
            const { file, onSuccess, onError } = options;
            const res = await httpUpload("http:xxx", file, {}, "image");
            console.log(res);
          }}
        />
      </div>
      <div onClick={handleTOAbout}>点击登录去后台</div>
      <br />
      <div>
        {InitData.map((item: any) => (
          <div key={item.id} onClick={() => console.log(item)}>
            {item.filename}
          </div>
        ))}
      </div>
    </>
  );
}
