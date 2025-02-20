import TabComponent from '../components/TabComponent';
import { cookies } from 'next/headers';
import { verifyTokenSSR } from '../utils/jwt';
import { revalidatePath } from 'next/cache';

async function getData() {
  try {
    const baseUrl =
      process.env.NODE_ENV == 'development'
        ? (process.env.DEV_URL as string)
        : (process.env.PROD_URL as string);

    const response = await fetch(baseUrl + 'api/team', {});

    revalidatePath('/dashboard');

    return response.json();
  } catch (error: unknown) {
    console.log('err: ', error.msg);
    console.log('err: ', typeof error);
  }
}

async function Dashboard() {
  const data = await getData();

  const userToken = cookies().get('jwt')?.value as string;

  const tokenData = await verifyTokenSSR(userToken);

  return (
    <div>
      <section>
        <div className="flex justify-center">
          <div className="flex items-center justify-between mt-2 py-2 px-6 bg-slate-200 w-[85%] rounded-t-xl">
            <div className=" flex justify-around items-center">
              <div className=" h-10 w-10 bg-slate-300 rounded-[50%] mx-2"></div>
              <div className=" ">
                <h1 className="capitalize">
                  {tokenData ? tokenData?.name : 'Mark'}
                </h1>
                <h2 className="capitalize">
                  {tokenData ? tokenData?.role : 'Supervisor'}
                </h2>
              </div>
            </div>
            <div className="">
              <button className="w-28 text-white h-8 rounded-2xl bg-slate-500">
                Punch out
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className=" my-0">
        <div className=" flex justify-center">
          <div className=" flex items-center justify-around bg-orange-200 h-64 w-[85%]">
            <h1 className="text-3xl lg:text-6xl">
              <span className="text-red-700">RED</span>
              TAG
            </h1>
            <div className=" w-[1px] h-20 bg-black"></div>
            <div className="flex p-2 text-center">
              <p className=" text-5xl mx-1">Team</p>
              <p className=" text-5xl mx-1 font-light">Sahara</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col items-center justify-center">
          <TabComponent teamData={data.members} filterName={tokenData.name} />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
