import "./App.css";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  WagmiConfig,
  createClient,
  configureChains,
  useConnect,
  useEnsAvatar,
  useDisconnect,
  useAccount,
  useEnsName,
} from "wagmi";
import { goerli, hardhat } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

//configure chain & provider with Alchemy provider
const { chains, provider, webSocketProvider } = configureChains(
  [goerli, hardhat],
  [
    alchemyProvider({ apiKey: `${process.env.ALCHEMY_API_KEY}` }),
    publicProvider(),
  ]
);
const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      opetions: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

//Display wallet
export function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <img src={ensAvatar} alt="ENS Avatar" />
        <div>{ensName ? `${ensName}(${address})` : address}</div>
        <div>Connected to {connector.name}</div>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && "(unsupported)"}
          {isLoading && connector.id === pendingConnector?.id && "(connecting)"}
        </button>
      ))}
      {error && <div>{error.message}</div>}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <WagmiConfig client={client}>
        <Profile />
      </WagmiConfig>
    </div>
  );
}

export default App;
