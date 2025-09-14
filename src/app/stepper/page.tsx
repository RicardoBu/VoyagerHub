"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Step1 from "./steps/step1";
import Step2 from "./steps/step2";
import Step3 from "./steps/step3";
import Step4 from "./steps/step4";

import { useRouter } from "next/navigation";
import { TripsProvider } from "@/components/Trip/Context";
import { QuantityProvider } from "@/components/Quantity/Context";
import { TransportationProvider } from "@/components/Transportation/Context";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { useCurrency } from "@/components/Currency/Context";
import { AllProvider } from "@/components/Trip/AllContext";

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  // const currency = useCurrency();

  const router = useRouter();

  const isStepOptional = (step: any) => {
    return step === 1;
  };

  const isStepSkipped = (step: any) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const { t, i18n } = useTranslation();

  const steps = React.useMemo(
    () => [
      { label: t("Destination"), value: 1, component: <Step1 /> },
      { label: t("Number of Guests"), value: 2, component: <Step2 /> },
      { label: t("Transportation"), value: 3, component: <Step3 /> },
      {
        label: t("Confirmation"),
        value: 4,
        component: <Step4 />,
      },
    ],
    [t] // 👈 importante
  );

  return (
    <>
      <AllProvider>
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((step: any, index: number) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: any = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={step.label} {...stepProps}>
                  <StepLabel {...labelProps}>{step.label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {/* renders the component property of the steps array */}
          {steps[activeStep]?.component}
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {t("All steps completed - you are finished")}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>{t("Reset")}</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  {t("Back")}
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    {t("Skip")}
                  </Button>
                )}
                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? t("Finish") : t("Next")}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </AllProvider>
    </>
  );
}
