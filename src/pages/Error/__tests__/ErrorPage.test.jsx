import {describe, it, expect} from 'vitest';
import ErrorPage from '../../../pages/Error/ErrorPage';
import {render} from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';

describe('Error Page', () => {
  it('renders correctly', () => {
    const {container} = render(
    <Router>
      <ErrorPage />
    </Router>
    )
    expect(container).toMatchSnapshot();
  })
})