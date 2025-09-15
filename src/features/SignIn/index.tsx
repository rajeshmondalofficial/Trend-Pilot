import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/lib/supabase";
import type { SignInPayload } from "@/types/auth";
import { Form } from "radix-ui";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const { register, handleSubmit } = useForm<SignInPayload>();

  const onSubmit = (data: SignInPayload) => {
    supabaseClient.auth.signInWithPassword({ ...data });
  };

  return (
    <div className="h-screen w-screen bg-slate-50 flex justify-center items-center">
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Please enter your email and password
          </CardDescription>
        </CardHeader>

        <Form.Root onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Form.Field {...register("email", { required: true })}>
              <Form.Label className="Form-Label">Email Address</Form.Label>
              <Form.Control asChild>
                <Input placeholder="Enter your email address" />
              </Form.Control>
            </Form.Field>

            <Form.Field
              className="mt-4"
              {...register("password", { required: true })}
            >
              <Form.Label className="Form-Label">Password</Form.Label>
              <Form.Control asChild>
                <Input type="password" placeholder="********" />
              </Form.Control>
            </Form.Field>
          </CardContent>
          <CardFooter className="mt-4">
            <Button type="submit">Submit</Button>
          </CardFooter>
        </Form.Root>
      </Card>
    </div>
  );
};

export default SignIn;
