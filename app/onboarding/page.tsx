"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/layouts/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ToyotaIcon from "@/components/ToyotaIcon";
import { Input } from "@/components/ui/input";

/* --------------------------------------------------- */
/* QUESTIONS                                            */
/* --------------------------------------------------- */
const questions = [
  {
    id: 0,
    field: "userSpecific",
    question: "Let's get to know you a bit first!",
    type: "input",
    inputs: [
      { name: "income", label: "Annual Income ($)", placeholder: "e.g. 75000" },
      { name: "creditScore", label: "Credit Score", placeholder: "e.g. 720" },
    ],
  },
  {
    id: 1,
    field: "monthlyBudget",
    question: "What's your estimated monthly car budget?",
    type: "input",
    inputs: [
      {
        name: "monthlyBudget",
        label: "Monthly Budget ($)",
        placeholder: "e.g. 450",
      },
    ],
  },
  {
    id: 2,
    field: "vehicleCondition",
    question: "What type of vehicle are you looking for?",
    type: "choice",
    answers: ["NEW", "USED"],
    answer_description: [
      "Brand new vehicles with zero mileage.",
      "Pre-owned vehicles in good condition.",
    ],
  },
  {
    id: 3,
    field: "fuelType",
    question: "What type of fuel do you prefer?",
    type: "choice",
    answers: ["GAS", "HYBRID", "ELECTRIC"],
    answer_description: [
      "Traditional gasoline vehicles.",
      "Hybrid vehicles that use both fuel and electric power.",
      "Fully electric vehicles with no fuel usage.",
    ],
  },
  {
    id: 4,
    field: "vehicleYearRange",
    question: "Select your preferred vehicle year range:",
    type: "choice",
    answers: ["2010-2015", "2016-2020", "2021-2025"],
    answer_description: [
      "Affordable older models with lower cost.",
      "Recent models balancing performance and price.",
      "Newest models with modern tech and safety.",
    ],
  },
] as const;

/* --------------------------------------------------- */
/* CARD ANSWER COMPONENT                               */
/* --------------------------------------------------- */
interface CardAnswerProps {
  title: string;
  description: string;
  onClick?: () => void;
  isSelected?: boolean;
}

function CardAnswer({
  title,
  description,
  onClick,
  isSelected,
}: CardAnswerProps) {
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
/* ONBOARDING COMPONENT                                */
/* --------------------------------------------------- */
export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{
    userSpecific: { income: string; creditScore: string };
    monthlyBudget: string;
    vehicleCondition?: string;
    fuelType?: string;
    vehicleYearRange?: string;
  }>({
    userSpecific: { income: "", creditScore: "" },
    monthlyBudget: "",
  });

  const current = questions[step];

  /* ------------------------ */
  /* Generate or Retrieve ID  */
  /* ------------------------ */
  const getOrCreateUserId = (): string => {
    let id = localStorage.getItem("userId");
    if (!id) {
      id = `USER#${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      localStorage.setItem("userId", id);
    }
    return id;
  };

  /* ------------------------ */
  /* Input / Selection Logic  */
  /* ------------------------ */
  const handleAnswerSelect = (field: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev] === value ? "" : value,
    }));
  };

  const handleInputChange = (
    field: string,
    name: string,
    value: string
  ): void => {
    if (field === "userSpecific") {
      setAnswers((prev) => ({
        ...prev,
        userSpecific: { ...prev.userSpecific, [name]: value },
      }));
    } else {
      setAnswers((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  /* ------------------------ */
  /* Navigation               */
  /* ------------------------ */
  const handleNext = () => {
    if (step < questions.length - 1) setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  /* ------------------------ */
  /* Submission               */
  /* ------------------------ */
  const handleSubmit = () => {
    const id = getOrCreateUserId();

    let vehicleYearRange: number[] = [];
    if (typeof answers.vehicleYearRange === "string") {
      const parts = answers.vehicleYearRange
        .split("-")
        .map((y) => Number(y.trim()))
        .filter((n) => !isNaN(n));
      if (parts.length === 2) vehicleYearRange = parts;
    }

    const formattedData = {
      id,
      name: "Guest User",
      password: "localUser",
      userSpecific: {
        income: Number(answers.userSpecific.income),
        creditScore: Number(answers.userSpecific.creditScore),
      },
      monthlyBudget: Number(answers.monthlyBudget) || 0,
      vehicleType: "SEDAN",
      fuelType: answers.fuelType || "",
      vehicleCondition: answers.vehicleCondition || "",
      vehicleYearRange,
    };

    localStorage.setItem("userData", JSON.stringify(formattedData));
    console.log("✅ Saved user data:", formattedData);

    router.push("/post-redirect");
  };

  /* ------------------------ */
  /* UI LOGIC                 */
  /* ------------------------ */
  const isInputStep = current.type === "input";
  const hasSelectedAnswer = isInputStep
    ? current.field === "userSpecific"
      ? answers.userSpecific.income && answers.userSpecific.creditScore
      : !!answers[current.inputs?.[0]?.name as keyof typeof answers]
    : !!answers[current.field as keyof typeof answers];

  const progressValue = (step / questions.length) * 100;

  /* ------------------------ */
  /* RENDER                   */
  /* ------------------------ */
  return (
    <Layout>
      <div className="mt-16 w-full">
        {/* Progress */}
        {/* Progress Section */}
        <div className="w-full px-16 mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <ToyotaIcon />
              <p className="text-sm font-medium text-zinc-600">
                Step{" "}
                <span className="font-semibold text-zinc-800">
                  {Math.min(step, questions.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-zinc-800">
                  {questions.length}
                </span>
              </p>
            </div>
            <span className="text-xs text-zinc-500">
              {Math.round(progressValue)}%
            </span>
          </div>

          <Progress
            value={progressValue}
            className="h-2 [&>div]:bg-[#EB0A1E]"
          />
        </div>

        {/* Question */}
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-2xl mb-1">Question</h1>
          <p className="text-zinc-600">{current.question}</p>
        </div>

        {/* Inputs / Choices */}
        <div className="mt-12 h-[500px] flex flex-row items-start justify-center gap-4 flex-wrap">
          {isInputStep ? (
            <div className="flex flex-col gap-6 w-[400px]">
              {current.inputs?.map((input) => (
                <div key={input.name} className="flex flex-col text-left">
                  <label className="text-sm font-medium text-zinc-600 mb-2">
                    {input.label}
                  </label>
                  <Input
                    type="number"
                    placeholder={input.placeholder}
                    value={
                      current.field === "userSpecific"
                        ? answers.userSpecific[
                            input.name as "income" | "creditScore"
                          ]
                        : (answers[
                            input.name as keyof typeof answers
                          ] as string) || ""
                    }
                    onChange={(e) =>
                      handleInputChange(
                        current.field,
                        input.name,
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            current.answers?.map((answer, idx) => (
              <CardAnswer
                key={answer}
                title={answer}
                description={current.answer_description?.[idx] ?? ""}
                onClick={() => handleAnswerSelect(current.field, answer)}
                isSelected={
                  answers[current.field as keyof typeof answers] === answer
                }
              />
            ))
          )}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex flex-row justify-between px-16">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 0}
            className="px-6"
          >
            Back
          </Button>
          <Button
            variant="default"
            onClick={step === questions.length - 1 ? handleSubmit : handleNext}
            disabled={!hasSelectedAnswer}
            className="px-6"
          >
            {step === questions.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </Layout>
  );
}
