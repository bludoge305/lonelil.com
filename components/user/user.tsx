import { Oval, ThreeDots } from "react-loader-spinner";
import Avatar from "./avatar";
import Activities from "./activities";

export default function user({ lonelil }: any) {
  return (
    <div className="flex items-center gap-4">
      {!lonelil.loading ? (
        <Avatar user={lonelil.status} />
      ) : (
        <Oval
          height={56}
          width={56}
          color="#60718f"
          visible={true}
          secondaryColor="#60718f"
        />
      )}
      <div className="flex flex-col">
        <h1 className="text-5xl">lonelil</h1>
        <div>
          {!lonelil.loading ? (
            <Activities user={lonelil.status} />
          ) : (
            <ThreeDots height="48" width="48" color="#60718f" visible={true} />
          )}
        </div>
      </div>
    </div>
  );
}
