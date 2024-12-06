import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-xl font-bold mb-4">Register</h1>
            <RegisterForm />
        </div>
    );
}
