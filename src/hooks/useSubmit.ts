import OpenAI from "openai";
import type { Stream } from "openai/streaming";
import type { FormEvent } from "react";

// #region sdk init
const openaiClient = new OpenAI({
  // baseURL: "http://localhost:11434/v1/",
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true
});

const useSubmit = (
  setMessages: React.Dispatch<React.SetStateAction<{
    party: "ai" | "self";
    content: string;
  }[]>>,
  history: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  setHistory: React.Dispatch<React.SetStateAction<OpenAI.Chat.Completions.ChatCompletionMessageParam[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  promptInputRef: React.RefObject<HTMLInputElement | null>,
  scrollToBottom: () => void
) => {

  const TEXT_MODEL = "mistralai/devstral-2512:free"
  const IMAGE_MODEL = "openai/gpt-5-image"

  // -----------------------------------------------------------------------------------------
  // #region Submit
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Basic validation
    const prompt = new FormData(e.currentTarget).get('chat-prompt') as string
    if (!prompt || prompt === '') return;
    // Add user prompt to messages state
    setMessages(prev => ([...prev, { party: "self", content: prompt }]))
    // Clear the prompt input
    if (promptInputRef.current) promptInputRef.current.value = ""
    // Check if prompt asks for image or text
    const requestType = await getRequestType(prompt)
    setLoading(true)

    // #region text response
    let responseMessage = ""
    if (requestType === "text") {
      const stream = await openaiClient.chat.completions.create({
        messages: [
          { role: "system", content: "You answer in short. If you dont know the answer, you clearly say so" },
          ...history,
          { role: "user", content: prompt }
        ],
        model: TEXT_MODEL,
        stream: true,
        // tools: [
        //   { ...ticketPriceTool }
        // ]
      })
      responseMessage = await handleStreamResponse(stream)
    }
    // #region image response
    if (requestType === "image") {
      const responseString = await openaiClient.chat.completions.create({
        model: IMAGE_MODEL,
        messages: [
          { role: 'user', content: 'Generate a beautiful sunset over mountains', },
        ],
        modalities: ['image' as "text", 'text']
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let response: any;
      try { response = JSON.stringify(responseString) }
      catch (e) { console.log("Error..." + e) }
      console.log("Response: ", response)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response?.choices?.[0]?.message?.images?.forEach((image: any) => {
        setMessages(prev => [...prev, { party: "ai", content: `![generated image](${image.image_url.url})` }])
      })
      setLoading(false)
      return;
    }

    // #region handle tool calls
    // let toolCallResponse = { ...response }
    const tempMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "user", content: prompt },
      { role: "assistant", content: responseMessage }
    ]

    // while (toolCallResponse.choices[0].finish_reason === "tool_calls") {
    //   const tempToolCallResponseMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = []
    //   for (const toolCall of toolCallResponse.choices[0].message.tool_calls || []) {
    //     if (toolCall.type !== "function") continue;
    //     const argumentsJSON = JSON.parse(toolCall.function.arguments)
    //     tempToolCallResponseMessages.push({
    //       role: "tool",
    //       content: LLM_TOOLS[toolCall.function.name](argumentsJSON.destination_city),
    //       tool_call_id: toolCall.id
    //     })
    //   }
    //   tempMessages = [...tempMessages, ...tempToolCallResponseMessages]
    //   toolCallResponse = await openaiClient.chat.completions.create({
    //     model: MODEL,
    //     messages: [
    //       { role: "system", content: "You are a helpful assistant" },
    //       ...history,
    //       ...tempMessages
    //     ],
    //     tools: [
    //       { ...ticketPriceTool }
    //     ]
    //   })
    //   tempMessages.push(toolCallResponse.choices[0].message)
    // }

    // #region state updates
    setHistory(prev => [...prev, ...tempMessages])

    // Set message
    // setMessages(prev => [...prev, { party: "ai", content: responseMessage || "" }])
    setLoading(false)
  }
  // -----------------------------------------------------------------------------------------

  // #region Request type
  const getRequestType = async (prompt: string) => {
    const response = await openaiClient.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Based on if prompt is asking for 'image' or 'text', you just response with 'image' or 'text', no matter what" },
        { role: "user", content: prompt }
      ]
    })
    return response.choices[0].message.content as "image" | "text"
  }

  // #region handle stream
  const handleStreamResponse = async (stream: Stream<OpenAI.Chat.Completions.ChatCompletionChunk> & {
    _request_id?: string | null;
  }) => {
    let responseMessage = ""
    setMessages(prev => ([...prev, { party: "ai", content: responseMessage }]))
    for await (const event of stream) {
      const responseMessageChunk = event.choices[0].delta.content
      if (responseMessageChunk) {
        responseMessage += responseMessageChunk
        setMessages(prev => {
          const temp = [...prev]
          temp[temp.length - 1]["content"] = responseMessage
          return temp;
        })
        scrollToBottom()
      }
    }
    return responseMessage
  }

  return sendMessage;
}

export default useSubmit