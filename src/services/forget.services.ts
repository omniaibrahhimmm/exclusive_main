// hooks/useForgotPassword.js
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function useForgotPassword() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();  // Assuming you have useTransition imported, or add it as needed

  const forgotPassword = async (email: string) => {
    startTransition(async () => {
      try {
        const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),  // Sends { email: "entered email" }
        });

        if (response.ok) {
          toast.success("Password reset link sent to your email!");
          router.push("/login");  // Redirect to login page
        } else {
          const data = await response.json();
          toast.error(data.message || "Failed to send the reset link, please try again");
        }
      } catch (error) {
        console.error(error);
        toast.error("An unexpected error occurred while connecting to the API");
      }
    });
  };

  return { forgotPassword, isPending };
}