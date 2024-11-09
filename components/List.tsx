import * as React from "react";
import ListItem from "./ListItem";
import { Breed } from "../interfaces";

type Props = {
  items: Breed[];
};

const List = ({ items }: Props) => (
  <ul className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
    {items.map((item) => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
);

export default List;
