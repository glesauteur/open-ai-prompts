import Prompt from "./Prompt";
import styled from "styled-components";

function App() {
  return (
    <AppContainer>
      <div>
        <Prompt />
      </div>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-image: linear-gradient(
    170deg,
    hsl(315deg 33% 93%) 0%,
    hsl(298deg 66% 82%) 55%,
    hsl(280deg 92% 75%) 100%
  );
`;
export default App;
