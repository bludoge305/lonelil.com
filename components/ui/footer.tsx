import { Oval } from "react-loader-spinner";
import Avatar from "../user/avatar";

export default function Footer({ lonelil }: any) {
  return (
    <footer className="footer hidden items-center bg-neutral p-12 text-neutral-content md:flex">
      <div className="grid-flow-col items-center">
        {!lonelil.loading ? (
          <Avatar user={lonelil.status} footer={true} />
        ) : (
          <Oval
            height={36}
            width={36}
            color="#4c3b2d"
            visible={true}
            secondaryColor="#4c3b2d"
          />
        )}

        <p>lonelil</p>
      </div>
    </footer>
  );
}
