import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { LoginForm } from "./login-form";

export default function AuthCard() {
  return (
    <Card className="max-w-xl w-full">
      <CardHeader>
        <CardTitle>Login DermaScan</CardTitle>
        <CardDescription>
          Please enter your email and password to login.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
