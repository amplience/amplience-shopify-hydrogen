import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {init, type VisualizationSDK} from 'dc-visualization-sdk';

const RealtimeVisualizationContext = createContext<
  VisualizationSDK | undefined
>(undefined);

type RealtimeVisualizationProviderProps = {
  children: ReactNode;
};

export function RealtimeVisualizationProvider({
  children,
}: RealtimeVisualizationProviderProps) {
  const [amplienceVisualizationSdk, setAmplienceVisualizationSdk] =
    useState<VisualizationSDK>();

  const initSdk = async () => {
    const sdk = await init();
    setAmplienceVisualizationSdk(sdk);
  };

  useEffect(() => {
    initSdk();
  }, []);

  return (
    <RealtimeVisualizationContext.Provider value={amplienceVisualizationSdk}>
      {children}
    </RealtimeVisualizationContext.Provider>
  );
}

export function useRealtimeVisualization(
  onChangeFn: (model: Record<string, unknown>) => void,
) {
  const amplienceVisualizationSdk = useContext(RealtimeVisualizationContext);

  useEffect(() => {
    if (amplienceVisualizationSdk) {
      amplienceVisualizationSdk.form.saved(() => {
        window.location.reload();
      });

      amplienceVisualizationSdk.form.changed((model) => {
        onChangeFn(model.content);
      });
    }
  }, [amplienceVisualizationSdk, onChangeFn]);

  return useContext(RealtimeVisualizationContext);
}