import { Button } from "@/components/ui/button";
import Wrapper from "../Wrapper";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "radix-ui";
import { useForm } from "react-hook-form";
import { generateNiche } from "@/lib/gemini";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { supabaseClient } from "@/lib/supabase";
import type { ExtractionResponseI } from "@/types/lib";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useAppSelector } from "@/store";

const Extractor = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<ExtractionResponseI>();
  const { session } = useAppSelector((state) => state.Auth);

  const onSubmit = (data: any) => {
    setIsLoading(true);
    generateNiche(data.description)
      .then((response) => {
        console.log(response);
        const cleanedContent = response?.replace(/```json|```/g, "").trim();

        console.log(cleanedContent);
        if (cleanedContent) {
          setAiResponse(JSON.parse(cleanedContent));
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const insertData = (table_name: string, value: string, key_name: string) => {
    return supabaseClient
      .from(table_name)
      .insert({ [key_name]: value, user: session?.user?.id });
  };

  const addSubmitData = async () => {
    let insertRequestArr: any[] = [];
    aiResponse?.niches?.forEach((n) => {
      insertRequestArr.push(insertData("niches", n, "niche_name"));
    });
    aiResponse?.skills?.forEach((s) => {
      insertRequestArr.push(insertData("skills", s, "skills_name"));
    });
    aiResponse?.project_categories?.forEach((p) => {
      insertRequestArr.push(
        insertData("project_categories", p, "project_categories_name")
      );
    });

    Promise.all(insertRequestArr).then(() => {
      toast("Data added successfully");
      setAiResponse(undefined);
      reset();
    });
  };

  return (
    <Wrapper>
      <div className="flex p-2">
        <div className="w-1/3">
          <Form.Root onSubmit={handleSubmit(onSubmit)}>
            <Form.Field
              className="mb-4"
              {...register("description", { required: true })}
            >
              <Form.Control asChild>
                <Textarea
                  className="h-[calc(100vh-8rem)]"
                  placeholder={`Please enter the job description here. ${"\n\n"}Eg. We are seeking a mid-level software developer to assist in extending our existing backend server
1. Update the existing infrastructure to using an event based webhook in and out system
- Incoming and outgoing messages
- Initiate actions via webhook e.g. Escalation
- Webhook registering system based on events
2. Incorporate existing coupon dispatching to use a event based webhook output system
3. Enable log-in and log-out mechanism to enable user driven display`}
                />
              </Form.Control>
            </Form.Field>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2Icon className="animate-spin" />}Generate
              Niche
            </Button>
          </Form.Root>
        </div>
        <div className="w-2/3 px-2">
          <div className="flex justify-end">
            <Button
              // disabled={aiResponse ? false : true}
              className="mb-4 cursor-pointer"
              onClick={addSubmitData}
            >
              Submit Data
            </Button>
          </div>

          <div className="flex w-full max-h-[calc(100vh-9rem)] overflow-y-scroll">
            <div className="w-1/3">
              <Table>
                <TableCaption>List of Niches.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Niches</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aiResponse?.niches?.map((n) => (
                    <TableRow>
                      <TableCell>{n}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="w-1/3">
              <Table>
                <TableCaption>List of Skills.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Skills</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aiResponse?.skills?.map((s) => (
                    <TableRow>
                      <TableCell>{s}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="w-1/3">
              <Table>
                <TableCaption>List of Project Categories.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Categories</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aiResponse?.project_categories?.map((pc) => (
                    <TableRow>
                      <TableCell>{pc}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Extractor;
