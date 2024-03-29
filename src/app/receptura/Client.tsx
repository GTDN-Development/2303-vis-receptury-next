"use client";
import {
  ArrowLeftAltIcon,
  ArrowRightAltIcon,
  CancelIcon,
} from "@/components/icons";
import Badge from "@/components/ui/Badge";
import ButtonIcon from "@/components/ui/ButtonIcon";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import clsx from "clsx";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

const icons: {
  name:
    | "archive"
    | "calendar-view-months"
    | "downloading"
    | "favorite-fill"
    | "favorite"
    | "list"
    | "print"
    | "rate-review"
    | "share"
    | "visibility"
    | "visibility-off";
  label: string;
  onClick: () => void;
}[] = [
  {
    name: "favorite",
    label: "oblíbené",
    onClick: () => console.log("oblíbené"),
  },
  {
    name: "share",
    label: "sdílet",
    onClick: () => console.log("sdílet"),
  },
  {
    name: "print",
    label: "tisk",
    onClick: () => console.log("tisk"),
  },
  {
    name: "archive",
    label: "MSklad",
    onClick: () => console.log("MSklad"),
  },
  {
    name: "downloading",
    label: ".PDF",
    onClick: () => console.log(".PDF"),
  },
  {
    name: "downloading",
    label: ".XLS",
    onClick: () => console.log(".XLS"),
  },
];

export function Kalkulacka({
  kalkulacka,
}: {
  kalkulacka: {
    porci: number;
    koeficient: string;
    data: { vaha: string; surovina: string }[];
  };
}) {
  const [porci, setPorci] = useState(kalkulacka.porci);
  const [koeficient, setKoeficient] = useState(kalkulacka.koeficient);

  return (
    <div className="flex w-full min-w-fit flex-col justify-between gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-5 md:w-min">
      <Heading size="sm">Kalkulačka surovin</Heading>
      <div className="flex flex-col gap-5 border-b-2 border-primary-300/60 py-3 sm:flex-row">
        <div className="flex gap-x-1.5">
          <label
            htmlFor="pocet"
            className="whitespace-nowrap text-sm font-bold md:text-base"
          >
            Počet porcí
          </label>
          <input
            id="pocet"
            defaultValue={porci}
            type="number"
            min="1"
            max="999"
            pattern="\d*"
            onChange={(e) => {
              const value =
                e.target.value === "" ? 0 : parseInt(e.target.value);
              if (value === porci) return;
              setPorci(value);
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                e.target.value = kalkulacka.porci.toString();
                setPorci(kalkulacka.porci);
              }
            }}
            className="w-16 rounded-xl border-2 border-primary-300/60 text-center"
          ></input>
        </div>
        <div className="flex gap-x-1.5">
          <div className="flex flex-col items-start justify-start">
            <label
              htmlFor="koeficient"
              className="text-sm font-bold md:text-base"
            >
              Koeficient
            </label>
            <a
              href="#"
              target="_blank"
              rel="noopenner noreferrer"
              className="text-sm underline"
            >
              Zjistit více
            </a>
          </div>
          <input
            id="koeficient"
            defaultValue={koeficient}
            type="number"
            min="0.1"
            max="10"
            step="0.1"
            onChange={(e) => {
              if (e.target.value === koeficient) return;
              const parsedValue = parseInt(e.target.value);
              if (Number.isNaN(parsedValue)) {
                setKoeficient("0");
              } else {
                setKoeficient(e.target.value);
              }
            }}
            onBlur={(e) => {
              if (e.target.value === "") {
                e.target.value = kalkulacka.koeficient;
                setKoeficient(kalkulacka.koeficient);
              }
            }}
            className="w-16 rounded-xl border-2 border-primary-300/60 text-center"
          ></input>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <td className="pb-5 font-bold">Váha (g)</td>
            <td className="pb-5 font-bold">Suroviny</td>
          </tr>
        </thead>
        <tbody>
          {kalkulacka.data.map((row, index) => {
            let calcResult: string = (
              parseFloat(row.vaha) *
              porci *
              parseFloat(koeficient)
            ).toString();
            calcResult = calcResult.includes(".")
              ? calcResult.substring(0, calcResult.indexOf(".") + 3)
              : calcResult;
            return (
              <tr
                key={"kfdr" + index}
                className="border-t border-primary-300/60"
              >
                <td className="py-3 font-bold">{calcResult}</td>
                <td className="py-3">{row.surovina}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function Galerie({
  images,
  miniImages,
  looped = false,
}: {
  images?: string[];
  miniImages?: number;
  looped?: boolean;
}) {
  const [imageOpen, setImageOpen] = useState<false | number>(false);
  const imagesLength = useMemo(() => {
    if (!images) return 0;
    return images.length;
  }, [images]);
  const [fullImageMode, setFullImageMode] = useState(false);

  const onArrowClick = useCallback(
    (to: "before" | "after") => {
      if (imageOpen === false || imagesLength === 0) return;
      if (to === "before") {
        if (imageOpen === 0) {
          if (looped) setImageOpen(imagesLength - 1);
        } else {
          setImageOpen(imageOpen - 1);
        }
      } else {
        if (imageOpen === imagesLength - 1) {
          if (looped) setImageOpen(0);
        } else {
          setImageOpen(imageOpen + 1);
        }
      }
    },
    [imageOpen, imagesLength, looped]
  );

  useEffect(() => {
    function keyboardHandler(e: any) {
      const code = e.code;

      switch (code) {
        case "Escape":
          setFullImageMode(false);
          setImageOpen(false);
          break;
        case "ArrowLeft":
          onArrowClick("before");
          break;
        case "ArrowRight":
          onArrowClick("after");
          break;
        case "ArrowUp":
          setFullImageMode(true);
          break;
        case "NumpadAdd":
          setFullImageMode(true);
          break;
        case "ArrowDown":
          setFullImageMode(false);
          break;
        case "NumpadSubtract":
          setFullImageMode(false);
          break;
      }
    }
    if (imageOpen !== false) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", keyboardHandler);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", keyboardHandler);
    }

    return () => {
      window.removeEventListener("keydown", keyboardHandler);
    };
  }, [imageOpen, onArrowClick]);

  if (!images) return null;

  function ClosedImage({
    image,
    index,
    className,
  }: {
    image: string;
    index: number;
    className?: string;
  }) {
    return (
      <button
        className="relative aspect-video w-full"
        onClick={() => setImageOpen(index)}
      >
        <Image
          alt={""}
          src={image}
          fill
          className={`aspect-video rounded-2xl bg-gray-300 object-cover ${className} select-none`}
        ></Image>
      </button>
    );
  }

  function MainImage({ image }: { image: string }) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={""}
          fill
          className={`select-none bg-gray-300 object-contain ${
            fullImageMode ? "p-1" : "mx-auto mt-10 max-h-[70%]"
          }`}
        />
      </div>
    );
  }

  function MiniImageRow() {
    if (!miniImages || !images || imageOpen === false) return null;

    function returnStart() {
      if (!imageOpen || !miniImages) return 0;
      console.log(imageOpen + miniImages, imagesLength);

      if (imageOpen - miniImages < 0) return 0;
      else if (imageOpen + miniImages > imagesLength - 1)
        return imagesLength - miniImages;
      else return imageOpen - miniImages / 2;
    }
    const start = returnStart();

    return (
      <div
        className={`absolute bottom-5 mx-auto hidden h-full max-h-[20%] w-full grid-cols-7 items-center gap-x-5 ${
          !fullImageMode && "md:grid"
        }`}
      >
        {images.slice(start, start + miniImages).map((image, index) => (
          <button
            key={"gifmi" + index}
            onClick={() => setImageOpen(start + index)}
            className="relative h-full w-full"
          >
            <Image
              src={image}
              alt={""}
              fill
              className={clsx(
                "h-full w-full select-none rounded-lg bg-gray-300 object-fill transition duration-150 ease-in-out hover:shadow-lg hover:shadow-primary-300",
                (index === 0 || index === miniImages - 1) &&
                  "scale-50 hover:scale-[0.6]",
                (index === 1 || index === miniImages - 2) &&
                  "scale-75 hover:scale-[0.85]",
                (index === 2 || index === miniImages - 3) &&
                  "scale-90 hover:scale-100",
                index === Math.floor(miniImages / 2) && "hover:shadow-none"
              )}
            />
          </button>
        ))}
      </div>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-5">
        <Heading>Galerie</Heading>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 md:flex-row">
            <ClosedImage image={images[1]} index={0} />
            <ClosedImage image={images[2]} index={1} />
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {images.slice(2, 6).map((image, index) => (
              <ClosedImage key={"kfici" + index} image={image} index={index} />
            ))}
          </div>
        </div>
        {imageOpen !== false && (
          <div
            className={`fixed inset-0 z-fixed flex gap-y-16 bg-black/90 text-white md:flex-col ${
              fullImageMode && "!p-0"
            }`}
          >
            <MainImage image={images[imageOpen]} />
            <MiniImageRow />
            <button
              onClick={() => {
                setFullImageMode(false);
                setImageOpen(false);
              }}
              className="absolute right-5 top-5 z-fixed-above border-0 p-5 ring-0 duration-200 hover:right-[30px] hover:top-[30px] hover:scale-150 focus:border-0 focus:ring-0"
            >
              <CancelIcon size={32} />
            </button>
            <button
              className={`group absolute z-fixed mt-20 flex h-[calc(100%-20rem)] w-1/4 items-center justify-start px-20 focus:ring-0 ${
                (imageOpen === 0 || fullImageMode) && "hidden"
              }`}
              onClick={() => onArrowClick("before")}
            >
              <ArrowLeftAltIcon
                size={32}
                className="duration-200 group-hover:-translate-x-5 group-hover:scale-150"
              />
            </button>
            <button
              className={`group absolute right-0 z-fixed mt-20 flex h-[calc(100%-20rem)] w-1/4 items-center justify-end px-20 text-end focus:ring-0 ${
                (imageOpen === imagesLength - 1 || fullImageMode) && "hidden"
              }`}
              onClick={() => onArrowClick("after")}
            >
              <ArrowRightAltIcon
                size={32}
                className="duration-200 group-hover:translate-x-5 group-hover:scale-150"
              />
            </button>
          </div>
        )}
      </div>
    </Container>
  );
}

export function Hero({
  logo,
  title,
  jmeno,
  badges,
}: {
  logo?: string;
  title: string;
  jmeno: string;
  badges: string[];
}) {
  return (
    <Container>
      <div className="relative flex flex-col overflow-hidden rounded-3xl bg-white md:flex-row-reverse md:justify-between md:pr-0">
        <Image
          src="/images/food.jpeg"
          alt=""
          className="w-full bg-gray-300 object-cover md:w-1/3 lg:w-5/12 xl:w-7/12"
          width={500}
          height={200}
        />
        <div className="flex flex-col gap-y-5 rounded-b-3xl border-2 border-t-0 border-primary-300/60 p-5 md:rounded-e-none md:rounded-l-3xl md:border-2 md:border-r-0 md:px-0">
          <div className="flex gap-x-2 md:mt-auto md:px-10">
            <span className="flex min-w-min items-center rounded-sm bg-primary-300/30 px-2 font-bold text-black">
              Logo
            </span>
            <span className="line-clamp-2">
              Tento recept pro vás připravila společnost {jmeno}
            </span>
          </div>
          <div className="flex flex-col gap-y-3 md:flex-col-reverse md:px-10">
            <Heading className="line-clamp-4 w-5/6" as="h1">
              {title}
            </Heading>
          </div>
          <div className="flex gap-x-1.5 md:px-10">
            {badges.map((badge, index) => (
              <Badge key={"bmbi" + index}>{badge}</Badge>
            ))}
          </div>
          <div className="min-w-20 absolute right-5 top-5 my-auto grid grid-cols-6 gap-x-3 md:static md:gap-x-2 md:px-10 ">
            {icons.map((icon, index) => (
              <div
                key={"kfhi" + index}
                className={`${
                  icon.name === "share" || icon.name === "favorite"
                    ? "flex"
                    : "hidden md:flex"
                }  flex w-min flex-col items-center gap-1 justify-self-center text-center`}
              >
                <ButtonIcon
                  onClick={icon.onClick}
                  icon={icon.name}
                  className="bg-white"
                />
                <span className="hidden text-sm md:block">{icon.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export function Informations({
  title,
  postup,
  kalkulacka,
  hmotnost,
  alergeny,
  terapeut,
  skladba,
}: {
  title: string;
  postup: string;
  kalkulacka: {
    porci: number;
    koeficient: string;
    data: { vaha: string; surovina: string }[];
  };
  hmotnost: { porce: string; masa: string; omacky: string };
  alergeny: { alergeny: string[]; text: string };
  terapeut: { text: string; badges: string[] };
  skladba: { polevka: string; priloha: string; doplnek: string };
}) {
  function Title() {
    return (
      <div className="flex flex-col gap-3 md:flex-row md:justify-between">
        <Heading className="max-w-3xl">{title}</Heading>
        <div className="right-5 top-5 grid min-w-max max-w-md grid-cols-3 gap-x-1.5 gap-y-3 sm:grid-cols-6">
          {icons.map((icon, index) => (
            <div
              key={"kfii" + index}
              className={`flex flex-col items-center gap-1 text-center`}
            >
              <ButtonIcon onClick={icon.onClick} icon={icon.name}></ButtonIcon>
              <span className="text-sm">{icon.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  function Hmotnost() {
    return (
      <div className="flex flex-col justify-between gap-y-2 rounded-3xl border-2 border-primary-300/60 bg-white p-5 sm:flex-row">
        <span className="my-auto font-bold lg:text-lg">Hmotnost</span>
        <div className="flex flex-row gap-x-3">
          <div className="flex flex-col items-center">
            <span className="font-bold">Porce</span>
            <span>{hmotnost.porce}g</span>
          </div>
          <div className="flex flex-col items-center border-x-2 border-primary-300/60 px-3">
            <span className="font-bold">Masa</span>
            <span>{hmotnost.masa}g</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold">Omáčky</span>
            <span>{hmotnost.omacky}g</span>
          </div>
        </div>
      </div>
    );
  }

  function Postup() {
    return (
      <div className="flex flex-col gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-4">
        <Heading size="sm">Postup</Heading>
        <p>{postup}</p>
      </div>
    );
  }
  function Alergeny() {
    return (
      <div className="flex flex-col gap-y-5 rounded-3xl border-2 border-primary-300/60 bg-white p-4">
        <Heading size="sm">Alergeny</Heading>
        <div className="flex flex-row gap-x-3">
          {alergeny.alergeny.map((alergen, index) => (
            <span
              key={"aaai" + index}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-300/60 font-bold text-black"
            >
              {alergen}
            </span>
          ))}
        </div>
        <p>{alergeny.text}</p>
      </div>
    );
  }
  function Skladba() {
    return (
      <div className="flex flex-col gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-4">
        <Heading size="sm">Doporučení ke skladbě</Heading>
        <p>
          <span className="font-bold text-black">Doporučená polévka: </span>
          {skladba.polevka}
        </p>
        <p>
          <span className="font-bold text-black">Doporučená příloha: </span>
          {skladba.priloha}
        </p>
        <p>
          <span className="font-bold text-black">Doporučený doplněk: </span>
          {skladba.doplnek}
        </p>
      </div>
    );
  }
  function Terapeut() {
    return (
      <div className="flex flex-col gap-y-3 rounded-3xl border-2 border-primary-300/60 bg-white p-4">
        <Heading size="sm">Nutriční terapeut</Heading>
        <p>{terapeut.text}</p>
        <div className="flex flex-row gap-1.5">
          {terapeut.badges.map((badge, index) => (
            <Badge key={"tbb" + index}>{badge}</Badge>
          ))}
        </div>
      </div>
    );
  }
  return (
    <Container className="flex flex-col gap-5 sm:gap-7">
      <Title />
      <div className="flex flex-col gap-5 sm:gap-7 md:flex-row">
        <div className="flex flex-col gap-5 sm:gap-7">
          <Hmotnost />
          <Kalkulacka kalkulacka={kalkulacka} />
        </div>
        <div className="flex flex-col gap-5 sm:gap-7">
          <Postup />
          <div className="grid gap-5 sm:gap-7 xl:grid-cols-2">
            <Alergeny />
            <Skladba />
          </div>
          <Terapeut />
        </div>
      </div>
    </Container>
  );
}
