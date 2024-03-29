import { cn } from "@/utils/cn";
import Image from "next/image";
import MealSymbol from "../symbols/MealSymbol";
import Badge from "./Badge";
import ButtonIcon from "./ButtonIcon";

type RecipeCardProps = {
  isGridView?: boolean;
  forceGrid?: boolean;
  forceRow?: boolean;
  isLoading?: boolean;
  label: string;
  id?: string;
  img?: any;
  badges: string[];
  className?: string;
};

type BadgesProps = {
  badges: string[];
};

//function to render action buttons on card
function ActionButtons({ isGridView }: any) {
  return (
    <div className={cn("flex flex-row space-x-1", !isGridView && "space-x-3")}>
      <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
        <ButtonIcon
          icon="favorite"
          aria-label="Přidat recepturu do oblíbených"
          onClick={(e) => e.preventDefault()}
        />
      </div>
      <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
        <ButtonIcon
          icon="share"
          aria-label="Sdílet recepturu"
          onClick={(e) => e.preventDefault()}
        />
      </div>
      <div className="flex items-center justify-center rounded-full border-2 border-primary-300/30 bg-white">
        <ButtonIcon
          icon="archive"
          aria-label="Uložit recepturu"
          onClick={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}

// function to redner badges on card
function BadgeRenderer({ badges }: BadgesProps) {
  return (
    <ul className="flex flex-wrap justify-start gap-1">
      {badges.map((badge, index) => (
        <li key={index}>
          <Badge className="md:px-2 md:py-0.5 md:text-xs">{badge}</Badge>
        </li>
      ))}
    </ul>
  );
}

// Card for grid layout
function GridCardLayout({
  id,
  label,
  badges,
  img,
  isLoading,
  className,
}: RecipeCardProps) {
  return (
    <a
      href={`/receptura/${id}`}
      className={cn("h-80 w-full min-w-[180px]", className)}
    >
      <div
        className={cn(
          "relative inset-0 h-36 w-full overflow-hidden rounded-t-2xl",
          img && !isLoading
            ? "border-none"
            : "border-primary-300/30 bg-primary-300/30",
          isLoading && "animate-pulse border-2 border-gray-200 bg-gray-200"
        )}
      >
        {img ? (
          <div className={cn(isLoading && "hidden", "h-full")}>
            <Image
              alt=""
              src={img}
              className="h-full w-full object-cover"
              fill
            />
          </div>
        ) : (
          <div className={cn("flex scale-125 justify-center pt-11")}>
            <MealSymbol className={cn("scale-150", isLoading && "hidden")} />
          </div>
        )}
        <div
          className={cn(
            "absolute right-2 top-2 z-50 flex space-x-2 p-1",
            isLoading && "hidden"
          )}
        >
          <ActionButtons isGridView={true} />
        </div>
      </div>
      <div
        className={cn(
          "flex h-44 flex-grow flex-col justify-between overflow-hidden rounded-b-2xl border-2 border-t-0 border-primary-300/30 bg-white p-[16px]",
          isLoading && "border-gray-200"
        )}
      >
        <div className="line-clamp-3 text-sm font-bold">
          <p className={cn(isLoading && "hidden")}>{label}</p>
          {/* loading text placeholder */}
          <div className={cn("hidden", isLoading && "block")}>
            <div className="inline-block h-4 w-full animate-pulse rounded-full bg-gray-300"></div>
            <div className="inline-block h-4 w-full animate-pulse rounded-full bg-gray-300"></div>
            <div className="inline-block h-4 w-7 animate-pulse rounded-full bg-gray-300"></div>
          </div>
        </div>
        <div className={cn(isLoading && "hidden")}>
          <BadgeRenderer badges={badges} />
        </div>
        {/* loading badges placeholder */}
        <div className={cn("hidden", isLoading && "flex flex-col gap-1")}>
          <div className="inline-block h-4 w-16 animate-pulse rounded-full bg-gray-200"></div>
          <div className="inline-block h-4 w-16 animate-pulse rounded-full bg-gray-200"></div>
        </div>
      </div>
    </a>
  );
}

// Card for row layout
function RowCardLayout({
  label,
  id,
  badges,
  img,
  isLoading,
  className,
}: RecipeCardProps) {
  return (
    <a
      href={`/receptura/${id}`}
      className={cn(
        "h-[70px] flex-row justify-between",
        isLoading && "animate-pulse",
        className
      )}
    >
      {img ? (
        <div
          className={cn(
            "relative h-[70px] w-[70px] overflow-hidden rounded-l-2xl"
          )}
        >
          <Image alt="" src={img} fill className="object-cover" />
        </div>
      ) : (
        <div
          className={cn(
            "overflow-hidden rounded-l-2xl bg-primary-300/30 p-3",
            isLoading && "hidden"
          )}
        >
          <MealSymbol />
        </div>
      )}
      <div
        className={cn(
          "hidden",
          isLoading &&
            "block h-full w-[70px] overflow-hidden rounded-l-2xl bg-gray-200"
        )}
      ></div>
      <div
        className={cn(
          "flex flex-grow flex-row items-center justify-between overflow-hidden rounded-r-2xl border-2 border-l-0 border-primary-300/30 bg-white",
          isLoading && "border-gray-200"
        )}
      >
        <div className="line-clamp-3 w-80 pl-[20px] pr-2 text-sm font-bold">
          <p className={cn("block", isLoading && "hidden")}>{label}</p>
          <div
            className={cn(
              isLoading && " h-4 w-full rounded-full bg-gray-300",
              !isLoading && "hidden"
            )}
          ></div>
        </div>
        <div className="flex items-center justify-between gap-12">
          <div className={cn("block", isLoading && "hidden")}>
            <BadgeRenderer badges={badges} />
          </div>
          <div className="items-center">
            <div
              className={cn(
                "hidden space-x-2 p-3 md:flex",
                isLoading && "hidden"
              )}
            >
              <ActionButtons isGridView={false} />
            </div>
            <div
              className={cn("hidden", isLoading && "flex flex-row gap-2 pr-10")}
            >
              <div className="h-4 w-12 animate-pulse rounded-full bg-gray-200"></div>
              <div className="h-4 w-12 animate-pulse rounded-full bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

function RecipeCard({
  isGridView,
  forceGrid,
  forceRow,
  label,
  id,
  badges,
  className,
  isLoading,
}: RecipeCardProps) {
  return (
    <>
      {isLoading ? (
        <ReturnedLayout
          card={{
            label: label,
            id: id,
            badges: badges,
            className: className,
          }}
          loading={true}
          isGridView={isGridView}
          forceGrid={forceGrid}
          forceRow={forceRow}
        />
      ) : (
        <ReturnedLayout
          card={{ label: label, id: id, badges: badges, className: className }}
          loading={false}
          isGridView={isGridView}
          forceGrid={forceGrid}
          forceRow={forceRow}
        />
      )}
    </>
  );
}

function ReturnedLayout({
  isGridView,
  forceGrid,
  forceRow,
  card,
  loading,
}: {
  isGridView: boolean | undefined;
  forceGrid?: boolean;
  forceRow?: boolean;
  card: RecipeCardProps;
  loading: boolean;
}) {
  return (
    <>
      <GridCardLayout
        label={card.label}
        id={card.id}
        badges={card.badges}
        img={card.img}
        isLoading={loading}
        className={`${
          forceGrid
            ? "block"
            : forceRow
              ? "hidden"
              : isGridView
                ? "hidden md:block"
                : "hidden"
        }`}
      />
      <RowCardLayout
        label={card.label}
        id={card.id}
        badges={card.badges}
        img={card.img}
        isLoading={loading}
        className={` ${
          forceRow
            ? "flex"
            : forceGrid
              ? "hidden"
              : isGridView
                ? "flex md:hidden"
                : "flex"
        }`}
      />
    </>
  );
}

export default RecipeCard;
