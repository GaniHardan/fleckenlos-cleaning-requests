import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();
vi.mock("@tanstack/react-start", () => ({ useServerFn: () => send }));
vi.mock("@/lib/leads.functions", () => ({ submitChatLead: {} }));

import { ChatBot, INVALID_CONTACT } from "@/components/site/ChatBot";
import { CONFIRMATION } from "@/lib/lead-schema";

function say(text: string) {
  fireEvent.change(screen.getByLabelText("Ihre Antwort"), { target: { value: text } });
  fireEvent.click(screen.getByLabelText("Senden"));
}

describe("ChatBot contact check", () => {
  beforeEach(() => {
    send.mockReset().mockResolvedValue({ ok: true });
    vi.spyOn(Date, "now").mockReturnValue(0);
  });

  it("shows the privacy notice and asks again for an invalid contact", async () => {
    render(<ChatBot />);
    fireEvent.click(screen.getByLabelText("Chat öffnen"));
    expect(screen.getByText(/Mit dem Absenden stimmen Sie unserer/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Praxisreinigung" }));
    say("Max");
    say("ruf mich an");
    expect(await screen.findByText(INVALID_CONTACT)).toBeInTheDocument();

    say("0221 123456");
    vi.mocked(Date.now).mockReturnValue(10_000);
    say("80 qm, nächste Woche");
    await waitFor(() => expect(screen.getByText(CONFIRMATION)).toBeInTheDocument());
    expect(send).toHaveBeenCalledWith({
      data: expect.objectContaining({
        name: "Max",
        service: "Praxisreinigung",
        contact: "0221 123456",
        website: "",
        elapsedMs: 10_000,
      }),
    });
  });
});
