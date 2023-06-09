import SidebarWithHeader from "./Sidebar";
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Order = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    getJewlery();
  }, []);

  function getJewlery() {
    fetch("https://busy-blue-chick-tie.cyclic.app/users").then(
      (result) => {
        result.json().then((resp) => {
          setCart(resp);
        });
      }
    );
  }
  function deleteItem(id) {
    fetch(`https://busy-blue-chick-tie.cyclic.app/users/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        getJewlery();
      });
    });
  }
  return (
    <Box>
      <SidebarWithHeader />
      <TableContainer>
        <Table size="sm" ml={250} w={"80%"}>
          <Thead>
            <Tr>
              <Th>User Name</Th>
              <Th>User Last Name</Th>
              <Th>Email</Th>
              <Th>Phone Number</Th>

              <Th>Reject</Th>
            </Tr>
          </Thead>

          {cart.map((product, index) => (
            <Tbody key={index}>
              <Tr>
                <Td>
                  {product.first_name}
                  {/* <Img
                  w={50}
                  h={50}
                  src={product.image1}
                /> */}
                </Td>
                <Td>{product.last_name}</Td>
                <Td>{product.email}</Td>
                <Td>{product.ph_no}</Td>

                <Td>
                  <Button
                    bg="tomato"
                    variant="solid"
                    onClick={() => deleteItem(product._id)}
                  >
                    Reject
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

export default Order;
