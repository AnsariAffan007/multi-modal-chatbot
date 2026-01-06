import type OpenAI from "openai"

const useTools = () => {

  const ticketPrices: Record<string, string> = { "london": "$799", "paris": "$899", "tokyo": "$1400", "berlin": "$499" }
  const getTicketPrice = (city: string) => {
    return ticketPrices[city.toLowerCase()] || "No price for specified city found"
  }

  const ticketPriceTool: OpenAI.Chat.Completions.ChatCompletionTool = {
    type: "function",
    function: {
      name: "getTicketPrice",
      description: "Returns ticket price of a given city",
      parameters: {
        type: "object",
        properties: {
          "destination_city": {
            type: "string",
            description: "The city that the customer wants to travel to"
          }
        },
        additionalProperties: false
      },
      strict: false
    }
  }

  const LLM_TOOLS: Record<string, (city: string) => string> = {
    getTicketPrice: getTicketPrice
  }

  return {
    LLM_TOOLS,
    tools: { ticketPriceTool }
  }
}

export default useTools