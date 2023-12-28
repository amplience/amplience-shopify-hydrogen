import { useState } from "react";
import AmplienceLogo from "../../../assets/svg/amp-logo.svg";

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
    <>
      {
        stagingHost &&
        (
          <div className="flex justify-end p-2 bg-red-200">
            <button
              className="bg-red-500 text-white rounded px-4 py-1"
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
                    className="p-4 font-bold text-lg mx-auto">
                    <img src={AmplienceLogo} alt="Amplience Logo" width="260" />
                  </header>
                  <div className="flex items-center justify-center ">
                    <div className="w-full mx-auto space-y-2  lg:max-w-md">
                      <details className="p-2 rounded-lg">
                        <summary className="font-semibold bg-red-200 px-4 py-2 text-lg cursor-pointer">Preview</summary>
                        <div className=" bg-red-100">
                          <p className="leading-6 px-3 py-2 text-gray-800">
                          </p>
                        </div>
                      </details>
                    </div>
                  </div>
                  <div className="flex items-center justify-center ">
                    <div className="w-full mx-auto space-y-2  lg:max-w-md">
                      <details className="p-2 rounded-lg">
                        <summary className="font-semibold bg-red-200 px-4 py-2 text-lg cursor-pointer">Environment</summary>
                        <div className=" bg-red-100">
                          <p className="leading-6 px-3 py-2 text-gray-800">
                            {locale && <p className="text-xs">Locale: <b>{locale}</b></p>}
                            {hubName && <p className="text-xs">Hub Name: <b>{hubName}</b></p>}
                            {stagingHost && <p className="text-xs">Staging Host: <b>{stagingHost}</b></p>}
                            {contentId && <p className="text-xs">Content ID: <b>{contentId}</b></p>}
                          </p>
                        </div>
                      </details>
                    </div>
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
        )
      }
    </>
  );
};

export default DebugPanel;
