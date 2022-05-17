import Prompt from "./Prompt";
import styled from "styled-components";

function App() {
  return (
    <AppContainer>
      <Prompt />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  background-image: linear-gradient(
    170deg,
    hsl(315deg 33% 93%) 0%,
    hsl(298deg 66% 82%) 55%,
    hsl(280deg 92% 75%) 100%
  );
`;
export default App;
