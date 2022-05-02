import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { IconContext } from 'react-icons';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'next-themes';
import { themes } from 'lib-client/constants';
import queryClientConfig from 'lib-client/react-query/queryClientConfig';
import SuspenseWrapper from 'lib-client/providers/SuspenseWrapper';

import 'styles/index.scss';
import getConfig from 'next/config';

const App = ({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <SuspenseWrapper errorFallbackType="screen" loaderType="screen">
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <ThemeProvider themes={themes} attribute="class">
          <IconContext.Provider value={{ className: 'react-icons' }}>
            <QueryClientProvider client={queryClient}>
              <Hydrate state={dehydratedState}>
                <Component {...pageProps} />
              </Hydrate>
              <ReactQueryDevtools />
            </QueryClientProvider>
          </IconContext.Provider>
        </ThemeProvider>
      </SessionProvider>
    </SuspenseWrapper>
  );
};

export default App;

// include themes, prevent purge
// theme-light theme-dark theme-blue theme-red theme-green theme-black
