import { json } from "stream/consumers";

export function useAPIcalls() {
  async function UpdateMessageLogs(LogInformations: {
    messagehistory: Array<{
      Sender: string;
      Receiver: string;
      Message: string;
      Time: Date;
    }>;
  }) {
    try {
      const res = await fetch("/api/SendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(LogInformations),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error updating messages:", error);
    }
  }
  async function AddUser(DisplayName: string) {
    try {
      const res = await fetch("/api/registernewuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(DisplayName),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error updating messages:", error);
    }
  }
  async function FetchMessageLogs(LogInformations: {
    sender: string;
    receiver: string;
  }) {
    try {
      console.log("tried");
      const query = new URLSearchParams({
        sender: LogInformations.sender,
        receiver: LogInformations.receiver,
      }).toString();
      const res = await fetch(`/api/FetchLog?${query}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      console.log("failed ?");

      const data = await res.json();
      console.log(data.csvdata);
      return data.csvdata;
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  }

  return { FetchMessageLogs, UpdateMessageLogs };
}
