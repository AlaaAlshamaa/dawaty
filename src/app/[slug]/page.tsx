import type { Metadata } from "next";
import InviteClient from "./InviteClient";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: invite } = await supabase
    .from("invites")
    .select("title, host_names, cover_image_url")
    .eq("slug", slug)
    .maybeSingle();

  if (!invite) {
    return {
      title: "دعوة خاصة | Dawaty",
    };
  }

  const names = invite.host_names || invite.title;

  const title = `${invite.title} — ${names}`;

  const description =
    `بكل الحب والسرور، نتشرف بدعوتكم لمشاركتنا هذه المناسبة السعيدة.`;

  const image =
    invite.cover_image_url ||
    "/images/share2.png";

  const url = `https://dawaty.vercel.app/${encodeURIComponent(slug)}`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url,
      siteName: "Dawaty",
      locale: "ar_SY",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
  card: "summary_large_image",
  title: "Dawaty — لحظتك تبدأ بدعوة",
  description: "دعوات رقمية أنيقة لمناسباتكم الخاصة",
  images: ["/images/share2.png"],
},
  };
}

export default function Page() {
  return <InviteClient />;
}