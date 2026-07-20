import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  whatsapp: z
    .string()
    .optional()
    .refine((val) => {
      if (!val?.trim()) return true;
      const digits = val.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 13;
    }),
  project: z.string().min(2),
  message: z.string().min(10),
});

function web3Key(): string {
  return (
    process.env.WEB3FORMS_ACCESS_KEY?.trim() ||
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim() ||
    ""
  );
}

function formspreeId(): string {
  return (
    process.env.FORMSPREE_ID?.trim() ||
    process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim() ||
    ""
  );
}

function contactEmail(): string {
  return process.env.CONTACT_EMAIL?.trim() || "";
}

function isConfigured(): boolean {
  return Boolean(web3Key() || formspreeId() || contactEmail());
}

/** Status probe for the UI banner (no secrets leaked). */
export async function GET() {
  return NextResponse.json({
    configured: isConfigured(),
    provider: web3Key()
      ? "web3forms"
      : formspreeId()
        ? "formspree"
        : contactEmail()
          ? "formsubmit"
          : "none",
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON payload." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid uplink data.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (!isConfigured()) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Uplink not configured. Set WEB3FORMS_ACCESS_KEY in .env.local.",
        configured: false,
      },
      { status: 503 }
    );
  }

  try {
    if (web3Key()) {
      await sendWeb3Forms(data);
    } else if (formspreeId()) {
      await sendFormspree(data);
    } else {
      await sendFormSubmit(data);
    }

    return NextResponse.json({ success: true, message: "TRANSMISSION SENT" });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Transmission channel failure.";
    console.error("[ARC WEB] contact uplink error:", message);
    return NextResponse.json({ success: false, message }, { status: 502 });
  }
}

async function sendWeb3Forms(data: z.infer<typeof contactSchema>) {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: web3Key(),
      subject: `[ARC WEB] Uplink — ${data.project}`,
      from_name: data.name,
      name: data.name,
      email: data.email,
      replyto: data.email,
      whatsapp: data.whatsapp,
      project: data.project,
      message: data.message,
    }),
  });

  const json = (await res.json()) as {
    success?: boolean;
    message?: string;
  };

  if (!res.ok || !json.success) {
    throw new Error(json.message || `Web3Forms HTTP ${res.status}`);
  }
}

async function sendFormspree(data: z.infer<typeof contactSchema>) {
  const res = await fetch(`https://formspree.io/f/${formspreeId()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      project: data.project,
      message: data.message,
      _subject: `[ARC WEB] Uplink — ${data.project}`,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Formspree HTTP ${res.status}`);
  }
}

/** FormSubmit.co — free, needs CONTACT_EMAIL + first-time activation email. */
async function sendFormSubmit(data: z.infer<typeof contactSchema>) {
  const email = contactEmail();
  const res = await fetch(`https://formsubmit.co/ajax/${email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      project: data.project,
      message: data.message,
      _subject: `[ARC WEB] Uplink — ${data.project}`,
      _template: "table",
      _captcha: "false",
    }),
  });

  const json = (await res.json().catch(() => ({}))) as {
    success?: string | boolean;
    message?: string;
  };

  if (!res.ok || json.success === "false" || json.success === false) {
    throw new Error(json.message || `FormSubmit HTTP ${res.status}`);
  }
}
