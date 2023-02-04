import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { LanyardData } from "react-use-lanyard";
import { Oval } from "react-loader-spinner";
export default function Battery({
  loading,
  status,
}: {
  loading: boolean;
  status: LanyardData;
}) {
  return (
    <div className="col-span-3 flex h-52 items-center justify-center rounded-2xl bg-[#49d663] text-4xl text-black md:col-span-2">
      {!loading ? (
        <>
          <HiOutlineDevicePhoneMobile />{" "}
          {JSON.parse(`${status?.kv?.battery}`).battery}%
        </>
      ) : (
        <Oval
          height={80}
          width={80}
          color="black"
          visible={true}
          secondaryColor="black"
        />
      )}
    </div>
  );
}
