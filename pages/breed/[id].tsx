import { GetStaticProps, GetStaticPaths } from "next";

import { Breed } from "../../interfaces";
import Layout from "../../components/Layout";
import ListDetail from "../../components/ListDetail";
import { getCatDetails, getDogDetails } from "../../uitls/fetchHandlers";
import Link from "next/link";

type Props = {
  item?: Breed;
  errors?: string;
};

const StaticPropsDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error...">
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${
        item ? item.name : "User Detail"
      } Breed`}
    >
      <div className="container mx-auto my-10">
        <Link href="/" className="rounded-full bg-gray-50 px-5 py-3 font-medium text-gray hover:shadow-xl" >◀ Back to list</Link>
        {item && <ListDetail item={item} />}
      </div>
    </Layout>
  );
};

export default StaticPropsDetail;

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

  return {
      paths: [], 
      fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    if(typeof id !== "string"){
      throw new Error("Bad input data")
    }
    const isCat = isNaN(parseInt(id))//true if its NaN
    const item = isCat ? await getCatDetails({id}) :  await getDogDetails({id})
    return { props: { item } };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
