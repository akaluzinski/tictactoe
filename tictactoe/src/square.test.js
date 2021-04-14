import React from "react";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";

import Square from "./square";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

it("renders square", () => {
  act(() => {
    render(<Square value="3" onClick={() => {}} />, container);
  });
  expect(container.textContent).toBe("3");
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
