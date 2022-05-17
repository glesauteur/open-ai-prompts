import React from "react";
import styled from "styled-components";
import Responses from "./Responses";
import * as api from "./api";
import useLocalStorage from "./useLocalStorage";
import { useState } from "react";

const Prompt = () => {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useLocalStorage("reponses", []);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const getPromptResponse = async function () {
      setLoading(true);
      const data = await api.getAnswer(prompt);
      setLoading(false);
      setPrompt("");
      let date = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "medium",
      }).format(new Date());

      setResponses([
        { prompt: prompt, response: data.choices[0].text, date: date },
        ...responses,
      ]);
    };

    getPromptResponse();
  };

  return (
    <PromptContainer>
      <section>
        <h1>Ask me a question!</h1>
        <form>
          <TextArea
            aria-label="Enter a prompt"
            value={prompt}
            onChange={handleChange}
          ></TextArea>
          <Submit type="submit" prompt={prompt} onClick={handleSubmit}>
            Submit
          </Submit>
        </form>
        <Responses loading={loading} responses={responses} />
      </section>
    </PromptContainer>
  );
};

const PromptContainer = styled.main`
  width: 50vw;
  margin: auto;
  color: #36454f;
  @media (max-width: 600px) {
    width: 85vw;
  }
`;

const TextArea = styled.textarea`
  height: 300px;
  width: 100%;
  border-radius: 8px;
`;

const Submit = styled.button`
  display: block;
  margin-top: 10px;
  cursor: pointer;
  height: 40px;
  width: 150px;
  border-style: none;
  border-radius: 10px;
  color: white;
  font-weight: 900;
  font-size: 15px;
  pointer-events: ${(props) => (props.prompt.length < 1 ? "none" : "auto")};
  background-color: ${(props) =>
    props.prompt.length < 1 ? "#B0AAAE" : "#f23cc4"};
  :hover {
    background-color: #912273;
  }
`;

export default Prompt;
