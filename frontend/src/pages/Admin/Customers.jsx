import {
  Box,
  Button,
  Img,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SidebarWithHeader from "./Sidebar";
import InitialFocus from "./Modal";
const Customers = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getJewlery();
  }, []);

  function getJewlery() {
    fetch("http://localhost:4500/allproducts").then((result) => {
      result.json().then((resp) => {
        // console.log("allproduct",resp)
        setCart(resp);
      });
    });
  }

  function deleteItem(id) {
    fetch(`http://localhost:4500/allproducts/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        getJewlery();
      });
    });
  }
  return (
    <Box >
      <SidebarWithHeader />
      <TableContainer fontSize={["12px", "12px", "20px", "20px"]} >
        <Table
          size="40px"
          ml={["", "", "250", "250"]}
          w={["95%", "80%", "70%", "85%"]}
          m={"auto"}
        >
          <Thead>
            <Tr>
              <Th textAlign={"center"}>S.No</Th>
              <Th textAlign={"center"}>Image</Th>
              <Th textAlign={"center"}>Name</Th>
              <Th textAlign={"center"}>Price</Th>
              <Th textAlign={"center"}>Item Edit</Th>
              <Th textAlign={"center"}>Item Delete</Th>
            </Tr>
          </Thead>
          {cart.map((product, index) => (
            <Tbody key={index} >
              <Tr>
                <Td fontWeight={"bold"} textAlign={"center"}>{index + 1}.</Td>
                <Td textAlign={"center"}>
                  <Img
                    w={["10", "10", "20", "80%"]}
                    h={["5", "5", "10", "50"]}
                    src={product.imageTsrc}
                  />
                </Td>
                <Td textAlign={"center"}>{product.name}</Td>
                <Td textAlign={"center"}>{product.price}</Td>
                <Td textAlign={"center"}>
                  <InitialFocus />
                </Td>
                <Td textAlign={"center"}>
                  <Button
                    w={["16", "14", "20", "50"]}
                    h={["19", "18", "23", "50"]}
                    bg="tomato"
                    variant="solid"
                    onClick={() => deleteItem(product.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          ))}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Customers;
