import { Box, Button, Text } from "@chakra-ui/react";
import { useAccount, useConnect } from "wagmi";
import { FaSignOutAlt as SignOutIcon } from "react-icons/fa";

const Header = () => {
  const [{ data: connectData, loading: connectLoading }, connect] =
    useConnect();
  const [{ data: accountData }, disconnect] = useAccount({ fetchEns: true });

  return (
    <Box px={10} paddingTop={5} display="flex" justifyContent="space-between">
      <Text fontSize="2xl" fontWeight="bold">
        Early Retire Dapp
      </Text>
      {accountData ? (
        <Button rightIcon={<SignOutIcon />} onClick={disconnect}>
          {accountData.ens
            ? accountData.ens
            : `${accountData.address.slice(0, 6)}...${accountData.address.slice(
                -6,
                -1
              )}`}
        </Button>
      ) : (
        <Button
          onClick={() => connect(connectData.connectors[0])}
          disabled={connectLoading}
        >
          Connect
        </Button>
      )}
    </Box>
  );
};

export default Header;