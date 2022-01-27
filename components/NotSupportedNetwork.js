import { Box, Button, Text } from "@chakra-ui/react";

const NotSupportedNetwork = ({ network, switchNetwork }) => {
  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="3xl" fontWeight="bold" mt={20} color="blue.500">
        To use the dapp you must be in the BSC testnet
      </Text>
      {switchNetwork ? (
        <Button mt={20} onClick={() => switchNetwork(97)}>
          Switch to BSC testnet
        </Button>
      ) : null}
    </Box>
  );
};

export default NotSupportedNetwork;
