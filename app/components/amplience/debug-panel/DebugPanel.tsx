import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, defer } from "@shopify/remix-oxygen";
import { useState } from "react";

export type DebugPanelProps = {
  hubName: string;
  locale: string;
  stagingHost: string;
  contentId: string;
};

const DebugPanel = ({
  hubName,
  locale,
  stagingHost,
  contentId
}: DebugPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-end p-4">
      <button
        className="bg-orange-500 text-white rounded px-4 py-1"
        onClick={() => setIsOpen(true)}
      >
        open
      </button>
      <div
        className={
          " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
          (isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0  "
            : " transition-all delay-500 opacity-0 translate-x-full  ")
        }
      >
        <section
          className={
            " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
            (isOpen ? " translate-x-0 " : " translate-x-full ")
          }
        >
          <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
            <header
              onClick={() => {
                setIsOpen(false);
              }}
              className="p-4 font-bold text-lg">
                Header
            </header>
            <div className="p-4">
              <h2>Preview</h2>
              <h2>Environment</h2>
              { locale && <p className="text-xs">Locale: <b>{locale}</b></p> }
              { hubName && <p className="text-xs">Hub Name: <b>{hubName}</b></p> }
              { stagingHost && <p className="text-xs">Staging Host: <b>{stagingHost}</b></p> }
              { contentId && <p className="text-xs">Content ID: <b>{contentId}</b></p> }
            </div>
          </article>
        </section>
        <section
          className=" w-screen h-full cursor-pointer "
          onClick={() => {
            setIsOpen(false);
          }}
        ></section>
      </div>
    </div>
  );
};

export default DebugPanel;
