import { redirect } from "next/dist/client/components/navigation";

// /src/app/page.tsx
export default function Home() {
  redirect("/login");
}
