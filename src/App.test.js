// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
/* eslint-disable */

import "@testing-library/jest-dom";
import { configure } from "@testing-library/react";
import { configure as eConfigure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

eConfigure({ adapter: new Adapter() });
