import Inspirace from "./Inspirace";
import Receptury from "./Receptury";
import Spolupracujeme from "./Spolupracujeme";
import VolitelnyObsah from "./VolitelnyObsah";

export default async function Home() {
  /* let data = await readSome(); */

  async function createNew() {
    return await (
      await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          sid: "12345VIS",
          funkce: "ObecnyDotaz",
          parametry: {
            Tabulka: "Receptury",
            Operace: "Create",
          },
          Hodnoty: {
            CisloReceptury: 421112233,
            Druh: "Svačiny Pomazánky sýrové a tvarohové",
            Nazev: "Jidlo",
            Stav: "Rozpracovaná",
          },
        }),
      })
    ).json();
  }

  /* async function readSome() {
    const result = await (
      await fetch("https://test.receptury.adelis.cz/APIFrontend.aspx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Uzivatel: process.env.BE_USER,
          Heslo: process.env.BE_PASSWORD,
          SID: "12345VIS",
          Funkce: "ObecnyDotaz",
          Parametry: [
            {
              Tabulka: "Receptury",
              Operace: "Read",
              Limit: 15,
              Vlastnosti: ["Nazev", "Identita", "Obrazek"],
            },
          ],
        }),
      })
    ).json();

    if (result.Result) {
      result.Result.Vety = result.Vety;
      return result.Result;
    }
    return {
      Status: false,
      Chyba: { Kod: 1000, message: "Chybně odchyceno v API" },
    };
  }
 */
  return (
    <div className="flex flex-col items-stretch justify-start gap-12 py-32 md:py-36">
      <Inspirace />
      <Receptury
        className="border-y-2 border-primary-200"
        initialData={undefined}
      />
      <Spolupracujeme />
      <VolitelnyObsah
        title="Volitelný obsah"
        img="/images/food.jpeg"
        text="Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
      />
    </div>
  );
}
