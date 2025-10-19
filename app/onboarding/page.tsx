"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/layouts/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ToyotaIcon from "@/components/ToyotaIcon";
import { Input } from "@/components/ui/input";

/* --------------------------------------------------- */
/* Data Schema                                         */
/* --------------------------------------------------- */

const questions = [
  {
    id: 0,
    field: "userSpecific",
    question: "Let's get to know you a bit first!",
    type: "input",
    inputs: [
      { name: "income", label: "Annual Income ($)", placeholder: "e.g. 75000" },
      {
        name: "creditScore",
        label: "Credit Score",
        placeholder: "e.g. 720",
      },
    ],
  },
  {
    id: 1,
    field: "vehicleCondition",
    question: "What type of vehicle are you looking for?",
    answers: ["NEW", "USED"],
    answer_description: [
      "Brand new vehicles with zero mileage.",
      "Pre-owned vehicles in good condition.",
    ],
  },
  {
    id: 2,
    field: "fuelType",
    question: "What type of fuel do you prefer?",
    answers: ["GAS", "HYBRID", "ELECTRIC"],
    answer_description: [
      "Traditional gasoline vehicles.",
      "Hybrid vehicles that use both fuel and electric power.",
      "Fully electric vehicles with no fuel usage.",
    ],
  },
  {
    id: 3,
    field: "vehicleYear",
    question: "Select your preferred vehicle year range:",
    answers: ["2010-2015", "2016-2020", "2021-2025"],
    answer_description: [
      "Affordable older models with lower cost.",
      "Recent models balancing performance and price.",
      "Newest models with modern tech and safety.",
    ],
  },
];

/* --------------------------------------------------- */
/* CardAnswer Component                                */
/* --------------------------------------------------- */
function CardAnswer({
  title,
  description,
  onClick,
  isSelected,
}: {
  title: string;
  description: string;
  onClick?: () => void;
  isSelected?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={`h-full border shadow-md p-4 flex flex-col justify-end rounded-lg min-w-[150px] cursor-pointer transition ${
        isSelected
          ? "bg-zinc-200 border-zinc-500"
          : "hover:bg-zinc-100 border-zinc-300"
      }`}
    >
      <h1 className="text-2xl uppercase">{title}</h1>
      <p className="text-xs text-zinc-400">{description}</p>
    </div>
  );
}

/* --------------------------------------------------- */
/* Onboarding Component                                */
/* --------------------------------------------------- */
function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({
    userSpecific: { income: "", creditScore: "" },
  });

  const current = questions[step];

  /* --- Select / Deselect answers --- */
  const handleAnswerSelect = (field: string, value: string) => {
    setAnswers((prev) => {
      const updated = { ...prev };
      if (updated[field] === value) delete updated[field];
      else updated[field] = value;
      return updated;
    });
  };

  /* --- Handle Input Changes --- */
  const handleInputChange = (name: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      userSpecific: { ...prev.userSpecific, [name]: value },
    }));
  };

  /* --- Navigation --- */
  const handleNext = () => {
    if (step < questions.length - 1) setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 0) {
      const currentField = questions[step].field;
      setAnswers((prev) => {
        const updated = { ...prev };
        if (currentField === "userSpecific") {
          updated.userSpecific = { income: "", creditScore: "" };
        } else delete updated[currentField];
        return updated;
      });
      setStep((prev) => prev - 1);
    }
  };

  /* --- Submit --- */
  const handleSubmit = () => {
    const formattedData = {
      id: "user-001",
      name: "John Doe",
      password: "password123",
      userSpecific: {
        income: Number(answers.userSpecific.income),
        creditScore: Number(answers.userSpecific.creditScore),
      },
      vehicleCondition: answers.vehicleCondition || "",
      fuelType: answers.fuelType || "",
      vehicleYear: answers.vehicleYear || "",
    };

    console.log("🚀 Submitted Data:");
    console.log(JSON.stringify(formattedData, null, 2));

    setTimeout(() => {
      router.push("/post-redirect");
    }, 1000);
  };

  /* --- UI Logic --- */
  const hasSelectedAnswer =
    current.type === "input"
      ? answers.userSpecific.income && answers.userSpecific.creditScore
      : !!answers[current.field];

  const isLastStep = step === questions.length - 1;
  const total = questions.length;
  const answeredCount =
    Object.keys(answers).length -
    (answers.userSpecific.income || answers.userSpecific.creditScore ? 0 : 1);
  const progressValue = (answeredCount / total) * 100;

  return (
    <Layout>
      <div className="mt-16 w-full">
        {/* Progress Section */}
        <div className="w-full px-16 mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ToyotaIcon />
            <p className="text-sm font-medium text-zinc-600">
              {answeredCount} of {total} answered
            </p>
          </div>
          <div className="flex-1">
            <Progress
              value={progressValue}
              className="h-2 [&>div]:bg-[#EB0A1E]"
            />
          </div>
        </div>

        {/* Question Header */}
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-2xl">Question</h1>
          <p>{current.question}</p>
        </div>

        {/* Dynamic Input or Answers */}
        <div className="mt-12 h-[500px] flex flex-row items-start justify-center gap-4 flex-wrap">
          {current.type === "input" ? (
            <div className="flex flex-col gap-6 w-[400px]">
              {current.inputs.map((input) => (
                <div key={input.name} className="flex flex-col text-left">
                  <label className="text-sm font-medium text-zinc-600 mb-2">
                    {input.label}
                  </label>
                  <Input
                    type="number"
                    placeholder={input.placeholder}
                    value={answers.userSpecific[input.name]}
                    onChange={(e) =>
                      handleInputChange(input.name, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          ) : Array.isArray(current.answers) &&
            Array.isArray(current.answer_description) ? (
            current.answers.map((answer, idx) => (
              <CardAnswer
                key={answer}
                title={answer}
                description={current.answer_description?.[idx] ?? ""}
                onClick={() => handleAnswerSelect(current.field, answer)}
                isSelected={answers[current.field] === answer}
              />
            ))
          ) : null}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-4 flex flex-row justify-between px-16">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 0}
            className="px-6"
          >
            Back
          </Button>

          {isLastStep ? (
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={!hasSelectedAnswer}
              className="px-6"
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={handleNext}
              disabled={!hasSelectedAnswer}
              className="px-6"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Onboarding;
