import React from "react";
import styled from "styled-components";
import Responses from "./Responses";
import * as api from "./api";
import useLocalStorage from "./useLocalStorage";
import { useState, useEffect } from "react";

const Prompt = () => {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useLocalStorage("reponses", []);
  const [loading, setLoading] = useState(false);
  const [engineList, setEngineList] = useState([]);
  const [selectedEngine, setSelectedEngine] = useState(null);

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleEngineSelect = (e) => {
    setSelectedEngine(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const getPromptResponse = async function () {
      setLoading(true);
      const data = await api.getAnswer(prompt, selectedEngine);
      setLoading(false);
      setPrompt("");
      let date = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "medium",
      }).format(new Date());

      setResponses([
        {
          prompt: prompt,
          response: data.choices[0].text,
          date: date,
          engine: selectedEngine,
        },
        ...responses,
      ]);
    };

    getPromptResponse();
  };

  useEffect(() => {
    const getEngineList = async function () {
      const data = await api.getEngineList();
      setEngineList(data.data);
    };
    getEngineList();
  }, []);

  const allEngines = engineList.map((engine) => {
    return <option value={engine.id}>{engine.id}</option>;
  });

  return (
    <PromptContainer>
      <section>
        <FormHeader>
          <h1>Enter a Prompt!</h1>

          <Dropdown onChange={handleEngineSelect}>
            <option value="">Select your engine</option>
            {allEngines}
          </Dropdown>
        </FormHeader>

        <form>
          <TextArea
            aria-label="Enter a prompt"
            value={prompt}
            onChange={handleChange}
          ></TextArea>
          <Submit
            disabled={prompt.length < 1 || !selectedEngine}
            type="submit"
            onClick={handleSubmit}
          >
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
  margin: 50px auto;
  color: #36454f;
  @media (max-width: 600px) {
    width: 85vw;
  }
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Dropdown = styled.select`
  height: 26px;
  padding: 0px 5px;
`;
const TextArea = styled.textarea`
  height: 300px;
  width: 100%;
  border-radius: 8px;
`;

const Submit = styled.button`
  display: block;
  margin-top: 10px;
  height: 40px;
  width: 150px;
  border-style: none;
  border-radius: 10px;
  color: white;
  background-color: #ef26e2;
  font-weight: 900;
  font-size: 15px;
  :hover:enabled {
    background-color: #912273;
    cursor: pointer;
  }
  :disabled {
    background-color: #a2a2a2;
  }
`;

export default Prompt;
