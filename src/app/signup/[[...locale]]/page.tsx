import { redirect } from "next/navigation";

// Redirect to GitaGPT - auth modal will be triggered  
export default function SignupPage() {
  redirect("/gitagpt?showAuth=signup");
}
