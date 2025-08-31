"use client";

import { Check, Crown, Shield, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

type Feature = {
  label: string;
};

type Plan = {
  name: string;
  priceLabel: string;
  priceNote?: string;
  highlight?: boolean;
  icon: React.ReactNode;
  description: string;
  cta: string;
  features: Feature[];
};

export default function UpgradePage() {
  const router = useRouter();

  const plans: Plan[] = [
    {
      name: "Free",
      priceLabel: "₹0",
      priceNote: "/ month",
      icon: <Shield className="h-5 w-5" />,
      description: "Get started with essential AI assistance for everyday tasks.",
      cta: "Continue Free",
      features: [
        { label: "Basic chat with Xyra AI" },
        { label: "Standard reasoning quality" },
        { label: "Limited deep search runs" },
        { label: "Image previews in input & chat" },
        { label: "Spaces & Discover (view)" },
      ],
    },
    {
      name: "Plus",
      priceLabel: "₹399",
      priceNote: "/ month",
      highlight: true,
      icon: <Zap className="h-5 w-5" />,
      description:
        "Advanced models, faster responses, and more powerful research tools.",
      cta: "Upgrade to Plus",
      features: [
        { label: "Priority response speed" },
        { label: "Enhanced reasoning & accuracy" },
        { label: "Extended deep research modes" },
        { label: "Higher upload limits (images/docs)" },
        { label: "Create & manage Spaces" },
      ],
    },
    {
      name: "Premium",
      priceLabel: "₹999",
      priceNote: "/ month",
      icon: <Crown className="h-5 w-5" />,
      description:
        "Full power for professionals: top-tier models and collaboration.",
      cta: "Go Premium",
      features: [
        { label: "Fastest responses with pro queue" },
        { label: "Best-in-class reasoning models" },
        { label: "Unlimited deep research runs" },
        { label: "Advanced exports (PDF, DOCX)" },
        { label: "Team Spaces & permissions" },
      ],
    },
  ];

  return (
    <div className="w-full h-full px-6 md:px-10 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white">
              Upgrade Xyra AI
            </h1>
            <p className="mt-1 text-sm md:text-base text-gray-600 dark:text-gray-300">
              Choose a plan that fits your workflow. Simple pricing in INR.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const cardBase =
              "border transition-colors rounded-2xl p-6 flex flex-col h-full";
            const cardTheme = plan.highlight
              ? "border-black dark:border-white bg-black text-white dark:bg-white dark:text-black"
              : "border-gray-200 dark:border-gray-800 bg-white dark:bg-black";

            const buttonBase = "mt-6 w-full xyra-button";
            const buttonAlt = "mt-6 w-full xyra-button-secondary";

            return (
              <div key={plan.name} className={`${cardBase} ${cardTheme}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                        plan.highlight
                          ? "bg-white/10 dark:bg-black/10"
                          : "bg-gray-100 dark:bg-gray-900"
                      }`}
                    >
                      {plan.icon}
                    </span>
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-semibold">{plan.priceLabel}</span>
                    <span className={`text-sm ${
                      plan.highlight 
                        ? "text-white/70 dark:text-black/70" 
                        : "text-gray-600 dark:text-gray-400"
                    }`}>
                      {plan.priceNote}
                    </span>
                  </div>
                  <p className={`mt-2 text-sm ${
                    plan.highlight 
                      ? "text-white/80 dark:text-black/80" 
                      : "text-gray-600 dark:text-gray-300"
                  }`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="mt-6 space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full ${
                          plan.highlight
                            ? "bg-white text-black"
                            : "bg-black text-white dark:bg-white dark:text-black"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-current">{f.label}</span>
                    </li>
                  ))}
                </ul>

                {plan.highlight ? (
                  <button
                    className="mt-6 w-full rounded-5 px-4 py-2.5 font-medium border border-white text-black bg-white hover:bg-gray-100 transition-colors dark:border-black dark:bg-black dark:text-white dark:hover:bg-gray-900"
                    onClick={() => router.push("/dashboard")}
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <button
                    className={buttonAlt}
                    onClick={() => router.push("/dashboard")}
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-gray-600 dark:text-gray-400 text-center">
          Prices are in Indian Rupees (INR). Taxes may apply. You can change or
          cancel your plan anytime.
        </p>
      </div>
    </div>
  );
}