import React from 'react';
import type { Preview } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../src/components/ThemeProvider'
import '../src/index.css';

import { DocsContainer } from '@storybook/blocks'
import { themes } from '@storybook/theming'
import { addons } from '@storybook/preview-api'

const DARK_MODE_EVENT_NAME = 'DARK_MODE'

function useDocumentClassListObserver(
  callback: (classList: DOMTokenList) => void
) {
  React.useEffect(() => {
    // Define a MutationObserver that listens to changes in classList
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.attributeName === 'class') {
          callback(document.documentElement.classList)
        }
      }
    })

    // Start observing the documentElement for attribute changes
    observer.observe(document.documentElement, { attributes: true })

    // Clean up on component unmount
    return () => observer.disconnect()
  }, [callback])
}


const ThemedContainer = ({ children, context, ...props }) => {
  const [isDark, setIsDark] = React.useState(document.documentElement.classList.contains('dark'))

  useDocumentClassListObserver((classList) => {
    setIsDark(classList.contains('dark'))
  })

  React.useEffect(() => {
    const chan = addons.getChannel()
    chan.on(DARK_MODE_EVENT_NAME, setIsDark)
    return () => chan.off(DARK_MODE_EVENT_NAME, setIsDark)
  }, [])

  return (
    <DocsContainer
      {...props}
      theme={isDark ? themes.dark : themes.light}
      context={context}>
      {children}
    </DocsContainer>
  )
}


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: ThemedContainer,
    },
    darkMode: {
      classTarget: 'html',
      stylePreview: true,
    }
  },
  decorators: [
    (storyFn, context) => withConsole()(storyFn)(context),
    (Story) => {
      const [isDark] = React.useState(document.documentElement.classList.contains('dark'))
      return (
        <ThemeProvider defaultTheme={isDark ? 'dark' : 'light'}>
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </ThemeProvider>
      )
    },
  ],
};

export default preview;
