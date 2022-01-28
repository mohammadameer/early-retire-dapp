import { Box, Button, Input, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const Body = ({ contract }) => {
  const [loading, setLoaindg] = useState(false);
  const [amount, setAmount] = useState(0);
  const [allInvestments, setAllInvestments] = useState();
  const [numberOfInvestors, setNumberOfInvestors] = useState(0);
  const [user, setUser] = useState();
  const [userInvestments, setUserInvestments] = useState([]);
  const [withdrawableAmount, setWithdrawableAmount] = useState(0);

  const getData = async () => {
    setLoaindg(true);
    const allInvestmentsTxn = await contract.allInvestments();
    const numberOfInvestorsTxn = await contract.numberOfInvestors();
    const userTxn = await contract.users(contract.signer._address);
    const userInvestmentsTxn = await contract.getUserInvestments();
    const withdrawableAmountTxn = await contract.getWithdrawableAmount();

    setAllInvestments(ethers.utils.formatUnits(allInvestmentsTxn));
    setNumberOfInvestors(ethers.utils.formatUnits(numberOfInvestorsTxn));
    setUser(userTxn);
    setUserInvestments(userInvestmentsTxn);
    setWithdrawableAmount(ethers.utils.formatUnits(withdrawableAmountTxn));

    setLoaindg(false);
  };

  useEffect(() => {
    if (contract?.signer) {
      getData();
    }
  }, [contract]);

  const invest = async () => {
    if (amount) {
      setLoaindg(true);

      const investTxn = await contract.invest({
        value: ethers.utils.parseUnits(amount, 18),
      });

      await investTxn.wait();

      setAmount("");

      getData();
      setLoaindg(false);
    }
  };

  const withdraw = async () => {
    setLoaindg(true);

    const withdrawTxn = await contract.withdraw();

    await withdrawTxn.wait();

    setAmount("");

    getData();
    setLoaindg(false);
  };

  console.log(user);

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" flexWrap="wrap" mt={20} w="full">
        <Box
          w={["100%", "50%", "50%", "20%"]}
          p={5}
          opacity={loading ? "0.2" : "1"}
        >
          <Box
            p={5}
            w="full"
            bg="gray.200"
            borderRadius="2xl"
            borderWidth={2}
            borderColor="blackAlpha.600"
            mr={20}
          >
            <Text fontSize="xl">All Investments</Text>
            <Text>{allInvestments}</Text>
          </Box>
        </Box>
      </Box>

      <Text fontSize="4xl" fontWeight="bold" textAlign="center" mt={10}>
        Earn 0.50% Daily Forever
      </Text>

      <Box
        display="flex"
        flexDir={["column", "row"]}
        justifyContent="center"
        mt={20}
        flexWrap="wrap"
      >
        <Input
          mr={5}
          p={10}
          fontSize="2xl"
          placeholder="0 BNB"
          value={amount}
          disabled={loading}
          onChange={(e) => setAmount(e.target.value)}
          w={["full", "auto"]}
        />
        <Button
          fontSize="xl"
          isLoading={loading}
          p={10}
          onClick={invest}
          w={["full", "auto"]}
          mt={[5, 0]}
        >
          Invest
        </Button>
      </Box>

      <Box display="flex" flexWrap="wrap" mt={20} w="full">
        <Box
          w={["100%", "50%", "50%", "20%"]}
          p={5}
          opacity={loading ? "0.2" : "1"}
        >
          <Box
            p={5}
            w="full"
            bg="gray.200"
            borderRadius="2xl"
            borderWidth={2}
            borderColor="blackAlpha.600"
            mr={20}
          >
            <Text fontSize="xl">My Investments</Text>

            <Text mt={2}>
              Total:{" "}
              {user?.totalInvestments
                ? ethers.utils.formatUnits(user.totalInvestments)
                : 0}{" "}
              BNB
            </Text>

            {userInvestments?.map((investment, index) => (
              <Text key={index} mt={2}>
                {index + 1} - +{ethers.utils.formatUnits(investment.amount)} BNB
              </Text>
            ))}
          </Box>
        </Box>

        <Box
          w={["100%", "50%", "50%", "20%"]}
          p={5}
          opacity={loading ? "0.2" : "1"}
        >
          <Box
            p={5}
            w="full"
            bg="gray.200"
            borderRadius="2xl"
            borderWidth={2}
            borderColor="blackAlpha.600"
            mr={20}
          >
            <Text fontSize="xl">Earnings</Text>
            <Text>
              {user?.investments
                ? user?.investments.map((investment) => investment.amount)
                : 0}
            </Text>
          </Box>
        </Box>

        <Box
          w={["100%", "50%", "50%", "20%"]}
          p={5}
          opacity={loading ? "0.2" : "1"}
        >
          <Box
            p={5}
            w="full"
            bg="gray.200"
            borderRadius="2xl"
            borderWidth={2}
            borderColor="blackAlpha.600"
            mr={20}
          >
            <Text fontSize="xl">Withdraw</Text>
            <Text mt={4}>withdrawable Amount: {withdrawableAmount}</Text>
            {withdrawableAmount > 0 ? (
              <Button onClick={withdraw} mt={4} isFullWidth={true}>
                Withdraw
              </Button>
            ) : null}
          </Box>
        </Box>

        <Box
          w={["100%", "50%", "50%", "20%"]}
          p={5}
          opacity={loading ? "0.2" : "1"}
        >
          <Box
            p={5}
            w="full"
            bg="gray.200"
            borderRadius="2xl"
            borderWidth={2}
            borderColor="blackAlpha.600"
            mr={20}
          >
            <Text fontSize="xl">Number of Investors</Text>
            <Text>{numberOfInvestors * 1e18}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Body;
