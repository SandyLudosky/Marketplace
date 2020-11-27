import React from 'react';
import ReactDOM from 'react-dom';
import App from './components';
import { Provider } from "react-redux";
import  configureStore  from "./lib/state/store";
import FormProvider from './lib/hooks/useFormValidation'
import reportWebVitals from './reportWebVitals';

const store = configureStore()
ReactDOM.render(
  <Provider store={store}>
      <FormProvider>
        <App />
      </FormProvider>
    </Provider>,
  document.getElementById('root')
);

reportWebVitals();
