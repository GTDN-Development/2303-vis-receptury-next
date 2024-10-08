"use client";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";

type Props = React.ComponentPropsWithoutRef<"div"> & {
  currentPage: number;
  totalPages: number;
  changePage: (page: number) => void;
  loading?: boolean;
};

export default function Paginator({
  currentPage,
  totalPages,
  changePage,
  loading,
}: Props) {
  // set by ElipssisButton - on click sets +/- 5, showing currenently selected page + offset <DayButton>s
  const [offset, setOffset] = useState<number>(0);
  const iconSize = "h-8 w-8 sm:h-9 sm:w-9";
  const isTablet = useMediaQuery("(min-width: 768px)");
  const pagesOffset = isTablet ? 5 : 4;

  useEffect(() => {
    if (currentPage < 1) {
      changePage(1);
    }
    if (currentPage > totalPages) {
      changePage(totalPages);
    }
  }, [currentPage, changePage, totalPages]);

  if (totalPages === 1) {
    return null;
  }

  return (
    <div
      className={`my-7 flex w-full flex-row justify-center gap-x-0.5 md:gap-x-2 ${
        loading && "opacity-50"
      }`}
    >
      <ChevronButton
        back
        changePage={changePage}
        currentPage={currentPage}
        iconSize={iconSize}
        setOffset={setOffset}
        totalPages={totalPages}
      />
      <div className="flex flex-row items-center justify-around rounded-full border-2 border-primary-200 bg-white p-1 text-black md:gap-x-1">
        <DayButton
          page={1}
          changePage={changePage}
          currentPage={currentPage}
          iconSize={iconSize}
          setOffset={setOffset}
          totalPages={totalPages}
        />
        {currentPage + offset <= pagesOffset ? (
          <>
            {[2, 3, 4, 5, 6, 7].map(
              (page, index) =>
                (isTablet || index <= 3) &&
                page <= totalPages && (
                  <DayButton
                    page={page}
                    key={"ppbn" + page}
                    changePage={changePage}
                    currentPage={currentPage}
                    iconSize={iconSize}
                    setOffset={setOffset}
                    totalPages={totalPages}
                  />
                )
            )}
            {((!isTablet && totalPages > 5) || totalPages > 8) && (
              <ElipssisButton
                iconSize={iconSize}
                setOffset={(page) => {
                  if (loading) {
                    return;
                  }
                  setOffset(page);
                }}
                offset={offset}
                pagesOffset={pagesOffset}
                back
              />
            )}
          </>
        ) : currentPage + offset >= totalPages - pagesOffset + 1 ? (
          <>
            {((!isTablet && totalPages > 5) || totalPages > 8) && (
              <ElipssisButton
                iconSize={iconSize}
                setOffset={(page) => {
                  if (loading) {
                    return;
                  }
                  setOffset(page);
                }}
                offset={offset}
                pagesOffset={pagesOffset}
              />
            )}
            {[
              totalPages - 6,
              totalPages - 5,
              totalPages - 4,
              totalPages - 3,
              totalPages - 2,
              totalPages - 1,
            ].map(
              (page, index) =>
                (isTablet || index >= 2) &&
                page > 1 && (
                  <DayButton
                    page={page}
                    key={"ppbn" + page}
                    changePage={changePage}
                    currentPage={currentPage}
                    iconSize={iconSize}
                    setOffset={setOffset}
                    totalPages={totalPages}
                  />
                )
            )}
          </>
        ) : (
          <>
            <ElipssisButton
              iconSize={iconSize}
              setOffset={(page) => {
                if (loading) {
                  return;
                }
                setOffset(page);
              }}
              offset={offset}
              pagesOffset={pagesOffset}
            />
            {[
              currentPage + offset - 2,
              currentPage + offset - 1,
              currentPage + offset,
              currentPage + offset + 1,
              currentPage + offset + 2,
            ].map(
              (page, index) =>
                (isTablet || (index >= 1 && index <= 3)) && (
                  <DayButton
                    page={page}
                    key={"ppbn" + page}
                    changePage={changePage}
                    currentPage={currentPage}
                    iconSize={iconSize}
                    setOffset={setOffset}
                    totalPages={totalPages}
                  />
                )
            )}
            <ElipssisButton
              back
              iconSize={iconSize}
              setOffset={(page) => {
                if (loading) {
                  return;
                }
                setOffset(page);
              }}
              offset={offset}
              pagesOffset={pagesOffset}
            />
          </>
        )}
        {((!isTablet && totalPages > 4) || totalPages > 7) && (
          <DayButton
            page={totalPages}
            changePage={changePage}
            currentPage={currentPage}
            iconSize={iconSize}
            setOffset={setOffset}
            totalPages={totalPages}
          />
        )}
      </div>
      <ChevronButton
        changePage={changePage}
        currentPage={currentPage}
        iconSize={iconSize}
        setOffset={setOffset}
        totalPages={totalPages}
      />
    </div>
  );
}

function DayButton({
  back = false,
  page,
  currentPage,
  changePage,
  setOffset,
  iconSize,
}: {
  back?: boolean;
  page: number;
  currentPage: number;
  totalPages: number;
  changePage: (page: number) => void;
  setOffset: (page: number) => void;
  iconSize: string;
}) {
  return (
    <button
      onClick={() => {
        setOffset(0);
        changePage(page);
      }}
      className={`${iconSize} rounded-full font-bold duration-300 hover:bg-primary hover:text-white ${
        page === currentPage && "bg-primary font-extrabold text-white"
      }`}
    >
      {page}
    </button>
  );
}
function ElipssisButton({
  back = false,
  offset,
  pagesOffset,
  setOffset,
  iconSize,
}: {
  back?: boolean;
  offset: number;
  pagesOffset: number;
  setOffset: (page: number) => void;
  iconSize: string;
}) {
  const [dotsFilled, setDotsFilled] = useState<number>(0);
  const mouseOverRef = useRef(false);
  const timeoutTick = 100;

  function fillDots(currDotsFilled: number) {
    if (mouseOverRef.current) {
      if (currDotsFilled < 3) {
        setTimeout(() => {
          setDotsFilled(currDotsFilled + 1);
          fillDots(currDotsFilled + 1);
        }, timeoutTick);
      }
    } else {
      setDotsFilled(0);
    }
  }

  return (
    <button
      onClick={() =>
        back ? setOffset(offset + pagesOffset) : setOffset(offset - 5)
      }
      className={`${iconSize} flex justify-center rounded-full text-2xl font-semibold ${
        back ? "flex-row" : "flex-row-reverse"
      }`}
      onMouseEnter={() => {
        mouseOverRef.current = true;
        fillDots(0);
      }}
      onMouseLeave={() => {
        mouseOverRef.current = false;
        fillDots(0);
      }}
    >
      <span className={`${dotsFilled > 0 && "text-primary"}`}>.</span>
      <span className={`${dotsFilled > 1 && "text-primary"}`}>.</span>
      <span className={`${dotsFilled > 2 && "text-primary"}`}>.</span>
    </button>
  );
}
function ChevronButton({
  back = false,
  currentPage,
  totalPages,
  changePage,
  setOffset,
  iconSize,
}: {
  back?: boolean;
  currentPage: number;
  totalPages: number;
  changePage: (page: number) => void;
  setOffset: (page: number) => void;
  iconSize: string;
}) {
  const isDisabled = back
    ? currentPage <= 1
      ? true
      : false
    : currentPage >= totalPages
      ? true
      : false;

  return (
    <button
      onClick={() => {
        setOffset(0);
        if (isDisabled) return;
        back ? changePage(currentPage - 1) : changePage(currentPage + 1);
      }}
      tabIndex={isDisabled ? -1 : undefined}
      className={`rounded-full border-2 border-primary-200 bg-white p-1 text-black duration-300 hover:border-primary
      ${
        isDisabled
          ? "cursor-default opacity-30 ring-0"
          : "hover:bg-primary hover:text-white"
      } ${
        !isDisabled
          ? back
            ? "hover:-translate-x-2"
            : "hover:translate-x-2"
          : ""
      }`}
      aria-label={back ? "Předchozí stránka" : "Další stránka"}
    >
      {back ? (
        <ChevronLeftIcon
          className={cn(iconSize, "pr-0.5")}
          aria-label="Předchozí stránka"
        />
      ) : (
        <ChevronRightIcon
          className={cn(iconSize, "pl-0.5")}
          aria-label="Další stránka"
        />
      )}
    </button>
  );
}
