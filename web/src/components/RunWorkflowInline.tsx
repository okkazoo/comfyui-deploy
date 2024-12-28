"use client";

import { useState, useMemo } from "react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { createRun } from "@/server/createRun";
import { callServerPromise } from "@/lib/callServerPromise";
import { publicRunStore } from "@/store/publicRunStore";
import { getInputsFromWorkflow } from "@/lib/getInputsFromWorkflow";
import { plainInputsToZod } from "@/lib/workflowVersionInputsToZod";
import { Form } from "./Form";
import { z } from "zod";

export function RunWorkflowInline({
  inputs,
  workflow_version_id,
  machine_id,
}: {
  inputs: ReturnType<typeof getInputsFromWorkflow>;
  workflow_version_id: string;
  machine_id: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const user = useAuth();
  const clerk = useClerk();

  const schema = useMemo(() => {
    return plainInputsToZod(inputs) || z.object({});
  }, [inputs]);

  const {
    setRunId,
    loading,
    setLoading: setLoading2,
    setStatus,
  } = publicRunStore();

  const runWorkflow = async () => {
    if (!user.isSignedIn) {
      clerk.openSignIn({
        redirectUrl: window.location.href,
      });
      return;
    }
    console.log(values);

    const val = Object.keys(values).length > 0 ? values : undefined;
    setLoading2(true);
    setIsLoading(true);
    setStatus("preparing");
    try {
      const origin = window.location.origin;
      const a = await callServerPromise(
        createRun({
          origin,
          workflow_version_id: workflow_version_id,
          machine_id: machine_id,
          inputs: val,
          runOrigin: "public-share",
        })
      );
      if (a && !("error" in a)) {
        setRunId(a.workflow_run_id);
      } else {
        setLoading2(false);
      }
      console.log(a);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setLoading2(false);
    }
  };

  return (
    <Form
      formSchema={schema}
      values={values}
      onValuesChange={(values) => setValues(values as Record<string, string>)}
      onSubmit={runWorkflow}
      className="px-1"
    >
      {/* Form content here */}
    </Form>
  );
}
