const getAnswer = async (prompt, engine) => {
  const promptData = {
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  const response = await fetch(
    `https://api.openai.com/v1/engines/${engine}/completions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_TOKEN}`,
      },
      body: JSON.stringify(promptData),
    }
  );

  const data = await response.json();
  return data;
};

const getEngineList = async () => {
  const response = await fetch("https://api.openai.com/v1/engines", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_TOKEN}`,
    },
  });

  const data = await response.json();

  return data;
};

export { getAnswer, getEngineList };
