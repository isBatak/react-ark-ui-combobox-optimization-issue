import React, { useEffect, useState } from "react";
import { Table } from "~/components/ui/table";
import { Text } from "~/components/ui/text";

const generateRandomPrice = () => (Math.random() * 1000).toFixed(2);

const initialData = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `Stock ${index + 1}`,
  price: generateRandomPrice(),
}));

export const HeavyTerminal: React.FC = () => {
  const [stockData, setStockData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setStockData((prevData) =>
        prevData.map((stock) => ({
          ...stock,
          price: generateRandomPrice(),
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Text as="h1">Stock Market Terminal</Text>
      <Table.Root>
        <Table.Caption>Live Stock Prices</Table.Caption>
        <Table.Head>
          <Table.Row>
            <Table.Header>ID</Table.Header>
            <Table.Header>Name</Table.Header>
            <Table.Header textAlign="right">Price</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {stockData.map((stock) => (
            <Table.Row key={stock.id}>
              <Table.Cell>{stock.id}</Table.Cell>
              <Table.Cell>{stock.name}</Table.Cell>
              <Table.Cell textAlign="right">${stock.price}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
