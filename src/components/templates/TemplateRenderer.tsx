import ElegantTemplate from "./ElegantTemplate";
import FloralTemplate from "./FloralTemplate";
import MinimalTemplate from "./MinimalTemplate";
import GoldenEngagementTemplate from "./GoldenEngagementTemplate";
import type { Invite } from "@/types";

export default function TemplateRenderer({
  invite,
}: {
  invite: Invite;
}) {
  const key = (invite.template_id || "elegant").toLowerCase();

  if (key === "floral") return <FloralTemplate invite={invite} />;
  if (key === "minimal") return <MinimalTemplate invite={invite} />;
  if (key === "golden") { return <GoldenEngagementTemplate invite={invite} />;
  }
  return <ElegantTemplate invite={invite} />;
}

