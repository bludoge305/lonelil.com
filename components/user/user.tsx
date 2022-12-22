import { Oval } from "react-loader-spinner";
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
          color="#4c3b2d"
          visible={true}
          secondaryColor="#4c3b2d"
        />
      )}
      <div className="flex flex-col">
        <h1 className="text-5xl">lonelil</h1>
        <div>
          {!lonelil.loading ? (
            <Activities user={lonelil.status} />
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
}
