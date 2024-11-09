import Link from "next/link";

import { Breed } from "../../interfaces";
import Layout from "../../components/Layout";
type Props = {
  items: Breed[];
};

const WithStaticProps = ({ items }: Props) => (
  <Layout title="Breed">
    <h1>There are no breed of that type yet</h1>
    
    <p>You can go back to main page and look for the other one</p>
    <p>
      <Link href="/">Go home</Link>
    </p>
  </Layout>
);


export default WithStaticProps;
