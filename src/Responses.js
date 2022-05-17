import React from "react";
import styled from "styled-components";

const Responses = ({ responses, loading }) => {
  const allResponses = responses.map((res, index) => {
    return (
      <PromptResponse key={index}>
        <AnswerBoxPrompt>
          <TitleWrapper>
            <Title>Prompt: </Title>
            <Date>{res.date}</Date>
          </TitleWrapper>
          <Result>{res.prompt}</Result>
        </AnswerBoxPrompt>
        <AnswerBoxResult>
          <Title>Response:</Title>
          <Result>{res.response}</Result>
        </AnswerBoxResult>
      </PromptResponse>
    );
  });

  return (
    <section>
      <div>
        <h2>Responses</h2>
      </div>
      {loading && (
        <Loading>
          <img src="/loading.svg" alt="loading-spinner" />
        </Loading>
      )}
      <div>{allResponses}</div>
    </section>
  );
};

const Loading = styled.div`
  text-align: center;
`;

const PromptResponse = styled.article`
  margin: 15px 0px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 10px 10px 25px -5px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 10px 10px 25px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 25px -5px rgba(0, 0, 0, 0.75);
`;

const AnswerBoxPrompt = styled.div`
  padding: 10px 25px 12px;
  color: #36454f;
`;

const AnswerBoxResult = styled.div`
  padding: 0px 25px 15px;
  color: #36454f;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.h3`
  margin: 0px;
`;

const Date = styled.time`
  color: #737373;
  margin: 0px;
  font-style: italic;
  font-size: 12px;
`;

const Result = styled.p`
  margin: 0px;
`;

export default Responses;
