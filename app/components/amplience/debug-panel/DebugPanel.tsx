import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@shopify/remix-oxygen";
import { useState } from "react";

export async function loader({context}: LoaderFunctionArgs) {
  const {
    amplience: {locale, hubName, stagingHost},
  } = context;

  return {locale, hubName, stagingHost};
}

const DebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {locale, hubName, stagingHost}= useLoaderData<typeof loader>();

  return (
    <div className="flex justify-between p-4">
      <button
        className="bg-green-600 text-white rounded px-4 py-1"
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
              className="p-4 font-bold text-lg">Header</header>
            <h3 className="p-4">Preview</h3>
            <h3 className="p-4">Environment</h3>
            <p>Locale: {locale}</p>
            <p>Hub Name: {hubName}</p>
            <p>Staging Host: {stagingHost}</p>
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
