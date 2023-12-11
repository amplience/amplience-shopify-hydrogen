import {useLocation} from '@remix-run/react';

export function useAmplienceSearchParams() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hub = searchParams.get('hub');
  const vse = searchParams.get('vse');
  const content = searchParams.get('content');
  const standalone = searchParams.get('standalone');

  return {hub, vse, content, standalone};
}
