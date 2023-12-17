"use client";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import RecipeCardsGrid from "@/components/ui/RecipeCardsGrid";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useState } from "react";

export default function Inspirace() {
  const [hidden, setHidden] = useState<boolean>(false);
  const [selected, setSelected] = useState<
    "recommended" | "favorites" | "new" | string
  >("recommended");

  function HideButton({ className = "" }: { className?: string }) {
    return (
      <div
        className={`items-center gap-x-2 whitespace-nowrap font-semibold ${className}`}
      >
        {hidden ? "Zobrazit " : "Skrýt "}
        <span className="hidden md:inline-block">inspirace</span>
        <ButtonIcon
          icon={hidden ? "visibility" : "visibility-off"}
          onClick={() => setHidden(!hidden)}
        />
      </div>
    );
  }

  return (
    <Container
      className={`${
        hidden &&
        "absolute left-1/2 top-28 -translate-x-1/2 -translate-y-full md:top-32"
      }`}
    >
      <div className="flex flex-row items-center justify-between">
        <Heading as="h1" size="lg" className={`${hidden && "hidden"}`}>
          Inspirace na vaření
        </Heading>
        <HideButton className="ml-auto flex md:hidden" />
      </div>
      <div
        className={`flex w-full items-center justify-between ${
          !hidden && " pt-5 md:pt-20"
        }`}
      >
        <Tabs
          defaultValue={selected}
          className={`w-full ${hidden && "hidden"}`}
          onValueChange={(value: string) => setSelected(value)}
        >
          <div className="flex w-full flex-row justify-between">
            <TabsList className="flex w-full items-center justify-evenly md:max-w-[550px]">
              <TabsTrigger value="recommended" className="w-full">
                Doporučené pro vás
              </TabsTrigger>
              <TabsTrigger value="favorites" className="w-full">
                Oblíbené
              </TabsTrigger>
              <TabsTrigger value="new" className="w-full">
                Nové recepty
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        <HideButton className="ml-auto hidden md:flex" />
      </div>
      {!hidden && (
        <RecipeCardsGrid length={12} gridView className="flex flex-row" />
      )}
    </Container>
  );
}